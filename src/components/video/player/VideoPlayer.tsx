import React, { useEffect, useRef, useState, useMemo } from "react";
import type { Video, Chapter } from "@/src/types";
import { useMarker } from "@/src/hooks/useMarker";
import { useAppConfig } from "@/src/hooks/useAppConfig";
import CenteredLoader from "@/src/components/Loader/CenteredLoader";
import { useTranslation } from "@/src/hooks/useTranslation";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hotkeys";
import styles from "./styles.module.css";

type Props = {
  video: Video;
  streamUrl: string;
  autoPlay?: boolean;
  /** Callback called when the video starts. */
  onPlay?: () => void;
  /** Callback called when the video ends. */
  onEnded?: () => void;
};

export default function VideoPlayer({
  video,
  streamUrl,
  autoPlay,
  onPlay,
  onEnded,
}: Props) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<string>("16 / 9");

  const [seekIndicator, setSeekIndicator] = useState<{
    type: "forward" | "backward";
  } | null>(null);
  const seekIndicatorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showSeekIndicator = (type: "forward" | "backward") => {
    setSeekIndicator({ type });
    if (seekIndicatorTimeoutRef.current) {
      clearTimeout(seekIndicatorTimeoutRef.current);
    }
    seekIndicatorTimeoutRef.current = setTimeout(() => {
      setSeekIndicator(null);
    }, 600);
  };
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);

  const { config } = useAppConfig();
  const useMarkerTime = config?.video?.use_marker_time !== false;
  const { markerTime, saveMarker, resetMarker } = useMarker(video.slug);
  const vjsPlayerRef = useRef<any>(null);
  const hasSeekedRef = useRef(false);

  // Stable serialized keys
  const videoId = video.id;
  const videoTitle = video.title;
  const poster = video.thumbnail_url ?? video.thumbnail ?? "";

  const chapters: Chapter[] = useMemo(() => {
    return [...(video.chapters ?? [])].sort(
      (a, b) => a.time_start - b.time_start,
    );
  }, [video.chapters]);

  const subtitlesKey = JSON.stringify(
    (video.subtitles ?? [])
      .filter((s) => s.file?.endsWith(".vtt"))
      .map((s) => ({ file: s.file, lang: s.language, def: s.is_default })),
  );

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    setIsReady(false);
    setHasError(false);

    let vjsPlayer: ReturnType<typeof videojs> | null = null;
    let mpegtsPlayer: any | null = null;
    let isMounted = true;
    let mediaEl: HTMLVideoElement | null = null;

    const initPlayer = async () => {
      let mpegts: any | null = null;
      try {
        mpegts = (await import("mpegts.js")).default;
      } catch (e) {
        console.warn("mpegts.js could not be loaded:", e);
      }

      const isHls =
        streamUrl.includes(".m3u8") ||
        streamUrl.includes("format=m3u8") ||
        streamUrl.includes("playlist.m3u8");

      const isTs = streamUrl.includes(".ts") || streamUrl.includes("format=ts");

      if (!isMounted) return;

      mediaEl = document.createElement("video");
      mediaEl.className = "video-js vjs-default-skin";
      mediaEl.controls = true;
      mediaEl.playsInline = true;
      mediaEl.setAttribute("aria-label", videoTitle);
      mediaEl.setAttribute("crossOrigin", "anonymous");

      if (poster) {
        mediaEl.poster = poster;
      }

      const validSubtitles = (video.subtitles ?? []).filter((s) =>
        s.file?.endsWith(".vtt"),
      );
      for (const subtitle of validSubtitles) {
        const trackEl = document.createElement("track");
        trackEl.kind = "subtitles";
        trackEl.src = subtitle.file;
        trackEl.srclang = subtitle.language.toLowerCase();
        trackEl.label = subtitle.language.toUpperCase();
        trackEl.default = subtitle.is_default;
        mediaEl.appendChild(trackEl);
      }

      containerEl.appendChild(mediaEl);

      const options: any = {
        fill: true,
        controls: true,
        preload: "auto",
        autoplay: !!autoPlay,
        poster: poster,
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          volumePanel: { inline: false },
          fullscreenToggle: true,
          pictureInPictureToggle: true,
        },
      };

      vjsPlayer = videojs(mediaEl, options, () => {
        vjsPlayer?.hotkeys({
          volumeStep: 0.1,
          seekStep: 10,
          enableModifiersForNumbers: false,
        });
      });

      vjsPlayerRef.current = vjsPlayer;

      vjsPlayer.one("loadedmetadata", () => {
        if (!isMounted) return;
        setIsReady(true);
        // Calculate natural video aspect ratio dynamically to prevent black bars
        const w = vjsPlayer?.videoWidth() || mediaEl?.videoWidth;
        const h = vjsPlayer?.videoHeight() || mediaEl?.videoHeight;
        if (w && h && w > 0 && h > 0) {
          setAspectRatio(`${w} / ${h}`);
        }
      });

      vjsPlayer.on("error", () => {
        if (isMounted) setHasError(true);
      });

      vjsPlayer.on("keydown", (e: any) => {
        if (e.which === 37) {
          // Left arrow
          showSeekIndicator("backward");
        } else if (e.which === 39) {
          // Right arrow
          showSeekIndicator("forward");
        }
      });

      let isIntentionallyPaused = !autoPlay;

      vjsPlayer.on("play", () => {
        isIntentionallyPaused = false;
      });

      vjsPlayer.on("pause", () => {
        if (vjsPlayer && !vjsPlayer.scrubbing()) {
          isIntentionallyPaused = true;
        }
      });

      vjsPlayer.on("seeked", () => {
        if (!isIntentionallyPaused && vjsPlayer) {
          const p = vjsPlayer.play();
          if (p && p.catch) p.catch(() => {});
        }
      });

      if (onPlay) {
        let hasPlayed = false;
        vjsPlayer.on("play", () => {
          if (!hasPlayed && isMounted) {
            hasPlayed = true;
            onPlay();
          }
        });
      }

      if (onEnded) {
        vjsPlayer.on("ended", () => {
          if (isMounted) onEnded();
        });
      }

      if (isHls) {
        vjsPlayer.src({ src: streamUrl, type: "application/x-mpegURL" });
      } else if (isTs && mpegts && mpegts.isSupported()) {
        mpegtsPlayer = mpegts.createPlayer(
          { type: "mse", url: streamUrl },
          { accurateSeek: false, seekType: "range" },
        );
        mpegtsPlayer.attachMediaElement(mediaEl);
        mpegtsPlayer.load();
        if (autoPlay) mpegtsPlayer.play();
      } else {
        vjsPlayer.src({ src: streamUrl, type: "video/mp4" });
      }
    };

    initPlayer();

    return () => {
      isMounted = false;
      if (mpegtsPlayer) {
        try {
          mpegtsPlayer.destroy();
        } catch {
          /* ignore */
        }
      }
      if (vjsPlayer) {
        vjsPlayer.dispose();
        vjsPlayerRef.current = null;
      } else if (mediaEl && containerEl.contains(mediaEl)) {
        containerEl.removeChild(mediaEl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamUrl, videoId, videoTitle, poster, subtitlesKey, autoPlay]);

  // Handle seeking to marker time once ready
  useEffect(() => {
    if (
      isReady &&
      useMarkerTime &&
      markerTime > 0 &&
      !hasSeekedRef.current &&
      vjsPlayerRef.current
    ) {
      vjsPlayerRef.current.currentTime(markerTime);
      hasSeekedRef.current = true;
    }
  }, [isReady, markerTime, useMarkerTime]);

  // Handle saving marker time
  useEffect(() => {
    if (!isReady || !useMarkerTime || !vjsPlayerRef.current) return;
    const player = vjsPlayerRef.current;

    const handlePause = () => {
      const time = player.currentTime();
      if (time && time > 5) {
        // don't save if very start
        saveMarker(Math.floor(time));
      }
    };

    const handleEnded = () => {
      resetMarker();
      hasSeekedRef.current = false;
    };

    player.on("pause", handlePause);
    player.on("ended", handleEnded);

    return () => {
      player.off("pause", handlePause);
      player.off("ended", handleEnded);
    };
  }, [isReady, useMarkerTime, saveMarker, resetMarker]);

  const isEncoding = video.encoding_status === "PR";

  if (hasError || !streamUrl) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className={styles.playerError}
        ref={(element) =>
          element?.style.setProperty("--player-aspect-ratio", aspectRatio)
        }
      >
        {poster && (
          <img src={poster} alt="" className={styles.playerErrorPoster} />
        )}
        <div className={styles.playerErrorMessage}>
          <span className={`material-icons ${styles.playerErrorIcon}`}>
            {isEncoding ? "hourglass_empty" : "info"}
          </span>
          <span>
            {isEncoding
              ? t("videoPlayer.encodingInProgress")
              : t("videoPlayer.unableToLoad")}
          </span>
          <button
            onClick={() => {
              setHasError(false);
              setIsReady(false);
            }}
            className={styles.playerRetry}
          >
            <span className={`material-icons ${styles.playerRetryIcon}`}>
              refresh
            </span>
            {t("videoPlayer.retry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.playerContainer}
      ref={(element) =>
        element?.style.setProperty("--player-aspect-ratio", aspectRatio)
      }
    >
      <div ref={containerRef} className={styles.videoJsContainer} />

      {/* Chapters Overlay / Segment Markers on progress bar */}
      {isReady &&
        chapters.length > 0 &&
        video.duration &&
        video.duration > 0 && (
          <div
            className={styles.chapterOverlay}
          >
            {chapters.map((ch, idx) => {
              const nextStart = chapters[idx + 1]
                ? chapters[idx + 1].time_start
                : video.duration!;
              const segDuration = Math.max(0, nextStart - ch.time_start);
              const pct = (segDuration / video.duration!) * 100;

              return (
                <div
                  key={ch.id || idx}
                  className={`${styles.chapterSegment} ${
                    idx < chapters.length - 1
                      ? styles.chapterSegmentDivider
                      : ""
                  }`}
                  ref={(element) =>
                    element?.style.setProperty("--chapter-segment-width", `${pct}%`)
                  }
                  onMouseEnter={() => setHoveredChapter(ch.title)}
                  onMouseLeave={() => setHoveredChapter(null)}
                  title={ch.title}
                />
              );
            })}
          </div>
        )}

      {/* Chapter Hover Title */}
      {hoveredChapter && (
        <div className={styles.chapterHoverTitle}>
          {hoveredChapter}
        </div>
      )}

      {/* Seek Indicator Overlay */}
      {seekIndicator && (
        <div className={styles.seekIndicator}>
          <span className={`material-icons ${styles.seekIcon}`}>
            {seekIndicator.type === "forward" ? "fast_forward" : "fast_rewind"}
          </span>
          <span className={styles.seekLabel}>
            {seekIndicator.type === "forward" ? "+10s" : "-10s"}
          </span>
        </div>
      )}

      {!isReady && (
        <div className={styles.playerLoadingOverlay}>
          <CenteredLoader />
        </div>
      )}
    </div>
  );
}
