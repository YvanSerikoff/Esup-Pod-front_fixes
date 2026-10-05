"use client";

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import styles from "./styles.module.css";

export default function PlaylistCardSkeleton() {
  return (
    <Box className={styles.skeletonWrapper}>
      <Box className={styles.skeletonStack}>
        <Box className={styles.skeletonBack1} />
        <Box className={styles.skeletonBack2} />

        <Card elevation={4} className={styles.skeletonFront}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            className={styles.imageSkeleton}
          />
        </Card>
      </Box>

      <CardContent>
        <Box className={styles.skeletonTitleRow}>
          <Skeleton variant="text" animation="wave" width="70%" height={24} />
          <Skeleton
            variant="circular"
            animation="wave"
            width={20}
            height={20}
          />
        </Box>
        <Box className={styles.skeletonMetadataRow}>
          <Skeleton variant="text" animation="wave" width="30%" height={16} />
          <Skeleton variant="text" animation="wave" width="40%" height={16} />
        </Box>
      </CardContent>
    </Box>
  );
}
