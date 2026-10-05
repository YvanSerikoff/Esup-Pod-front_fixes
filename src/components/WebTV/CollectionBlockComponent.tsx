"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getRoutes } from "@/src/api/routes";
import { requestJson } from "@/src/utils/requestJson";
import type { BlockConfig, Channel } from "@/src/types";
import Image from "next/image";
import styles from "./WebTVLayout.module.css";

const CARD_COLOR_COUNT = 7;

interface CollectionItem {
  id: number | string;
  slug?: string;
  title: string;
  videos_count?: number;
  banner?: string | null;
  logo?: string | null;
}

interface CollectionBlockProps {
  block: BlockConfig;
}

import { useTranslation } from "@/src/hooks/useTranslation";

export default function CollectionBlockComponent({
  block,
}: CollectionBlockProps) {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const collectionType = block.extra_config?.collection_type || "channel";
        const limit = block.item_limit || 5;
        let endpoint = getRoutes().channel.list;

        if (collectionType === "theme") {
          endpoint = getRoutes().theme.list;
        } else if (collectionType === "playlist") {
          endpoint = getRoutes().playlist.list;
        }

        const response = await requestJson<Channel[] | { results: Channel[] }>(
          endpoint,
        );

        const list = Array.isArray(response)
          ? response
          : response?.results || [];

        // Apply custom IDs filtering if provided in extra_config
        const customIds = block.extra_config?.collection_ids;
        let filtered = list;
        if (customIds && Array.isArray(customIds) && customIds.length > 0) {
          filtered = customIds
            .map((id) => list.find((c) => c.id === id || c.slug === id))
            .filter(Boolean) as Channel[];
        }

        // Map items with color accents
        const mappedItems: CollectionItem[] = filtered
          .slice(0, limit)
          .map((c) => ({
            id: c.id,
            slug: c.slug,
            title: c.title,
            videos_count: c.videos_count,
            banner: c.banner || c.logo,
          }));

        setItems(mappedItems);
      } catch (err) {
        console.error("Error loading collection block:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [block]);

  const displayTitle =
    block.display_title || block.subtitle_or_text || t("common.collections");

  return (
    <section
      className={`${styles["block-wrapper"]} ${styles["collection-block"]}`}
    >
      <div className={styles["section-badge-header"]}>{displayTitle}</div>

      {loading ? (
        <div className={styles["block-loading"]}>{t("common.loading")}</div>
      ) : items.length > 0 ? (
        <div className={styles["cards-grid"]}>
          {items.map((item, index) => (
            <Link
              key={item.id}
              href={`/channel/${item.slug || item.id}`}
              className={styles["collection-card"]}
            >
              <div
                className={`${styles["collection-card-banner"]} ${
                  styles[`collection-banner-color-${index % CARD_COLOR_COUNT}`]
                }`}
              >
                {item.banner && (
                  <Image
                    unoptimized
                    fill
                    src={item.banner}
                    alt=""
                    aria-hidden="true"
                    className={styles["collection-banner-image"]}
                  />
                )}
              </div>
              <div className={styles["card-body"]}>
                <h4 className={styles["card-title"]}>{item.title}</h4>
                {item.videos_count !== undefined && (
                  <span className={styles["card-meta"]}>
                    {item.videos_count}{" "}
                    {item.videos_count > 1
                      ? t("common.videos")
                      : t("common.video")}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles["block-empty"]}>{t("webtv.noContent")}</div>
      )}
    </section>
  );
}
