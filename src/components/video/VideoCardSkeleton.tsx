"use client";

import React from "react";
import { Card, CardContent, Skeleton, Box } from "@mui/material";
import styles from "./VideoCard.module.css";

export const VideoCardSkeleton = () => {
  return (
    <Card className={styles.videoSkeletonCard}>
      {/* Thumbnail area (16:9 ratio) */}
      <Box className={styles.videoSkeletonThumbnail}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          className={styles.videoSkeletonThumbnailContent}
        />
      </Box>

      {/* Text content */}
      <CardContent className={styles.videoSkeletonContent}>
        <Skeleton variant="text" animation="wave" width="90%" height={28} />
        <Skeleton variant="text" animation="wave" width="60%" height={20} />

        {/* Metadata (avatar + name / date) */}
        <Box className={styles.videoSkeletonMetadata}>
          <Skeleton
            variant="circular"
            animation="wave"
            width={32}
            height={32}
          />
          <Box className={styles.videoSkeletonMetadataText}>
            <Skeleton variant="text" animation="wave" width="50%" height={16} />
            <Skeleton variant="text" animation="wave" width="30%" height={14} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
