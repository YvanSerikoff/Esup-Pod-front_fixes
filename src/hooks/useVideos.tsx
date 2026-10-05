"use client";

import { useAuth } from "@/src/context/AuthProvider";
import { authFetch } from "@/src/api/authFetch";
import { requestJson } from "@/src/utils/requestJson";
import { getRoutes } from "@/src/api/routes";
import type { Video } from "@/src/types";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "./useTranslation";

type UnlockPayload = {
  password?: string;
  hash?: string;
};

type UnlockResponse = {
  video_url?: string;
  source?: string;
  error?: string;
};

/**
 * Filtering, sorting, and pagination parameters for fetching a video list.
 * These parameters correspond to the Django filters exposed by the API (via django-filter).
 */
export type VideoListParams = {
  /** Filter by channel ID. */
  channel?: number;
  ordering?: string;
  search?: string;
  page?: number;
  createdAtGte?: string;
  createdAtLte?: string;
  typeSlugs?: string[];
  disciplineIds?: number[];
  tagSlugs?: string[];
  tagNames?: string[];
  cursusSlugs?: string[];
  statuses?: string[];
  ownerUsernames?: string[];
};

const appendValues = (
  searchParams: URLSearchParams,
  name: string,
  values?: Array<string | number>,
) => {
  values
    ?.filter((value) => String(value).trim() !== "")
    .forEach((value) => searchParams.append(name, String(value)));
};

const buildVideoListUrl = (
  baseUrl: string,
  params?: VideoListParams,
): string => {
  const url = new URL(baseUrl);

  if (params?.channel != null)
    url.searchParams.set("channel", String(params.channel));
  if (params?.ordering) url.searchParams.set("ordering", params.ordering);
  if (params?.search) url.searchParams.set("search", params.search);
  if (params?.page != null) url.searchParams.set("page", String(params.page));
  if (params?.createdAtGte)
    url.searchParams.set("created_at__gte", params.createdAtGte);
  if (params?.createdAtLte)
    url.searchParams.set("created_at__lte", params.createdAtLte);

  appendValues(url.searchParams, "type__slug", params?.typeSlugs);
  appendValues(url.searchParams, "discipline", params?.disciplineIds);
  appendValues(url.searchParams, "tags__slug", params?.tagSlugs);
  appendValues(url.searchParams, "tags__name", params?.tagNames);
  appendValues(url.searchParams, "cursus__slug", params?.cursusSlugs);
  appendValues(url.searchParams, "status", params?.statuses);
  appendValues(url.searchParams, "owner__username", params?.ownerUsernames);

  return url.toString();
};

type VideoListResponse =
  | Video[]
  | { results?: Video[]; count?: number; next?: string; previous?: string };

const normalizeVideoList = (data: VideoListResponse): Video[] => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  return [];
};

// --- React Query Hooks ---

export function useVideo(slug: string, enabled = true) {
  const { accessToken, refresh } = useAuth();
  const { t } = useTranslation();

  return useQuery<Video, Error>({
    queryKey: ["video", slug],
    queryFn: async () => {
      const res = await authFetch(getRoutes().video.get(slug), {
        accessToken,
        onRefresh: refresh,
      });

      if (res.status === 404 && !accessToken) throw new Error("AUTH_REQUIRED");
      if (!res.ok) throw new Error(t("errors.loadErrorVideo"));

      return requestJson<Video>(res);
    },
    enabled: Boolean(slug) && enabled,
    staleTime: 60000, // 1 minute stale time for individual video cache
  });
}

/**
 * Custom React Query hook (useInfiniteQuery) for fetching a video list with infinite pagination, filtering, and caching.
 *
 * @param params Object containing search, sorting, and filtering criteria (`VideoListParams`).
 * @param fetchType Selects the API route: "all" (all public/accessible videos) or "me" (the signed-in user's videos).
 * @param options Additional options, e.g. `enabled` to control whether the query runs.
 *
 * @returns An object containing the videos (`videos`), total count (`videosCount`), loading state (`useVideoLoading`), errors (`useVideoError`), and functions for loading the next page.
 */
