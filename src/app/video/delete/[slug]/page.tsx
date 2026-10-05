"use client";

import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";
import { useVideo, useDeleteVideo } from "@/src/hooks/useVideos";
import { useParams } from "next/navigation";
import { useRequireAuth } from "@/src/hooks/useRequireAuth";
import { Alert, Button, VariantType } from "@openfun/cunningham-react";
import styles from "./styles.module.css";
import { useVideoPermissions } from "@/src/hooks/useVideoPermission";
import CenteredLoader from "@/src/components/Loader/CenteredLoader";
import { useTranslation } from "@/src/hooks/useTranslation";

export const breadcrumbLabel = "Supprimer la vidéo";

export default function DeleteVideoPage() {
  const router = useRouter();
  const params = useParams();
  const { t } = useTranslation();
  const getVideoSlug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;
  const { isAuthenticated, isInitializing, mounted } = useRequireAuth();
  const {
    data: video,
    isLoading: useVideoLoading,
    error,
  } = useVideo(getVideoSlug ?? "");
  const useVideoError = error?.message ?? null;
  const { mutateAsync: deleteVideo } = useDeleteVideo();
  const { isOwnerOrCoOwner } = useVideoPermissions(video ?? null);

  const handleDelete = async () => {
    if (!getVideoSlug) return;
    try {
      await deleteVideo(getVideoSlug);
      router.push("/video");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  if (!mounted || isInitializing || !isAuthenticated) {
    return <CenteredLoader />;
  }

  return (
    <div className={styles["delete-container"]}>
      <Paper sx={{ p: 4, maxWidth: 520, width: "100%" }}>
        <h2>{t("videoEdit.deleteVideo")}</h2>

        {useVideoLoading && !video && <CenteredLoader />}

        {useVideoError ? (
          <div>
            <Alert type={VariantType.ERROR} className={styles["delete-alert"]}>
              {useVideoError ?? t("videoPage.notFound")}
            </Alert>
            <Button
              variant="bordered"
              onClick={() => router.back()}
              disabled={useVideoLoading}
            >
              {t("common.cancel")}
            </Button>
          </div>
        ) : !isOwnerOrCoOwner ? (
          <Alert type={VariantType.ERROR} className={styles["delete-alert"]}>
            {t("errors.accessDenied")}
          </Alert>
        ) : video ? (
          <>
            <p>
              {t("videoEdit.deleteVideoConfirmPrefix")}{" "}
              <strong>{video.title}</strong> ? <br />
              {t("common.permanentAction")}
            </p>

            <div className={styles["buttons-action"]}>
              <Button
                color="brand"
                variant="secondary"
                type="reset"
                onClick={() => router.back()}
                disabled={useVideoLoading}
              >
                {t("common.cancel")}
              </Button>

              <Button
                color="error"
                variant="primary"
                type="button"
                onClick={handleDelete}
                disabled={useVideoLoading}
              >
                {t("videoEdit.deleteVideo")}
              </Button>
            </div>
          </>
        ) : null}
      </Paper>
    </div>
  );
}
