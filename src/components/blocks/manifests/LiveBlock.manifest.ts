import { dictionaries, type SupportedLocale } from "@/src/locales";

export function getLiveBlockManifest(locale: SupportedLocale) {
  const t = dictionaries[locale].blocks;

  return {
    frontend_id: "live-block",
    name: t.liveTitle,
    description: t.liveDescription,
    fields: {
      order_by: {
        type: "select",
        label: t.liveSortLabel,
        options: [
          { label: t.liveSortStartUpcoming, value: "start_date" },
          { label: t.liveSortStartRecent, value: "-start_date" },
          { label: t.liveSortTitle, value: "title" },
          { label: t.liveSortPopularity, value: "-max_viewers" },
        ],
        default: "start_date",
      },
    },
  };
}
