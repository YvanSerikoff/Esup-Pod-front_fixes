"use client";

import React, { useState } from "react";
import { useTranslation } from "@/src/hooks/useTranslation";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanguageIcon from "@mui/icons-material/Language";
import CheckIcon from "@mui/icons-material/Check";
import type { SupportedLocale } from "@/src/locales";
import styles from "./styles.module.css";

interface LanguageSelectorProps {
  variant?: "dropdown" | "compact" | "full";
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const { locale, setLocale, supportedLocales } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (code: SupportedLocale) => {
    setLocale(code);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        size="small"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        aria-label="Changer de langue"
        startIcon={<LanguageIcon className={styles["language-icon"]} />}
        endIcon={
          <ExpandMoreIcon className={styles["language-expand-icon"]} />
        }
        className={`${styles["language-button"]} ${className || ""}`}
      >
        <span>{locale.toUpperCase()}</span>
      </Button>

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 4,
            className: styles["language-menu-paper"],
          },
        }}
      >
        {supportedLocales.map((loc) => {
          const isSelected = loc.code === locale;
          return (
            <MenuItem
              key={loc.code}
              selected={isSelected}
              onClick={() => handleSelect(loc.code as SupportedLocale)}
              className={`${styles["language-menu-item"]} ${
                isSelected ? styles["language-menu-item-selected"] : ""
              }`}
            >
              <span>{loc.label}</span>
              {isSelected && (
                <CheckIcon className={styles["language-selected-icon"]} />
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
