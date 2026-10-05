"use client";

import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/src/hooks/useTranslation";
import styles from "./styles.module.css";

export function SearchForm() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/video?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["search-form"]}>
      <div className={styles["search-container"]}>
        <SearchIcon className={styles["search-icon"]} />
        <InputBase
          className={styles["search-input-base"]}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("navbar.searchPlaceholder")}
          inputProps={{ "aria-label": t("navbar.searchPlaceholder") }}
        />
        {query && (
          <IconButton
            size="small"
            onClick={() => setQuery("")}
            className={styles["search-clear-button"]}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
      </div>
    </form>
  );
}
