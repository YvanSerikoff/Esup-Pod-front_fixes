import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import VideosClientPage from "./VideosClientPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("titles.allVideos"),
    description: t("descriptions.videos"),
  };
}

export default function Page() {
  return <VideosClientPage />;
}
