import { dictionaries, type SupportedLocale } from "@/src/locales";

export function getCustomTextBlockManifest(locale: SupportedLocale) {
  const t = dictionaries[locale].blocks;

  return {
    frontend_id: "custom-text-block",
    name: t.customTextTitle,
    description: t.customTextDescription,
    fields: {
      subtitle_or_text: {
        type: "textarea",
        label: t.customTextContentLabel,
        default: "",
      },
    },
  };
}
