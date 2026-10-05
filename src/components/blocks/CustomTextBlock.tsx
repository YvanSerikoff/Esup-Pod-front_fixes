"use client";

import React from "react";
import type { BlockConfig } from "@/src/types";
import styles from "./styles.module.css";

interface CustomTextBlockProps {
  block: BlockConfig;
}

export default function CustomTextBlock({ block }: CustomTextBlockProps) {
  const title = block.display_title;
  const content =
    block.subtitle_or_text || (block.extra_config?.content as string) || "";

  return (
    <section
      className={styles["custom-text-block"]}
      style={{
        backgroundColor: block.background_color || "#ffffff",
        color: block.text_color || "#111111",
      }}
    >
      {title && (
        <h3 className={styles["custom-text-title"]}>
          {title}
        </h3>
      )}
      <div
        className={styles["custom-text-content"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}
