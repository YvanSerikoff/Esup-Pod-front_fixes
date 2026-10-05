"use client";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { Channel, Theme } from "@/src/types";
import { truncateVideoTitle } from "@/src/constants/string";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import StyleIcon from "@mui/icons-material/Style";
import { useTranslation } from "@/src/hooks/useTranslation";
import styles from "./styles.module.css";

export type CollectionCardType = "channel" | "theme";

type CollectionCardProps =
  | { type: "channel"; channel: Channel }
  | { type: "theme"; theme: Theme; themeHref?: string };

export default function CollectionCard(props: CollectionCardProps) {
  const { t } = useTranslation();
  if (props.type === "channel") {
    const { channel } = props;
    const channelVideosCount =
      (channel as Channel & { videos_count?: number }).videos_count ?? 0;
    const channelThemesCount =
      (channel as Channel & { themes_count?: number }).themes_count ?? 0;
    const videoLabel =
      channelVideosCount > 1
        ? `${t("common.videos").toLowerCase()}`
        : `${t("common.video").toLowerCase()}`;
    const themeLabel =
      channelThemesCount > 1
        ? `${t("common.subtopics").toLowerCase()}`
        : `${t("common.subtopic").toLowerCase()}`;

    return (
      <Card
        elevation={0}
        className={styles.collectionCard}
      >
        <CardActionArea
          component={Link}
          href={`/channel/${channel.slug}`}
          className={styles.collectionCardActionArea}
          disableRipple
        >
          <CardMedia
            component="img"
            image={
              channel.logo || channel.banner || "/default_channel_logo.png"
            }
            alt={t("a11y.channelLogo", { title: channel.title })}
            className={styles.collectionCardImage}
          />
          <Box className={styles.collectionCardContent}>
            <Typography
              variant="subtitle1"
              className={styles.collectionCardTitle}
            >
              {truncateVideoTitle(channel.title, 40)}
            </Typography>

            <Box className={styles.statistics}>
              <Box className={styles.statistic}>
                <VideoLibraryIcon
                  fontSize="small"
                  className={styles.statisticIcon}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={styles.statisticText}
                >
                  {channelVideosCount} {videoLabel}
                </Typography>
              </Box>
              <Box className={styles.statistic}>
                <StyleIcon
                  fontSize="small"
                  className={styles.statisticIcon}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={styles.statisticText}
                >
                  {channelThemesCount} {themeLabel}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    );
  }

  const { theme, themeHref } = props;
  const themeItemsCount = theme.items?.length ?? 0;
  const themeChildrenCount = theme.children?.length ?? 0;
  const themeVideoLabel =
    themeItemsCount > 1
      ? `${t("common.videos").toLowerCase()}`
      : `${t("common.video").toLowerCase()}`;
  const themeChildrenLabel =
    themeChildrenCount > 1
      ? `${t("common.subtopics").toLowerCase()}`
      : `${t("common.subtopic").toLowerCase()}`;

  return (
    <Card
      elevation={0}
      className={styles.collectionCard}
    >
      <CardActionArea
        component={Link}
        href={themeHref ?? `/themes/${theme.slug}`}
        className={styles.collectionCardActionArea}
        disableRipple
      >
        <CardMedia
          component="img"
          image={theme.banner || "/default_theme_banner.png"}
          alt={t("a11y.themeBanner", { title: theme.title })}
          className={styles.collectionCardImage}
        />
        <Box className={styles.collectionCardContent}>
          <Typography
            variant="subtitle1"
            className={styles.collectionCardTitle}
          >
            {truncateVideoTitle(theme.title, 40)}
          </Typography>

          <Box className={styles.statistics}>
            <Box className={styles.statistic}>
              <VideoLibraryIcon
                fontSize="small"
                className={styles.statisticIcon}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.statisticText}
              >
                {themeItemsCount} {themeVideoLabel}
              </Typography>
            </Box>
            <Box className={styles.statistic}>
              <StyleIcon
                fontSize="small"
                className={styles.statisticIcon}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.statisticText}
              >
                {themeChildrenCount} {themeChildrenLabel}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
