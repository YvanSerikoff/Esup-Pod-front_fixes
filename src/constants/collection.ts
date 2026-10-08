export type CollectionOrder = "-created_at" | "created_at" | "title" | "-title";

export const PLAYLIST_ORDER_OPTIONS = [
  { labelKey: "playlists.sortNewest", value: "created_at" },
  { labelKey: "playlists.sortOldest", value: "-created_at" },
  { labelKey: "playlists.sortTitleAscending", value: "title" },
  { labelKey: "playlists.sortTitleDescending", value: "-title" },
] satisfies Array<{
  labelKey:
    | "playlists.sortNewest"
    | "playlists.sortOldest"
    | "playlists.sortTitleAscending"
    | "playlists.sortTitleDescending";
  value: CollectionOrder;
}>;
