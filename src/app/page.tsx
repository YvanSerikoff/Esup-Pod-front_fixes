"use client";
import VideosList from "@/src/components/video/VideosList";
import { Button, Alert, VariantType } from "@openfun/cunningham-react";
import { useVideosList } from "../hooks/useVideos";
import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthProvider";
import CenteredLoader from "../components/Loader/CenteredLoader";
import { useMounted } from "../hooks/useMounted";
import styles from "./page.module.css";

import { useAppConfig } from "../hooks/useAppConfig";
import WebTVLayout from "../components/WebTV/WebTVLayout";

import { useTranslation } from "@/src/hooks/useTranslation";

export default function Accueil() {
  const router = useRouter();
  const mounted = useMounted();
  const { config } = useAppConfig();
  const { videos, useVideoError, useVideoLoading } = useVideosList(
    undefined,
    "all",
    { enabled: mounted },
  );
  const { user } = useAuth();
  const { t } = useTranslation();

  const isWebTV = (config as any)?.video?.webtv_mode === true;

  const latestVisiblePublicVideos = useMemo(() => {
    return [...videos]
      .filter(
        (video) =>
          (!video.is_auth_required || !!user) &&
          video.status !== "DR" &&
          (video.encoding_status === "DO" || !!video.has_video_file),
      )
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .slice(0, 10);
  }, [videos, user]);

  if (!mounted || (useVideoLoading && !useVideoError)) {
    return <CenteredLoader />;
  }

  if (isWebTV) {
    return <WebTVLayout />;
  }

  return (
    <div>
      <h1 className={`title`}>Pod Univ</h1>
      <h2 className={"subtitle"}>{t("home.welcomeSubtitle")}</h2>

      <div>
        <div className={styles["welcome-banner"]}>
          {/* Left Text */}
          <div className={styles["welcome-text"]}>
            <p className={styles["welcome-intro"]}>{t("home.welcomeIntro")}</p>
          </div>

          {/* Right Box */}
          <div className={styles["welcome-green-box"]}>
            <span
              className={`material-icons ${styles["welcome-icon"]}`}
              aria-hidden="true"
            >
              help_outline
            </span>
            <div>
              <Link
                href="/pages/how-to"
                className={styles["welcome-link-title"]}
              >
                {t("home.howToTitle")}
              </Link>
              <p className={styles["welcome-description"]}>
                {t("home.howToDescPrefix")}
                <Link href="/pages/use-pod" className={styles["welcome-link"]}>
                  {t("home.quickGuideLink")}
                </Link>
                {t("home.howToDescSuffix")}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons Row */}
        <div className={styles["action-buttons"]}>
          {user &&
            ((config as any)?.video?.allow_authenticated_upload !== false ||
              user?.is_staff) && (
              <Button
                onClick={() => router.push("/video/add")}
                icon={<span className="material-icons">add_circle</span>}
                variant="primary"
              >
                {t("common.addVideo")}
              </Button>
            )}
          <Button
            onClick={() => router.push("/pages/use-pod")}
            icon={<span className="material-icons">play_circle</span>}
            variant="primary"
          >
            {t("home.btnUsePod")}
          </Button>
          <Button
            onClick={() => router.push("/pages/how-to")}
            icon={<span className="material-icons">help_outline</span>}
            variant="primary"
          >
            {t("home.btnHowTo")}
          </Button>
          <Button
            onClick={() => router.push("/pages/copyright")}
            icon={<span className="material-icons">security</span>}
            variant="primary"
          >
            {t("home.btnCopyright")}
          </Button>
        </div>

        <div className={styles["latest-videos-section"]}>
          <h2 className={"subtitle"}>{t("home.latestVideos")}</h2>
          {latestVisiblePublicVideos.length > 0 ? (
            <div className={styles["latest-videos-content"]}>
              <VideosList videosList={latestVisiblePublicVideos} />
              <div className={styles["all-videos-action"]}>
                <Link href="/video">
                  <Button
                    icon={<span className="material-icons">play_circle</span>}
                    iconPosition="right"
                    variant="primary"
                    size="medium"
                  >
                    {t("home.btnAllVideos")}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            !useVideoLoading && (
              <Alert
                type={useVideoError ? VariantType.WARNING : VariantType.INFO}
              >
                {useVideoError
                  ? t("home.videoServiceError")
                  : t("home.noRecentVideos")}
              </Alert>
            )
          )}
        </div>
      </div>
    </div>
  );
}