export function useVideosList(
  params?: VideoListParams,
  fetchType: "all" | "me" = "all",
  options?: { enabled?: boolean },
) {
  const { accessToken, refresh } = useAuth();

  const { t } = useTranslation();
  const query = useInfiniteQuery<VideoListResponse, Error>({
    queryKey: ["videos", fetchType, params],
    queryFn: async ({ pageParam = 1 }) => {
      // Use the optimized route to fetch the owner and co-owners.
      const baseUrl =
        fetchType === "me" ? getRoutes().video.me : getRoutes().video.list;
      const response = await authFetch(
        buildVideoListUrl(baseUrl, {
          ...params,
          page: params?.page || (pageParam as number),
        }),
        {
          accessToken,
          onRefresh: refresh,
        },
      );
      if (!response.ok) {
        if (response.status === 401) throw new Error(t("errors.error401"));
        if (response.status === 404) throw new Error(t("errors.notFound"));
        if (response.status >= 500) throw new Error(t("errors.serverError"));
        throw new Error(
          t("errors.loadErrorVideos", { status: response.status }),
        );
      }
      return requestJson<VideoListResponse>(response);
    },
    getNextPageParam: (lastPage, allPages) => {
      // Check whether a 'next' link exists in the paginated DRF response.
      if (!Array.isArray(lastPage) && lastPage.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    retry: 1,
    staleTime: 30000, // 30 seconds stale time for video lists
    enabled: options?.enabled ?? true,
  });

  // Flatten pages into a single array of videos.
  const videos = query.data?.pages.flatMap(normalizeVideoList) ?? [];
  const videosCount = !Array.isArray(query.data?.pages[0])
    ? (query.data?.pages[0]?.count ?? videos.length)
    : videos.length;

  return {
    videos,
    videosCount,
    useVideoLoading: (options?.enabled ?? true) && query.isLoading,
    useVideoError:
      (options?.enabled ?? true) ? (query.error?.message ?? null) : null,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
}

export function useDeleteVideo() {
  const { accessToken, refresh } = useAuth();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (slug: string) => {
      const res = await authFetch(getRoutes().video.delete(slug), {
        accessToken,
        onRefresh: refresh,
        method: "DELETE",
      });

      if (!res.ok) throw new Error(t("errors.deleteErrorVideo"));
      return slug;
    },
    onSuccess: (deletedSlug) => {
      // Clear the cache to force a refresh.
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      queryClient.removeQueries({ queryKey: ["video", deletedSlug] });
    },
  });
}

export function useUnlockVideo() {
  const { accessToken, refresh } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      slug,
      payload,
    }: {
      slug: string;
      payload?: UnlockPayload;
    }) => {
      const hasPayload =
        payload != null && Object.values(payload).some((value) => value);
      const hasHash = Boolean(payload?.hash?.trim());
      const baseUnlockUrl = getRoutes().video.unlock(slug);
      const unlockUrl = hasHash
        ? `${baseUnlockUrl}?hash=${encodeURIComponent(payload?.hash ?? "")}`
        : baseUnlockUrl;

      const res = await authFetch(unlockUrl, {
        accessToken,
        onRefresh: refresh,
        method: hasPayload ? "POST" : "GET",
        headers: hasPayload
          ? { "Content-Type": "application/x-www-form-urlencoded" }
          : undefined,
        body: hasPayload
          ? new URLSearchParams({
              password: payload?.password?.trim() || "",
              hash: payload?.hash?.trim() || "",
            })
          : undefined,
      });

      const data = await requestJson<UnlockResponse>(res);
      if (data.error) throw new Error(data.error);
      return { slug, data };
    },
    onSuccess: ({ slug, data }) => {
      if (data.video_url) {
        queryClient.setQueryData<Video>(["video", slug], (oldData) => {
          if (!oldData) return oldData;
          return { ...oldData, video_url: data.video_url! };
        });
      }
    },
  });
}

export function useDuplicateVideo() {
  const { accessToken, refresh } = useAuth();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (slug: string) => {
      const response = await authFetch(getRoutes().video.duplicate(slug), {
        method: "POST",
        accessToken,
        onRefresh: refresh,
      });
      if (!response.ok) {
        throw new Error(t("errors.dupErrorVideo"));
      }
      return requestJson<Video>(response);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
}
