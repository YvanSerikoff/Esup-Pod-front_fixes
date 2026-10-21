import { dictionaries, type SupportedLocale } from "@/src/locales";

export function getCollectionBlockManifest(locale: SupportedLocale) {
  const t = dictionaries[locale].blocks;

  return {
    frontend_id: "collection-block",
    name: t.collectionTitle,
    description: t.collectionDescription,
    fields: {
      collection_type: {
        type: "select",
        label: t.collectionTypeLabel,
        options: [
          { label: t.collectionTypeChannels, value: "channel" },
          { label: t.collectionTypeThemes, value: "theme" },
          { label: t.collectionTypePlaylists, value: "playlist" },
          { label: t.collectionTypeAll, value: "all" },
        ],
        default: "channel",
      },
      collection_ids: {
        type: "text",
        label: t.collectionIdsLabel,
        placeholder: t.collectionIdsPlaceholder,
        default: "",
      },
      order_by: {
        type: "select",
        label: t.collectionSortLabel,
        options: [
          { label: t.collectionSortTitle, value: "title" },
          { label: t.collectionSortCreated, value: "-created_at" },
        ],
        default: "title",
      },
    },
  };
}
