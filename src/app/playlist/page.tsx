import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PlaylistClientPage from "./PlaylistClientPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("titles.playlists"),
    description: t("descriptions.playlists"),
  };
}

export default function Page() {
  return <PlaylistClientPage />;
}
