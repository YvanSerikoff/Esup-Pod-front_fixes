"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Fade from "@mui/material/Fade";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@openfun/cunningham-react";
import styles from "./styles.module.css";
import { useTranslation } from "@/src/hooks/useTranslation";

type DateFilterDropdownProps = {
  createdAtGte: string;
  createdAtLte: string;
  onChange: (gte: string, lte: string) => void;
};

export default function DateFilterDropdown({
  createdAtGte,
  createdAtLte,
  onChange,
}: DateFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [localGte, setLocalGte] = useState(createdAtGte);
  const [localLte, setLocalLte] = useState(createdAtLte);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const isActive = Boolean(createdAtGte || createdAtLte);

  const { t } = useTranslation();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    if (!open) {
      setLocalGte(createdAtGte);
      setLocalLte(createdAtLte);
    }
    setOpen((currentOpen) => !currentOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    onChange(localGte, localLte);
    setOpen(false);
  };

  const handleClear = () => {
    setLocalGte("");
    setLocalLte("");
    onChange("", "");
    setOpen(false);
  };

  return (
    <Box className={styles["filter-item"]}>
      <ListItemButton
        onClick={handleClick}
        className={`${styles["filter-button"]} ${isActive ? styles.active : ""}`}
        aria-expanded={open}
      >
        <Typography
          variant="body2"
          fontWeight={isActive ? 600 : 500}
          noWrap
          className={isActive ? styles.activeFilterText : ""}
        >
          {isActive
            ? t("filters.activeCreationDate")
            : t("filters.creationDate")}
        </Typography>
        {open ? (
          <ExpandLessIcon
            fontSize="small"
            className={`${styles.filterChevron} ${isActive ? styles.filterChevronActive : ""}`}
          />
        ) : (
          <ExpandMoreIcon
            fontSize="small"
            className={`${styles.filterChevron} ${isActive ? styles.filterChevronActive : ""}`}
          />
        )}
      </ListItemButton>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        className={`${styles.filterPopper} ${isMobile ? styles.filterPopperMobile : ""}`}
        modifiers={[
          { name: "offset", options: { offset: [0, 8] } },
          { name: "preventOverflow", options: { padding: 16 } },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Paper elevation={8} className={styles["filter-menu"]}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <Typography variant="subtitle2" className={styles.dateTitle}>
                    {t("filters.selectPeriod")}
                  </Typography>
                  <Box className={styles.dateFields}>
                    <TextField
                      label={t("filters.createdAfter")}
                      type="datetime-local"
                      size="small"
                      fullWidth
                      value={localGte}
                      onChange={(e) => setLocalGte(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label={t("filters.createdBefore")}
                      type="datetime-local"
                      size="small"
                      fullWidth
                      value={localLte}
                      onChange={(e) => setLocalLte(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>

                  <Box className={styles.dateActions}>
                    <Button
                      onClick={handleClear}
                      variant="tertiary"
                      size="small"
                      disabled={!localGte && !localLte}
                    >
                      {t("filters.clearFilters")}
                    </Button>
                    <Button
                      onClick={handleApply}
                      variant="primary"
                      size="small"
                    >
                      {t("filters.showResults")}
                    </Button>
                  </Box>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
