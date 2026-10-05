import React, { useState } from "react";
import { useDocuments } from "@/src/hooks/useDocuments";
import {
  Alert,
  Button,
  FileUploader,
  VariantType,
} from "@openfun/cunningham-react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import { useTranslation } from "@/src/hooks/useTranslation";
import styles from "./VideoCard.module.css";

interface VideoDocumentsFormProps {
  videoId: number;
}

export function VideoDocumentsForm({ videoId }: VideoDocumentsFormProps) {
  const { t, locale } = useTranslation();
  const {
    documents,
    isLoading,
    error,
    uploadDocument,
    isUploading,
    deleteDocument,
    isDeleting,
  } = useDocuments(videoId);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!title.trim() || !file) {
      setLocalError(t("documents.fillTitleAndFile"));
      return;
    }
    setLocalError(null);
    try {
      await uploadDocument({ title, file, is_private: isPrivate });
      setTitle("");
      setFile(null);
      setIsPrivate(false);
    } catch (e: any) {
      setLocalError(e.message || t("documents.uploadError"));
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm(t("documents.deleteConfirm"))) {
      try {
        await deleteDocument(id);
      } catch (e: any) {
        setLocalError(e.message || t("documents.deleteError"));
      }
    }
  };

  return (
    <Box className={styles.videoDocumentsRoot}>
      <Typography variant="h6" gutterBottom>
        {t("videoEdit.documentsTitle")}
      </Typography>

      {(error || localError) && (
        <Alert type={VariantType.ERROR} canClose={true}>
          {localError || t("documents.loadError")}
        </Alert>
      )}

      <Box className={styles.videoDocumentsUploadForm}>
        <Typography variant="subtitle1">{t("documents.addTitle")}</Typography>
        <TextField
          label={t("documents.titleLabel")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          size="small"
        />
        <FileUploader
          text={t("documents.dropzone")}
          onChange={(e: any) => setFile(e?.target?.files?.[0] || e || null)}
          accept="" // Accept any document type
        />
        {file && (
          <Typography variant="body2" color="textSecondary">
            {t("documents.selectedFile")} {file.name}
          </Typography>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
          }
          label={t("documents.privateLabel")}
        />
        <Button
          onClick={handleUpload}
          disabled={isUploading || !title.trim() || !file}
          variant="primary"
          className={styles.videoDocumentsUploadButton}
        >
          {isUploading ? t("pending.sending") : t("documents.addBtn")}
        </Button>
      </Box>

      {isLoading ? (
        <Typography>{t("documents.loading")}</Typography>
      ) : documents && documents.length > 0 ? (
        <List>
          {documents.map((doc) => (
            <ListItem
              key={doc.id}
              className={styles.videoDocumentItem}
            >
              <ListItemText
                primary={doc.title}
                secondary={t("documents.addedOn", {
                  title: `${doc.title}${doc.is_private ? ` 🔒 ${t("documents.private")}` : ""}`,
                  date: new Intl.DateTimeFormat(locale).format(
                    new Date(doc.created_at),
                  ),
                })}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(doc.id)}
                  disabled={isDeleting}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="textSecondary">
          {t("documents.noDocuments")}
        </Typography>
      )}
    </Box>
  );
}
