"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FlagIcon from "@mui/icons-material/Flag";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { useChapters } from "@/src/hooks/useChapters";
import type { Video } from "@/src/types";
import { useTranslation } from "@/src/hooks/useTranslation";
import styles from "./styles.module.css";

type Props = {
  video: Video;
};

/* ── helpers ────────────────────────────────────────────────── */
const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");

const formatTimestamp = (totalSeconds: number): string => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};

const parseTimestamp = (str: string): number => {
  const parts = str.trim().split(":").map(Number);
  if (parts.some(isNaN)) return 0;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] ?? 0;
};

/* ── component ──────────────────────────────────────────────── */
export default function VideoChaptersForm({ video }: Props) {
  const { chapters, createChapter, deleteChapter } = useChapters(
    video.slug,
    video.id,
  );

  const { t } = useTranslation();

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  /* player state */
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.duration ?? 0);
  const [isDragging, setIsDragging] = useState(false);

  /* form state */
  const [title, setTitle] = useState("");
  const [timestamp, setTimestamp] = useState("00:00");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ── video url ─────────────────────────────────────────────── */
  // Prefer the direct file URL (video_url), fallback to thumbnail-based URL
  const videoSrc = video.video_url ?? null;
  const isEncoded = video.encoding_status === "DO" && videoSrc;

  /* ── player controls ────────────────────────────────────────── */
  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
    } else {
      el.pause();
    }
  };

  const seekTo = useCallback((ratio: number) => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    const t = ratio * el.duration;
    el.currentTime = t;
    setCurrentTime(t);
  }, []);

  /* progress bar click / drag */
  const getProgressRatio = (e: React.MouseEvent | MouseEvent): number => {
    const bar = progressRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  };

  const handleProgressMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    seekTo(getProgressRatio(e));
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => seekTo(getProgressRatio(e));
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, seekTo]);

  /* ── capture current time ───────────────────────────────────── */
  const captureCurrentTime = () => {
    const el = videoRef.current;
    const t = el ? el.currentTime : currentTime;
    setTimestamp(formatTimestamp(t));
    // Pause so the user can inspect the frame
    if (el && !el.paused) el.pause();
  };

  /* ── chapter form ───────────────────────────────────────────── */
  const handleAddChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError(`${t("chapters.titleRequired")}`);
      return;
    }
    const seconds = parseTimestamp(timestamp);
    if (duration && seconds > duration) {
      setFormError(
        `${t("chapters.timestampTooLong", { duration: formatTimestamp(duration) })}`,
      );
      return;
    }
    setFormError(null);
    setIsSubmitting(true);
    try {
      await createChapter({
        video: video.id,
        title: title.trim(),
        time_start: seconds,
      });
      setTitle("");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : `${t("chapters.addError")}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteChapter(id);
    } catch (err) {
      console.error(err);
    }
  };

  /* progress % */
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  /* sorted chapters */
  const sortedChapters = [...chapters].sort(
    (a, b) => a.time_start - b.time_start,
  );

  /* ── render ─────────────────────────────────────────────────── */
  return (
    <div className={styles.chaptersForm}>
      {/* ── PLAYER SECTION ─────────────────────────────────────── */}
      <div className={styles.chapterPlayer}>
        {isEncoded ? (
          <>
            {/* VIDEO ELEMENT */}
            <video
              ref={videoRef}
              src={videoSrc}
              className={styles.chapterVideo}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />

            {/* CHAPTER MARKERS OVERLAY on video progress */}
            <div
              ref={progressRef}
              onMouseDown={handleProgressMouseDown}
              className={styles.chapterProgress}
            >
              {/* Filled bar */}
              <div
                className={`${styles.chapterProgressFill} ${
                  isDragging ? styles.chapterProgressDragging : ""
                }`}
                ref={(element) =>
                  element?.style.setProperty(
                    "--chapter-progress-right",
                    `${100 - progressPct}%`,
                  )
                }
              />

              {/* Chapter segment separators */}
              {duration > 0 &&
                sortedChapters.map((ch) => (
                  <div
                    key={ch.id}
                    title={`${formatTimestamp(ch.time_start)} — ${ch.title}`}
                    className={styles.chapterMarker}
                    ref={(element) =>
                      element?.style.setProperty(
                        "--chapter-marker-left",
                        `${(ch.time_start / duration) * 100}%`,
                      )
                    }
                  />
                ))}

              {/* Playhead thumb */}
              <div
                className={styles.chapterPlayhead}
                ref={(element) =>
                  element?.style.setProperty(
                    "--chapter-playhead-left",
                    `${progressPct}%`,
                  )
                }
              />
            </div>

            {/* CONTROLS BAR */}
            <div className={styles.chapterControls}>
              {/* Play / Pause */}
              <button
                type="button"
                onClick={togglePlay}
                className={styles.chapterPlayButton}
                title={isPlaying ? "Pause" : "Lecture"}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </button>

              {/* Current time */}
              <span className={styles.chapterTime}>
                {formatTimestamp(currentTime)}
                {" / "}
                {formatTimestamp(duration)}
              </span>

              <div className={styles.chapterControlsSpacer} />

              {/* CAPTURE BUTTON */}
              <button
                type="button"
                onClick={captureCurrentTime}
                className={styles.chapterCaptureButton}
                title={t("chapters.captureTooltip")}
              >
                <FlagIcon fontSize="small" />
                {t("chapters.captureMoment")}
              </button>
            </div>
          </>
        ) : (
          /* NOT ENCODED YET */
          <div className={styles.chapterUnavailable}>
            <BookmarksIcon className={styles.chapterUnavailableIcon} />
            <span className={styles.chapterUnavailableTitle}>
              {t("videoPlayer.encodingInProgress")}
            </span>
            <span className={styles.chapterUnavailableDescription}>
              {t("chapters.playerUnavailable")}
            </span>
          </div>
        )}
      </div>

      {/* ── CHAPTER LIST ───────────────────────────────────────── */}
      <div className={styles.chapterList}>
        <div className={styles.chapterListHeader}>
          <BookmarksIcon className={styles.chapterListIcon} />
          <span className={styles.chapterListTitle}>
            {t("chapters.countLabel", { count: sortedChapters.length })}
          </span>
        </div>

        {sortedChapters.length === 0 ? (
          <p className={styles.chapterListEmpty}>
            {t.rich("chapters.empty", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        ) : (
          <div className={styles.chapterRows}>
            {sortedChapters.map((ch, i) => (
              <div
                key={ch.id}
                onClick={() => {
                  const el = videoRef.current;
                  if (el) {
                    el.currentTime = ch.time_start;
                    setCurrentTime(ch.time_start);
                  }
                }}
                className={`${styles.chapterRow} ${
                  isEncoded ? styles.chapterRowClickable : ""
                }`}
                title={isEncoded ? `${t("chapters.goToMoment")}` : undefined}
              >
                {/* Index chip */}
                <span className={styles.chapterIndex}>{i + 1}</span>

                {/* Timestamp */}
                <span className={styles.chapterTimestamp}>
                  {formatTimestamp(ch.time_start)}
                </span>

                {/* Title */}
                <span className={styles.chapterTitle}>{ch.title}</span>

                {/* Delete */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(ch.id);
                  }}
                  className={styles.chapterDeleteButton}
                  title={t("chapters.deleteChapter")}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── ADD CHAPTER FORM ────────────────────────────────────── */}
      <div className={styles.chapterAddPanel}>
        <p className={styles.chapterAddHeading}>
          <AddIcon fontSize="small" />
          {t("chapters.addTitle")}
        </p>

        {formError && <p className={styles.chapterFormError}>{formError}</p>}

        <form onSubmit={handleAddChapter} className={styles.chapterForm}>
          {/* Timestamp input */}
          <div className={styles.chapterFormField}>
            <label className={styles.chapterFormLabel}>
              {t("chapters.timeLabel")}
            </label>
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="00:00"
              pattern="[0-9]{1,2}:[0-5][0-9](:[0-5][0-9])?"
              className={`${styles.chapterInput} ${styles.chapterTimestampInput}`}
            />
          </div>

          {/* Title input */}
          <div className={styles.chapterFormField}>
            <label className={styles.chapterFormLabel}>
              {t("chapters.titleLabel")}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("chapters.titlePlaceholder")}
              className={styles.chapterInput}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className={`${styles.chapterSubmitButton} ${
              isSubmitting || !title.trim() ? styles.chapterSubmitDisabled : ""
            }`}
          >
            <AddIcon fontSize="small" />
            {t("common.add")}
          </button>
        </form>
      </div>
    </div>
  );
}
