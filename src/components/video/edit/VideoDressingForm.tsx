"use client";

import React, { useState } from "react";
import {
  MenuItem,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import PaletteIcon from "@mui/icons-material/Palette";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDressings } from "@/src/hooks/useDressing";
import { authFetch } from "@/src/api/authFetch";
import { getRoutes } from "@/src/api/routes";
import { useAuth } from "@/src/context/AuthProvider";
import type { Video } from "@/src/types";
import { useTranslation } from "@/src/hooks/useTranslation";
import styles from "./styles.module.css";

const POSITION_OPTIONS = [
  { value: "top_right", label: "Haut droite" },
  { value: "top_left", label: "Haut gauche" },
  { value: "bottom_right", label: "Bas droite" },
  { value: "bottom_left", label: "Bas gauche" },
];

/* ------------------------------------------------------------------
 * CreateDressingPanel – inline creation panel (replaces the list)
 * ------------------------------------------------------------------ */
type CreatePanelProps = {
  onBack: () => void;
  onCreated: (dressingId: number) => void;
};

function CreateDressingPanel({ onBack, onCreated }: CreatePanelProps) {
  const { createDressing } = useDressings();

  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("top_right");
  const [opacity, setOpacity] = useState(100);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleCreate = async () => {
    if (!title.trim()) {
      setError(t("common.titleRequired"));
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const created = await createDressing({ title, position, opacity });
      onCreated((created as any).id);
    } catch (e: any) {
      setError(e.message || t("errors.create"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.dressingCreatePanel}>
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className={styles.dressingBackButton}
      >
        <ArrowBackIcon fontSize="small" />
        {t("common.selectionReturn")}
      </button>

      <div className={styles.dressingCreateCard}>
        <div className={styles.dressingSectionHeader}>
          <div className={styles.dressingCreateIconCircle}>
            <AddCircleOutlineIcon className={styles.dressingPrimaryIcon} />
          </div>
          <div>
            <div className={styles.dressingSectionTitle}>
              {t("videoDressing.create")}
            </div>
            <div className={styles.dressingSectionDescription}>
              {t("common.configBase")}
            </div>
          </div>
        </div>

        {error && (
          <div className={styles.dressingError}>
            {error}
          </div>
        )}

        {/* Title */}
        <TextField
          label={t("videoDressing.title")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          size="small"
          className={styles.dressingTitleField}
          helperText={t("videoDressing.unique")}
        />

        {/* Position */}
        <FormControl fullWidth size="small">
          <InputLabel>{t("videoEdit.position")}</InputLabel>
          <Select
            value={position}
            label={t("videoEdit.position")}
            onChange={(e) => setPosition(e.target.value)}
            className={styles.dressingSelect}
          >
            {POSITION_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Opacity */}
        <div>
          <div className={styles.dressingOpacityHeader}>
            <span>{t("videoEdit.opacity")}</span>
            <span className={styles.dressingOpacityValue}>
              {opacity}%
            </span>
          </div>
          <Slider
            value={opacity}
            min={1}
            max={100}
            onChange={(_, v) => setOpacity(v as number)}
            className={styles.dressingOpacitySlider}
          />
        </div>

        <div className={styles.dressingHint}>
          {t("videoDressing.addWatermark")}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.dressingActions}>
        <button
          type="button"
          onClick={onBack}
          disabled={saving}
          className={`${styles.dressingCancelButton} ${
            saving ? styles.dressingButtonDisabled : ""
          }`}
        >
          {t("common.cancel")}
        </button>
        <button
          type="button"
          onClick={handleCreate}
          disabled={saving || !title.trim()}
          className={`${styles.dressingCreateButton} ${
            !title.trim() || saving ? styles.dressingButtonDisabled : ""
          }`}
        >
          {saving ? (
            <CircularProgress size={16} className={styles.dressingWhiteProgress} />
          ) : (
            <CheckCircleOutlineIcon fontSize="small" />
          )}
          {saving ? t("videoDressing.creation") : t("videoDressing.create")}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Main component
 * ------------------------------------------------------------------ */
type Props = {
  video: Video;
  onDressingUpdated?: () => void;
};

export default function VideoDressingForm({ video, onDressingUpdated }: Props) {
  const { dressings, isLoading } = useDressings();
  const { accessToken, refresh } = useAuth();

  const [selectedDressingId, setSelectedDressingId] = useState<number | "">(
    video.dressing ?? "",
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [view, setView] = useState<"select" | "create">("select");
  const { t } = useTranslation();

  /* ---- Apply dressing to video ---- */
  const handleDressingChange = async (newId: number | "") => {
    setSelectedDressingId(newId);
    setIsUpdating(true);
    setMsg(null);
    try {
      const res = await authFetch(getRoutes().video.update(video.slug), {
        accessToken,
        onRefresh: refresh,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dressing: newId === "" ? null : newId }),
      });
      if (!res.ok) throw new Error(t("videoDressing.errorUpdate"));
      setMsg({ text: t("videoDressing.successCreate"), ok: true });
      if (onDressingUpdated) onDressingUpdated();
    } catch (err) {
      setMsg({
        text: err instanceof Error ? err.message : t("errors.update"),
        ok: false,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  /* ---- After creation, select the new dressing ---- */
  const handleCreated = async (dressingId: number) => {
    setView("select");
    await handleDressingChange(dressingId);
  };

  const activeDressing = dressings.find((d) => d.id === selectedDressingId);

  /* ---- Create panel ---- */
  if (view === "create") {
    return (
      <CreateDressingPanel
        onBack={() => setView("select")}
        onCreated={handleCreated}
      />
    );
  }

  /* ---- Select panel ---- */
  return (
    <div className={styles.dressingSelectPanel}>
      {/* Header row */}
      <div className={styles.dressingMainHeader}>
        <div className={styles.dressingMainSectionHeader}>
          <div className={styles.dressingMainIconCircle}>
            <StyleIcon className={styles.dressingPrimaryIcon} />
          </div>
          <div>
            <div className={styles.dressingSectionTitle}>
              {t("videoDressing.dressing")}
            </div>
            <div className={styles.dressingSectionDescription}>
              {t("videoDressing.addWatermark")}, {t("videoDressing.start")}{" "}
              &amp; {t("videoDressing.end")}.
            </div>
          </div>
        </div>

        {/* Create button */}
        <button
          type="button"
          onClick={() => setView("create")}
          className={styles.dressingHeaderCreateButton}
        >
          <AddCircleOutlineIcon fontSize="small" />
          {t("videoDressing.create")}
        </button>
      </div>

      {/* Feedback message */}
      {msg && (
        <div
          className={`${styles.dressingFeedback} ${
            msg.ok ? styles.dressingFeedbackSuccess : styles.dressingFeedbackError
          }`}
        >
          {msg.ok ? <CheckCircleOutlineIcon fontSize="small" /> : null}
          {msg.text}
        </div>
      )}

      {/* Dressing selector */}
      {isLoading ? (
        <div className={styles.dressingLoading}>
          <CircularProgress size={20} className={styles.dressingPrimaryProgress} />
          {t("videoDressing.loading")}
        </div>
      ) : dressings.length === 0 ? (
        <div className={styles.dressingEmpty}>
          <StyleIcon className={styles.dressingEmptyIcon} />
          <p className={styles.dressingEmptyText}>
            {t("videoDressing.noDressing")}
          </p>
          <button
            type="button"
            onClick={() => setView("create")}
            className={styles.dressingEmptyCreateButton}
          >
            <AddCircleOutlineIcon fontSize="small" />
            {t("videoDressing.create")}
          </button>
        </div>
      ) : (
        <div className={styles.dressingCards}>
          {/* None option */}
          <DressingCard
            isSelected={selectedDressingId === ""}
            onClick={() => handleDressingChange("")}
            disabled={isUpdating}
          >
            <div className={styles.dressingCardRow}>
              <DeleteOutlineIcon className={styles.dressingMutedIcon} />
              <span className={styles.dressingNoneLabel}>
                {t("videoDressing.noDressing")}
              </span>
            </div>
          </DressingCard>

          {/* Dressing cards */}
          {dressings.map((d) => (
            <DressingCard
              key={d.id}
              isSelected={selectedDressingId === d.id}
              onClick={() => handleDressingChange(d.id)}
              disabled={isUpdating}
            >
              <div className={styles.dressingCardRow}>
                <div className={styles.dressingSmallIconCircle}>
                  <PaletteIcon className={styles.dressingPaletteIcon} />
                </div>
                <div className={styles.dressingCardContent}>
                  <div className={styles.dressingCardTitle}>
                    {d.title}
                  </div>
                  <div className={styles.dressingCardDescription}>
                    {[
                      d.watermark ? t("videoDressing.watermark") : null,
                      d.opening_credits ? t("videoDressing.start") : null,
                      d.ending_credits ? t("videoDressing.end") : null,
                    ]
                      .filter(Boolean)
                      .join(" • ") || t("videoDressing.noConfig")}
                  </div>
                </div>
                {selectedDressingId === d.id && (
                  <CheckCircleOutlineIcon className={styles.dressingSelectedIcon} />
                )}
              </div>
            </DressingCard>
          ))}
        </div>
      )}

      {/* Active dressing detail */}
      {activeDressing && (
        <div className={styles.dressingDetails}>
          <div className={styles.dressingDetailsTitle}>
            {t("videoDressing.dressing")} : {activeDressing.title}
          </div>
          {activeDressing.watermark && (
            <div>
              {t("videoDressing.watermark")} — Position :{" "}
              {activeDressing.position}, {t("videoDressing.opacity")} :{" "}
              {activeDressing.opacity}%
            </div>
          )}
          {activeDressing.opening_credits && (
            <div>
              {t("videoDressing.start")} : {t("common.video")} #
              {activeDressing.opening_credits}
            </div>
          )}
          {activeDressing.ending_credits && (
            <div>
              {t("videoDressing.end")} : {t("common.video")} #
              {activeDressing.ending_credits}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
 * DressingCard – clickable selector row
 * ------------------------------------------------------------------ */
function DressingCard({
  isSelected,
  onClick,
  disabled,
  children,
}: {
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${styles.dressingCard} ${
        isSelected ? styles.dressingCardSelected : ""
      } ${disabled ? styles.dressingCardDisabled : ""}`}
    >
      {children}
    </button>
  );
}
