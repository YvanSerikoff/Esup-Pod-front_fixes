"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Fade from "@mui/material/Fade";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputAdornment from "@mui/material/InputAdornment";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@openfun/cunningham-react";
import styles from "./styles.module.css";
import { useTranslation } from "@/src/hooks/useTranslation";

export type SelectOption = {
  label: string;
  value: string;
};

export type FilterDropdownProps = {
  title: string;
  options: SelectOption[];
  selectedValues: string[];
  onChange: (newValues: string[]) => void;
  multiple?: boolean;
  onSearchChange?: (search: string) => void;
  searchValue?: string;
  isAsync?: boolean;
  loading?: boolean;
};

export default function FilterDropdown({
  title,
  options,
  selectedValues,
  onChange,
  multiple = true,
  onSearchChange,
  searchValue,
  isAsync = false,
  loading = false,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [localSearchText, setLocalSearchText] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const { t } = useTranslation();

  // Local selected state for deferred multi-select updates (Vinted-style commit button)
  const [localSelectedValues, setLocalSelectedValues] =
    useState<string[]>(selectedValues);

  const searchText = onSearchChange ? (searchValue ?? "") : localSearchText;

  const matchingOptions = onSearchChange
    ? options
    : options.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase()),
      );

  const matchedSelected = matchingOptions.filter((o) =>
    multiple
      ? localSelectedValues.includes(o.value)
      : selectedValues.includes(o.value),
  );

  const matchedUnselected = matchingOptions.filter((o) =>
    multiple
      ? !localSelectedValues.includes(o.value)
      : !selectedValues.includes(o.value),
  );

  // Take the first 50 unselected to avoid performance issues (10k+ tags)
  const displayUnselected = isAsync
    ? matchedUnselected
    : matchedUnselected.slice(0, 50);

  const filteredOptions = [...matchedSelected, ...displayUnselected];

  const selectedCount = selectedValues.length;
  const selectedLabel =
    !multiple && selectedCount === 1
      ? options.find((option) => option.value === selectedValues[0])?.label ||
        selectedValues[0]
      : null;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    if (!open) {
      setLocalSelectedValues(selectedValues);
      setLocalSearchText("");
    }
    setOpen((currentOpen) => !currentOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (optionValue: string) => {
    if (!multiple) {
      onChange(selectedValues.includes(optionValue) ? [] : [optionValue]);
      setOpen(false);
      return;
    }

    if (localSelectedValues.includes(optionValue)) {
      setLocalSelectedValues(
        localSelectedValues.filter((value) => value !== optionValue),
      );
    } else {
      setLocalSelectedValues([...localSelectedValues, optionValue]);
    }
  };

  return (
    <Box className={styles["filter-dropdown"]}>
      <ListItemButton
        onClick={handleClick}
        className={`${styles["filter-button"]} ${selectedCount > 0 ? styles["active"] : ""}`}
        aria-expanded={open}
      >
        <Box
          className={styles["filter-label"]}
        >
          <Typography
            variant="body2"
            fontWeight={selectedCount > 0 ? 600 : 500}
            noWrap
            className={styles["filter-label-text"]}
          >
            {!multiple && selectedCount === 1 && selectedLabel
              ? `${title} : ${selectedLabel}`
              : title}
          </Typography>

          {multiple && selectedCount > 0 && (
            <Box
              className={styles["filter-count"]}
            >
              {selectedCount}
            </Box>
          )}
        </Box>

        {open ? (
          <ExpandLessIcon
            fontSize="small"
            className={`${styles["filter-chevron"]} ${selectedCount > 0 ? styles["filter-chevron-active"] : ""}`}
          />
        ) : (
          <ExpandMoreIcon
            fontSize="small"
            className={`${styles["filter-chevron"]} ${selectedCount > 0 ? styles["filter-chevron-active"] : ""}`}
          />
        )}
      </ListItemButton>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        className={`${styles["filter-popper"]} ${isMobile && anchorEl ? styles["filter-popper-mobile"] : ""}`}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
          {
            name: "preventOverflow",
            options: {
              padding: 16,
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Paper elevation={8} className={styles["filter-menu"]}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  {(options.length > 0 || onSearchChange || isAsync) && (
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder={t("navbar.searchPlaceholder")}
                      size="small"
                      value={searchText}
                      onChange={(event) => {
                        const val = event.target.value;
                        if (onSearchChange) onSearchChange(val);
                        else setLocalSearchText(val);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                        endAdornment: loading ? (
                          <InputAdornment position="end">
                            <CircularProgress color="inherit" size={20} />
                          </InputAdornment>
                        ) : null,
                      }}
                      className={styles["filter-search"]}
                    />
                  )}

                  <FormGroup className={styles["filter-options"]}>
                    {filteredOptions.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        control={
                          multiple ? (
                            <Checkbox
                              checked={localSelectedValues.includes(
                                option.value,
                              )}
                              onChange={() => handleToggle(option.value)}
                              size="small"
                            />
                          ) : (
                            <Checkbox
                              checkedIcon={<RadioButtonCheckedIcon />}
                              icon={<RadioButtonUncheckedIcon />}
                              checked={selectedValues.includes(option.value)}
                              onChange={() => handleToggle(option.value)}
                              size="small"
                            />
                          )
                        }
                        label={option.label}
                        className={styles["filter-option"]}
                      />
                    ))}

                    {!loading && filteredOptions.length === 0 && (
                      <Typography
                        color="text.secondary"
                        variant="body2"
                        className={styles["filter-empty"]}
                      >
                        {t("common.noResults")}
                      </Typography>
                    )}
                  </FormGroup>

                  {multiple && (
                    <Box
                      className={styles["filter-actions"]}
                    >
                      <Button
                        onClick={() => {
                          setLocalSelectedValues([]);
                        }}
                        variant="tertiary"
                        size="small"
                        disabled={localSelectedValues.length === 0}
                      >
                        {t("filters.clearFilters")}
                      </Button>
                      <Button
                        onClick={() => {
                          onChange(localSelectedValues);
                          setOpen(false);
                        }}
                        variant="primary"
                        size="small"
                      >
                        {t("filters.showResults")}
                      </Button>
                    </Box>
                  )}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
