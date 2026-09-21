"use client";

import { useRouter } from "next/navigation";
import type { Video } from "@/src/types";
import styles from "./styles.module.css";
import Image from "next/image";
import { useTranslation } from "@/src/hooks/useTranslation";

type FavoritesSidebarProps = {
  videos: Video[];
  currentVideoSlug: string;
};

export default function FavoritesSidebar({
  videos,
  currentVideoSlug,
}: FavoritesSidebarProps) {
  const router = useRouter();
  const { t } = useTranslation();

  if (!videos.length) {
    return null;
  }

  const handleClick = (videoSlug: string) => {
    if (videoSlug === currentVideoSlug) {
      return;
    }
    router.push(`/video/${videoSlug}?favorites=1`);
  };

  return (
    <div className={styles.favoritesSidebar}>
      <header className={styles.favoritesSidebarHeader}>
        <div>
          <p className={styles.favoritesSidebarLabel}>Vidéos favorites</p>
        </div>
      </header>

      <ul className={styles.favoritesSidebarList}>
        {videos.map((video, index) => {
          const isActive = video.slug === currentVideoSlug;

          return (
            <li
              key={video.id ?? video.slug}
              className={`${styles.favoritesSidebarItem} ${
                isActive ? styles.favoritesSidebarItemActive : ""
              }`}
              onClick={() => handleClick(video.slug)}
            >
              <span className={styles.favoritesSidebarIndex}>{index + 1}</span>
              <Image
                src={video.thumbnail_url || "/default_thumbnail.svg"}
                alt={t("a11y.videoThumbnail", { title: video.title })}
                width={64}
                height={36}
                className={styles.favoritesSidebarThumbnail}
              />
              <div className={styles.favoritesSidebarText}>
                <p className={styles.favoritesSidebarVideoTitle}>
                  {video.title}
                </p>
                {isActive && (
                  <p className={styles.favoritesSidebarNowPlaying}>
                    Lecture en cours
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
