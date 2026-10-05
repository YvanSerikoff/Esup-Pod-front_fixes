"use client";

import { useEffect, useMemo, useState } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./styles.module.css";

import type { Playlist } from "@/src/types";
import { usePlaylist } from "@/src/hooks/usePlaylist";
import { useFavorites } from "@/src/hooks/useFavorites";
import { useTranslation } from "@/src/hooks/useTranslation";

interface PlaylistActionMenuProps {
  playlists: Playlist[];
  videoId: number;
}

type InfoKind = "added" | "removed" | "favorite-added" | "favorite-removed";

export default function PlaylistActionMenu({
  playlists,
  videoId,
}: PlaylistActionMenuProps) {
  const { addVideo, deleteVideo } = usePlaylist();
  const {
    favorites,
    fetchAll: fetchAllFavorites,
    addFavorite,
    removeFavoriteForVideo,
    isFavorite,
  } = useFavorites();

  const { t } = useTranslation();

  // Popover anchor (null = closed)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [pendingSlug, setPendingSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Local state: slug -> boolean indicating whether the video is in the playlist.
  const [checkedOverrides, setCheckedOverrides] = useState<
    Record<number, Record<string, boolean>>
  >({});

  // Success message displayed for 5 seconds.
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [infoKind, setInfoKind] = useState<InfoKind | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "playlist-action-popover" : undefined;

  useEffect(() => {
    if (!infoMessage) return;
    const timeout = setTimeout(() => {
      setInfoMessage(null);
      setInfoKind(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [infoMessage]);

  // Derive membership from playlists and preserve optimistic updates locally.
  const checkedMap = useMemo(() => {
    const next: Record<string, boolean> = {};
    const videoOverrides = checkedOverrides[videoId] ?? {};
    playlists.forEach((playlist) => {
      const contains =
        playlist.items?.some((item) => item.video.id === videoId) ?? false;
      next[playlist.slug] = videoOverrides[playlist.slug] ?? contains;
    });
    return next;
  }, [checkedOverrides, playlists, videoId]);

  useEffect(() => {
    if (!favorites.length) {
      fetchAllFavorites();
    }
  }, [favorites.length, fetchAllFavorites]);

  const handlePlaylistButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl((current) => (current ? null : event.currentTarget));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTogglePlaylist = async (playlist: Playlist) => {
    if (pendingSlug) {
      return;
    }

    const isInPlaylist = checkedMap[playlist.slug] === true;
    setPendingSlug(playlist.slug);
    setError(null);
    setInfoMessage(null);
    setInfoKind(null);

    try {
      if (!isInPlaylist) {
        // Add video to playlist
        await addVideo(playlist.slug, { video_id: videoId });
        setCheckedOverrides((prev) => ({
          ...prev,
          [videoId]: {
            ...prev[videoId],
            [playlist.slug]: true,
          },
        }));
        setInfoKind("added");
        setInfoMessage(
          t("videoPage.videoAddedToPlaylist", {
            title: playlist.title,
          }),
        );
      } else {
        // Remove video from playlist
        await deleteVideo(playlist.slug, { video_id: videoId });
        setCheckedOverrides((prev) => ({
          ...prev,
          [videoId]: {
            ...prev[videoId],
            [playlist.slug]: false,
          },
        }));
        setInfoKind("removed");
        setInfoMessage(
          t("videoPage.videoRemovedFromPlaylist", {
            title: playlist.title,
          }),
        );
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : t("playlists.playlistUpdateError"),
      );
    } finally {
      setPendingSlug(null);
    }
  };

  const handleToggleFavorite = async () => {
    if (!videoId) {
      return;
    }

    setError(null);
    setInfoMessage(null);
    setInfoKind(null);

    const currentlyFavorite = isFavorite(videoId);

    try {
      if (!currentlyFavorite) {
        const res = await addFavorite(videoId);
        if (res) {
          setInfoKind("favorite-added");
          setInfoMessage(t("videoPage.videoAddedToFavorites"));
        }
      } else {
        const ok = await removeFavoriteForVideo(videoId);
        if (ok) {
          setInfoKind("favorite-removed");
          setInfoMessage(t("videoPage.videoRemovedFromFavorites"));
        }
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : t("favorites.favoriteUpdateError"),
      );
    }
  };

  const favorite = isFavorite(videoId);

  return (
    <>
      <div className={styles["action-pill-group"]}>
        <button
          className={styles["action-pill"]}
          aria-describedby={id}
          onClick={handlePlaylistButtonClick}
        >
          <PlaylistAddIcon fontSize="small" /> {t("common.playlist")}
        </button>

        <button
          className={styles["action-pill"]}
          onClick={handleToggleFavorite}
        >
          {favorite ? (
            <FavoriteIcon
              fontSize="small"
              aria-hidden="true"
              className={styles["favorite-icon"]}
            />
          ) : (
            <FavoriteBorderIcon
              fontSize="small"
              aria-hidden="true"
              className={styles["favorite-icon"]}
            />
          )}
          {t("videoPage.favorite")}
        </button>
      </div>

      {/* playlists list */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          className: styles["playlist-popover-paper"],
        }}
      >
        <div className={styles["playlist-popover-header"]}>
          <Typography
            variant="subtitle2"
            component="h4"
            className={styles["playlist-popover-title"]}
          >
            {t("videoPage.addToPlaylist")}
          </Typography>
          {error && (
            <Typography
              variant="body2"
              className={styles["playlist-popover-error"]}
            >
              {error}
            </Typography>
          )}
        </div>

        <MenuList
          dense
          disablePadding
          className={styles["playlist-menu-list"]}
        >
          {playlists.length === 0 && (
            <MenuItem disabled>{t("videoPage.noPlaylistsAvailable")}</MenuItem>
          )}

          {playlists.map((playlist) => {
            const checked = checkedMap[playlist.slug] === true;
            const loading = pendingSlug === playlist.slug;

            return (
              <MenuItem
                key={playlist.slug}
                onClick={() => handleTogglePlaylist(playlist)}
                disabled={loading}
                className={styles["playlist-menu-item"]}
              >
                {loading ? (
                  <CircularProgress size={18} />
                ) : (
                  <Checkbox
                    size="small"
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                    className={styles["playlist-checkbox"]}
                  />
                )}
                <ListItemText
                  primary={playlist.title}
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: "0.9rem",
                  }}
                />
              </MenuItem>
            );
          })}
        </MenuList>

        {infoMessage && (
          <div
            className={`${styles["playlist-info-message"]} ${
              infoKind === "added" || infoKind === "favorite-added"
                ? styles["playlist-info-success"]
                : infoKind === "removed" || infoKind === "favorite-removed"
                  ? styles["playlist-info-warning"]
                  : ""
            }`}
          >
            {infoMessage}
          </div>
        )}
      </Popover>
    </>
  );
}
