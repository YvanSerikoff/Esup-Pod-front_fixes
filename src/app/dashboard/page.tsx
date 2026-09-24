import type { Metadata } from "next";
import DashboardClientPage from "./DashboardClientPage";

const t = (key: string) => {
  const translations: Record<string, string> = {
    "common.tab": "Dashboard",
    "descritions.dashboard": "Manage your videos and settings on your Esup POD dashboard.",
  };
  return translations[key] || key;
}

export const metadata: Metadata = {
  title: `${t("common.tab")} - Esup-Pod`,
  description: t("descritions.dashboard"),
};

export default function Page() {
  return <DashboardClientPage />;
}
