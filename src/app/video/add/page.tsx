"use client";

import {
  Alert,
  Checkbox,
  Button,
  FileUploader,
  VariantType,
} from "@openfun/cunningham-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { getRoutes } from "@/src/api/routes";
import { useAuth } from "@/src/context/AuthProvider";
import { authFetch } from "@/src/api/authFetch";
import { requestJson } from "@/src/utils/requestJson";
import { useRequireAuth } from "@/src/hooks/useRequireAuth";
import BackButton from "@/src/components/BackButton/BackButton";
import styles from "./styles.module.css";
import CenteredLoader from "@/src/components/Loader/CenteredLoader";
import { useAppConfig } from "@/src/hooks/useAppConfig";
import { useTranslation } from "@/src/hooks/useTranslation";

export const breadcrumbLabel = "Ajouter une vidéo";

type AddVideoFormValues = {
  acceptTerm: boolean;
  videoFile: File | null;
  emptyTitle: string;
};

export default function AddVideo() {
  const { t } = useTranslation();
  const router = useRouter();
  const { accessToken, refresh } = useAuth();
  const { isAuthenticated, isInitializing, mounted } = useRequireAuth();
  const { config } = useAppConfig();

  const [isEmptyModalOpen, setIsEmptyModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError: setFieldError,
    clearErrors,
  } = useForm<AddVideoFormValues>({
    defaultValues: { acceptTerm: false, videoFile: null, emptyTitle: "" },
  });

  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  if (!mounted || isInitializing || !isAuthenticated) {
    return <CenteredLoader />;
  }

  /* ---- Submit import with video file ---- */
  const onSubmitImport = async (data: AddVideoFormValues) => {
    setError(null);
    setIsRedirecting(false);

    try {
      if (!data.videoFile) {
        setFieldError("videoFile", {
          type: "required",
          message: `${t("a11y.chooseFile")}`,
        });
        setError(`${t("a11y.chooseFile")}`);
        return;
      }

      const formData = new FormData();
      formData.append("title", data.videoFile.name);
      formData.append("video_file", data.videoFile);

      const res = await authFetch(getRoutes().video.add, {
        method: "POST",
        body: formData,
        accessToken,
        onRefresh: refresh,
      });
      setIsRedirecting(true);

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => setTimeout(resolve, 200));
      });

      const newVid = await requestJson<{ slug: string }>(res);
      router.push(`/video/edit/${newVid.slug}`);
    } catch (err: unknown) {
      setIsRedirecting(false);
      setError(err instanceof Error ? err.message : `${t("errors.error")}`);
    }
  };

  /* ---- Submit empty card (no file) ---- */
  const onSubmitEmptyCard = async (data: AddVideoFormValues) => {
    setError(null);
    setIsRedirecting(false);

    if (!data.emptyTitle.trim()) {
      setFieldError("emptyTitle", {
        type: "required",
        message: t("common.titleRequired"),
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", data.emptyTitle.trim());

      const res = await authFetch(getRoutes().video.add, {
        method: "POST",
        body: formData,
        accessToken,
        onRefresh: refresh,
      });
      setIsRedirecting(true);
      setIsEmptyModalOpen(false);

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => setTimeout(resolve, 200));
      });

      const newVid = await requestJson<{ slug: string }>(res);
      router.push(`/video/edit/${newVid.slug}`);
    } catch (err: unknown) {
      setIsRedirecting(false);
      setError(err instanceof Error ? err.message : `${t("errors.error")}`);
    }
  };

  return (
    <div>
      <BackButton label={t("common.back")} onClick={() => router.back()} />
      <h1 className={"title"}>{t("navbar.addVideo")}</h1>

      {error && (
        <Alert canClose type={VariantType.ERROR} aria-live="assertive">
          {error}
        </Alert>
      )}

      {isRedirecting ? (
        <div>
          <Alert canClose type={VariantType.SUCCESS} aria-live="polite">
            {t("a11y.videoProcessingMessage")}
          </Alert>
          <LinearProgress
            className={styles["linear-progress"]}
            aria-label="Loading..."
          />
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmitImport)}>
          <Alert
            additional={
              <>
                {t.rich("a11y.fileSizeLimit", {
                  maxSize: config?.encoding?.max_upload_size_gb ?? 2,
                  bold: (chunks) => <b>{chunks}</b>,
                })}
                <br />
                {t("a11y.uploadTimeInfo")}
                <br />
                <b>{t("a11y.uploadWarning")}</b>
              </>
            }
            aria-live="polite"
          >
            {t("common.infos")}
          </Alert>

          <FileUploader
            bigText={t("a11y.chooseVideoOrAudioFile")}
            fullWidth={true}
            state={errors.videoFile ? "error" : "default"}
            onFilesChange={(event) => {
              const file = event.target.value?.[0] ?? null;
              setValue("videoFile", file, { shouldValidate: true });
              if (file) clearErrors("videoFile");
            }}
            accept={
              config?.encoding?.allowed_extensions
                ?.map((ext: string) => `.${ext}`)
                .join(", ") || ".mp4, .avi, .mkv"
            }
            aria-label={t("a11y.chooseVideoOrAudioFile")}
            aria-describedby="videoFile-error"
            aria-required="true"
            text={
              errors.videoFile?.message ??
              `${t("a11y.supportedFormats")} : ${config?.encoding?.allowed_extensions?.join(", ") || "mp4, avi, mkv"}.`
            }
          />
          {errors.videoFile && (
            <p id="videoFile-error" className={styles["field-error"]}>
              {errors.videoFile.message}
            </p>
          )}

          <fieldset className={styles["bloc-terms"]}>
            <legend>{t("a11y.termsOfUse")}</legend>
            <p>
              <b>{t("a11y.intellectualPropertyWarning")}</b>
            </p>
            <p>{t("a11y.publicationAuthorizations")}</p>
            <Checkbox
              className={styles["bloc-terms-checkbox"]}
              label={t("a11y.intellectualPropertyAcknowledgement")}
              fullWidth
              state={errors.acceptTerm ? "error" : "default"}
              aria-describedby="acceptTerm-error"
              aria-required="true"
              {...register("acceptTerm", {
                required: `${t("a11y.acceptTermsRequired")}`,
                validate: (value) =>
                  Boolean(value) || `${t("a11y.acceptTermsRequired")}`,
              })}
            />
            {errors.acceptTerm && (
              <p id="acceptTerm-error" className={styles["field-error"]}>
                {errors.acceptTerm.message}
              </p>
            )}
          </fieldset>

          <div className={styles["form-actions"]}>
            <Button
              type="submit"
              color="success"
              disabled={isSubmitting || isRedirecting}
            >
              {t("a11y.importVideo")}
            </Button>
            <Button
              type="button"
              color="neutral"
              variant="secondary"
              disabled={isSubmitting || isRedirecting}
              onClick={() => setIsEmptyModalOpen(true)}
            >
              <NoteAddIcon
                fontSize="small"
                className={styles["create-empty-icon"]}
              />
              {t("a11y.skipImportCreateEmpty")}
            </Button>
          </div>
        </form>
      )}

      {/* Modal to create an empty record */}
      <Dialog
        open={isEmptyModalOpen}
        onClose={() => setIsEmptyModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ className: styles["empty-record-dialog-paper"] }}
      >
        <DialogTitle className={styles["empty-record-dialog-title"]}>
          <NoteAddIcon className={styles["empty-record-dialog-icon"]} />
          {t("a11y.createEmptyRecord")}
        </DialogTitle>
        <DialogContent dividers>
          <div className={styles["empty-record-dialog-content"]}>
            <p className={styles["empty-record-warning"]}>
              {t.rich("a11y.emptyRecordWarning", {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </p>
            <TextField
              label={`${t("videoEdit.titlePlaceholder")} *`}
              fullWidth
              error={Boolean(errors.emptyTitle)}
              helperText={
                errors.emptyTitle?.message ??
                `${t("a11y.clearDescriptiveTitle")}`
              }
              InputProps={{ className: styles["empty-record-title-input"] }}
              {...register("emptyTitle")}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            variant="secondary"
            color="neutral"
            onClick={() => setIsEmptyModalOpen(false)}
          >
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            color="brand"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmitEmptyCard)}
          >
            {t("a11y.createEmptyRecord")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
