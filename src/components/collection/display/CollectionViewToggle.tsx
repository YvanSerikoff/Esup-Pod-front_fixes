"use client";

import { Button } from "@openfun/cunningham-react";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import type { CollectionViewToggleProps } from "./types";
import styles from "./styles.module.css";

export default function CollectionViewToggle({
  view,
  onChange,
}: CollectionViewToggleProps) {
  return (
    <div className={styles["toggle-wrapper"]}>
      <span className={styles["toggle-label"]}>Affichage : </span>

      <div
        className={styles["toggle-group"]}
        role="tablist"
        aria-label="Mode d'affichage des collections"
      >
        <Button
          size="small"
          type="button"
          className={
            view === "cards" ? styles["toggle-button-active"] : styles["toggle-button"]
          }
          onClick={() => onChange("cards")}
          aria-pressed={view === "cards"}
        >
          <span className={styles["toggle-button-content"]}>
            <GridViewIcon fontSize="small" />
            <span className={styles["toggle-text"]}>Cartes</span>
          </span>
        </Button>

        <Button
          size="small"
          type="button"
          className={
            view === "grid" ? styles["toggle-button-active"] : styles["toggle-button"]
          }
          onClick={() => onChange("grid")}
          aria-pressed={view === "grid"}
        >
          <span className={styles["toggle-button-content"]}>
            <TableRowsIcon fontSize="small" />
            <span className={styles["toggle-text"]}>Tableau</span>
          </span>
        </Button>
      </div>
    </div>
  );
}
