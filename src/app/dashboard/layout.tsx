import { Metadata } from "next";

const t = (key: string) => {
  const translations: Record<string, string> = {
    "common.tab": "Dashboard",
  };
  return translations[key] || key;
}

export const metadata: Metadata = {
  title: `${t("common.tab")} | Esup POD`,
  description: t("descritions.dashboard"),
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}