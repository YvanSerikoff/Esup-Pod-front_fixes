"use client";

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import styles from "./styles.module.css";

export default function CollectionCardSkeleton() {
  return (
    <Box className={styles.collectionSkeletonWrapper}>
      <Card className={styles.collectionSkeletonCard}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          className={styles.collectionSkeletonImage}
        />
      </Card>
      <Box className={styles.collectionSkeletonContent}>
        <Skeleton
          variant="text"
          animation="wave"
          width="80%"
          height={24}
          className={styles.collectionSkeletonTitle}
        />
        <Box className={styles.collectionSkeletonMetadata}>
          <Box className={styles.collectionSkeletonMetadataItem}>
            <Skeleton
              variant="circular"
              animation="wave"
              width={16}
              height={16}
            />
            <Skeleton variant="text" animation="wave" width="80%" height={16} />
          </Box>
          <Box className={styles.collectionSkeletonMetadataItem}>
            <Skeleton
              variant="circular"
              animation="wave"
              width={16}
              height={16}
            />
            <Skeleton variant="text" animation="wave" width="80%" height={16} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
