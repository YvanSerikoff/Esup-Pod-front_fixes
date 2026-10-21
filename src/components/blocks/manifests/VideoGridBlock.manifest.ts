import { dictionaries, type SupportedLocale } from "@/src/locales";

export function getVideoGridBlockManifest(locale: SupportedLocale) {
  const t = dictionaries[locale].blocks;

  return {
    frontend_id: "video-grid-block",
    name: t.videoGridTitle,
    description: t.videoGridDescription,
    fields: {
      order_by: {
        type: "select",
        label: t.videoGridSortLabel,
        options: [
          { label: t.videoGridSortLatest, value: "-created_at" },
          { label: t.videoGridSortMostViewed, value: "-views_count" },
          { label: t.videoGridSortTitle, value: "title" },
        ],
        default: "-created_at",
      },
    },
  };
}
