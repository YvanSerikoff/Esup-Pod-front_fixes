"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, VariantType } from "@openfun/cunningham-react";
import { useRouter } from "next/navigation";
import type { Tags, Video } from "@/src/types";
import { useTags } from "@/src/hooks/useTags";
import { useTranslation } from "@/src/hooks/useTranslation";
import styles from "./styles.module.css";

export type ShowTagsProps = {
  onTagClick?: (tag: Tags) => void;

  // Optional limit on the number of displayed tags.
  limit?: number;

  // Optional video list used to recalculate the video count for each tag
  videos?: Video[];
};

export default function ShowTags({ onTagClick, limit, videos }: ShowTagsProps) {
  const { tags, fetchAll, useTagsLoading, useTagsError } = useTags();
  const router = useRouter();

  const { t } = useTranslation();

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  type TagWithCount = {
    tag: Tags;
    effectiveCount: number | null;
  };

  let tagEntries: TagWithCount[];

  if (videos && videos.length > 0) {
    // Exclude videos with "DR" status.
    const tagCountBySlug = new Map<string, number>();

    videos
      .filter((video) => video.status !== "DR")
      .forEach((video) => {
        (video.tags ?? []).forEach((tagSlug) => {
          const current = tagCountBySlug.get(tagSlug) ?? 0;
          tagCountBySlug.set(tagSlug, current + 1);
        });
      });

    tagEntries = tags.map((tag) => ({
      tag,
      effectiveCount: tagCountBySlug.get(tag.slug) ?? 0,
    }));
  } else {
    tagEntries = tags.map((tag) => ({ tag, effectiveCount: tag.count }));
  }

  const tagsWithVideos = tagEntries.filter(
    ({ effectiveCount }) => effectiveCount == null || effectiveCount > 0,
  );

  const displayedTags = limit ? tagsWithVideos.slice(0, limit) : tagsWithVideos;

  if (useTagsLoading) {
    return (
      <Box className={styles["tags-loading"]}>
        <CircularProgress size={20} />
        <p>{t("videoPage.keywordsloading")}</p>
      </Box>
    );
  }

  if (useTagsError) {
    return (
      <Alert type={VariantType.ERROR} canClose>
        {t("errors.tagsLoadError", {
          error: useTagsError,
        })}
      </Alert>
    );
  }

  if (!displayedTags.length) {
    return <Alert type={VariantType.INFO}>{t("videoPage.noKeywords")}</Alert>;
  }

  return (
    <Box className={styles["tags-list"]}>
      {displayedTags.map(({ tag, effectiveCount }, index) => {
        const label =
          effectiveCount != null ? `${tag.name} (${effectiveCount})` : tag.name;

        return (
          <Chip
            key={tag.id}
            label={label}
            variant="filled"
            size="medium"
            className={`${styles["tag-chip"]} ${
              styles[`tag-color-${index % 5}`]
            }`}
            onClick={() => {
              if (onTagClick) {
                onTagClick(tag);
                return;
              }

              router.push(`/video?tag=${encodeURIComponent(tag.slug)}`);
            }}
          />
        );
      })}
    </Box>
  );
}
