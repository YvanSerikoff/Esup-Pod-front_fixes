import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import type { Playlist } from "@/src/types";
import { timeAgo } from "@/src/constants/date";
import { truncateVideoTitle } from "@/src/constants/string";

import PlaylistActionMenu from "./PlaylistActionMenu";
import { useTranslation } from "@/src/hooks/useTranslation";
import styles from "./styles.module.css";

type PlaylistCardProps = {
  playlist: Playlist;
  href?: string;
  isOwner?: boolean;
};

export default function PlaylistCard({
  playlist,
  href,
  isOwner,
}: PlaylistCardProps) {
  const { t, locale } = useTranslation();
  const playlistHref = href ?? `/playlist/${playlist.slug}`;
  const videosCount = playlist.items?.length ?? 0;
  const playlistThumbnail =
    playlist.items?.[0]?.video?.thumbnail_url ?? "/default_playlist_logo.png";
  return (
    <Card
      elevation={0}
      className={styles.playlistCard}
    >
      <CardActionArea
        component={Link}
        href={playlistHref}
        className={styles.playlistCardActionArea}
        disableRipple
      >
        <Box
          className={styles.playlistStack}
        >
          <Box
            className={styles.playlistBack1}
          />

          {/* Intermediate layer */}
          <Box
            className={styles.playlistBack2}
          />

          {/* Thumbnail */}
          <Card
            className={styles.playlistFront}
            elevation={0}
          >
            <CardMedia
              component="img"
              image={playlistThumbnail}
              alt={t("a11y.playlistThumbnail", { title: playlist.title })}
              className={styles.playlistImage}
            />
          </Card>
        </Box>

        <CardContent className={styles.playlistCardContent}>
          <Box className={styles.playlistTitleRow}>
            <Typography
              gutterBottom
              variant="h5"
              className={styles.playlistTitle}
            >
              {truncateVideoTitle(playlist.title, 30)}
            </Typography>
            <Box className={styles.titleActions}>
              {playlist.is_protected && (
                <Tooltip title={t("playlists.passwordProtected")}>
                  <span className="material-icons">key</span>
                </Tooltip>
              )}

              {!playlist.is_public && (
                <Tooltip title={t("playlists.private")}>
                  <span className="material-icons">visibility_off</span>
                </Tooltip>
              )}
              {isOwner && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className={styles.actionMenu}
                >
                  <PlaylistActionMenu slug={playlist.slug} />
                </div>
              )}
            </Box>
          </Box>
          <div>
            <Box className={styles.playlistMetadataRow}>
              <Box className={styles.metadataItem}>
                <VideoLibraryIcon
                  fontSize="small"
                  className={styles.metadataIcon}
                />
                <Typography
                  className={styles.metadataText}
                >
                  {t("common.pluralVideos", { count: videosCount })}
                </Typography>
              </Box>
              <Typography
                className={styles.metadataText}
              >
                {timeAgo(playlist.created_at, locale)}
              </Typography>
            </Box>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
