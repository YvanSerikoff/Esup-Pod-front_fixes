"use client";

import { useState, useCallback, useMemo } from "react";
import type { MouseEvent } from "react";
import { Button, Modal, ModalSize } from "@openfun/cunningham-react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import ListItemButton from "@mui/material/ListItemButton";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LockIcon from "@mui/icons-material/Lock";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import type { Video, Type as VideoType, Discipline, Tags } from "@/src/types";
import { useBulkActions } from "@/src/hooks/useBulkActions";
import filterStyles from "@/src/components/video/filters/styles.module.css";
import styles from "./styles.module.css";

export interface BulkActionsBarProps {
  selectedVideos: Video[];
  types: VideoType[];
  disciplines: Discipline[];
  tags: Tags[];
  channels: (number | string)[];
  onApplySuccess: () => void;
  onClearSelection: () => void;
}

export type BulkActionKey =
  | ""
  | "type"
  | "channel"
  | "description"
  | "status"
  | "is_auth_required"
  | "license"
  | "date_evt"
  | "date_delete"
  | "tags"
  | "discipline"
  | "cursus"
  | "allow_downloading"
  | "disable_comment"
  | "delete";

/**
 * Defines a bulk action and its activation conditions.
 *
 * condition: (videos) => true = always available
 * condition: (videos) => false = never available (depending on criteria)
 * conditionLabel: explanatory tooltip shown when the action is disabled
 */
interface ActionOption {
  value: BulkActionKey;
  label: string;
  group: "edit" | "danger";
  /** Returns true if the action applies to the current selection. */
  condition: (videos: Video[]) => boolean;
  /** Message shown when the condition is not met. */
  conditionLabel?: string;
}

const ALL_ENCODED = (videos: Video[]) =>
  videos.length > 0 && videos.every((v) => v.encoding_status === "DO");

const SOME_ENCODING = (videos: Video[]) =>
  videos.some((v) => v.encoding_status === "PE" || v.encoding_status === "PR");

const getActionsOptions = (t: (key: string) => string): ActionOption[] => [
  // ── Metadata (always available) ─────────────────────────
  {
    value: "type",
    label: t("bulk.changeType"),
    group: "edit",
    condition: () => true,
  },
  {
    value: "channel",
    label: t("bulk.changeChannel"),
    group: "edit",
    condition: () => true,
  },
  {
    value: "description",
    label: t("bulk.editDescription"),
    group: "edit",
    condition: () => true,
  },
  {
    value: "license",
    label: t("bulk.changeLicense"),
    group: "edit",
    condition: () => true,
  },
  {
    value: "date_evt",
    label: t("bulk.setEventDate"),
    group: "edit",
    condition: () => true,
  },
  {
    value: "tags",
    label: t("bulk.addReplaceKeywords"),
    group: "edit",
    condition: () => true,
  },
  {
    value: "discipline",
    label: t("bulk.changeDiscipline"),
    group: "edit",
    condition: () => true,
  },
  {
    value: "cursus",
    label: t("bulk.changeCursus"),
    group: "edit",
    condition: () => true,
  },
  // ── Actions requiring completed encoding ────────────────────────
  {
    value: "status",
    label: t("bulk.publishUnpublish"),
    group: "edit",
    condition: ALL_ENCODED,
    conditionLabel: t("bulk.errorPublishNotEncoded"),
  },
  {
    value: "is_auth_required",
    label: t("bulk.restrictAuth"),
    group: "edit",
    condition: ALL_ENCODED,
    conditionLabel: t("bulk.errorRestrictNotEncoded"),
  },
  {
    value: "allow_downloading",
    label: t("bulk.allowDownloading"),
    group: "edit",
    condition: ALL_ENCODED,
    conditionLabel: t("bulk.errorDownloadNotEncoded"),
  },
  {
    value: "disable_comment",
    label: t("bulk.disableComments"),
    group: "edit",
    condition: ALL_ENCODED,
    conditionLabel: t("bulk.errorCommentsNotEncoded"),
  },
  // ── Programmation temporelle (toujours disponible) ──────────────
  {
    value: "date_delete",
    label: t("bulk.scheduleDeletion"),
    group: "edit",
    condition: () => true,
  },
  // ── Zone de danger ──────────────────────────────────────────────
  {
    value: "delete",
    label: t("bulk.deleteSelected"),
    group: "danger",
    condition: () => true,
  },
];

const getLicenseChoices = (t: (key: string) => string) => [
  { value: "NC", label: t("bulk.licenseCopyright") },
  { value: "CC-BY", label: t("bulk.licenseCcBy") },
  { value: "CC-BY-NC", label: t("bulk.licenseCcByNc") },
  { value: "CC-BY-NC-ND", label: t("bulk.licenseCcByNcNd") },
  { value: "CC-BY-NC-SA", label: t("bulk.licenseCcByNcSa") },
  { value: "CC-BY-SA", label: t("bulk.licenseCcBySa") },
  { value: "CC-BY-ND", label: t("bulk.licenseCcByNd") },
  { value: "CC0", label: t("bulk.licenseCc0") },
];

const getCursusChoices = (t: (key: string) => string) => [
  { value: "L1", label: t("cursus.L1") },
  { value: "L2", label: t("cursus.L2") },
  { value: "L3", label: t("cursus.L3") },
  { value: "M1", label: t("cursus.M1") },
  { value: "M2", label: t("cursus.M2") },
  { value: "DOC", label: t("cursus.D") },
  { value: "OTHER", label: t("cursus.0") },
];

interface Toast {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

import { useTranslation } from "@/src/hooks/useTranslation";

export default function BulkActionsBar({
  selectedVideos,
  types,
  disciplines,
  channels,
  onApplySuccess,
  onClearSelection,
}: BulkActionsBarProps) {
  const { t } = useTranslation();
  const [selectedAction, setSelectedAction] = useState<BulkActionKey>("");
  const [fieldValue, setFieldValue] = useState<any>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [toast, setToast] = useState<Toast>({
    open: false,
    message: "",
    severity: "success",
  });

  const { bulkUpdate, bulkDelete, isUpdating, isDeleting } = useBulkActions();
  const isLoading = isUpdating || isDeleting;

  const count = selectedVideos.length;
  const hasSelection = count > 0;

  // Calculate encoding states for the current selection.
  const hasEncodingInProgress = useMemo(
    () => SOME_ENCODING(selectedVideos),
    [selectedVideos],
  );

  // Available / disabled actions for the current selection.
  const resolvedActions = useMemo(
    () =>
      getActionsOptions(t).map((opt) => ({
        ...opt,
        enabled: opt.condition(selectedVideos),
      })),
    [selectedVideos, t],
  );

  const showToast = useCallback(
    (message: string, severity: "success" | "error") => {
      setToast({ open: true, message, severity });
    },
    [],
  );

  const handleDropdownClick = (event: MouseEvent<HTMLElement>) => {
    if (!hasSelection) return;
    setAnchorEl(event.currentTarget);
    setDropdownOpen((prev) => !prev);
  };

  const handleSelectAction = (actionKey: BulkActionKey) => {
    setSelectedAction(actionKey);
    setFieldValue("");
    setDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isLoading) return;
    setIsModalOpen(false);
    setSelectedAction("");
    setFieldValue("");
  };

  const handleSubmit = async () => {
    if (!hasSelection || !selectedAction) return;

    const videoIds = selectedVideos.map((v) => v.id);

    try {
      if (selectedAction === "delete") {
        await bulkDelete(videoIds);
        showToast(t("bulk.deletedSuccessfully", { count }), "success");
      } else {
        const fieldsPayload: Record<string, any> = {};

        switch (selectedAction) {
          case "type":
            fieldsPayload["type_id"] = Number(fieldValue);
            break;
          case "channel":
            fieldsPayload["channel"] = fieldValue ? Number(fieldValue) : null;
            break;
          case "description":
            fieldsPayload["description"] = fieldValue;
            break;
          case "status":
            fieldsPayload["status"] = fieldValue;
            break;
          case "is_auth_required":
            fieldsPayload["is_auth_required"] =
              fieldValue === "true" || fieldValue === true;
            break;
          case "allow_downloading":
            fieldsPayload["allow_downloading"] =
              fieldValue === "true" || fieldValue === true;
            break;
          case "disable_comment":
            fieldsPayload["disable_comment"] =
              fieldValue === "true" || fieldValue === true;
            break;
          case "license":
            fieldsPayload["license"] = fieldValue;
            break;
          case "date_evt":
            fieldsPayload["date_of_event"] = fieldValue || null;
            break;
          case "date_delete":
            fieldsPayload["date_to_delete"] = fieldValue || null;
            break;
          case "tags":
            fieldsPayload["tags"] =
              typeof fieldValue === "string"
                ? fieldValue
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                : fieldValue;
            break;
          case "discipline":
            fieldsPayload["disciplines"] = [Number(fieldValue)];
            break;
          case "cursus":
            fieldsPayload["cursus"] = fieldValue;
            break;
          default:
            fieldsPayload[selectedAction] = fieldValue;
            break;
        }

        await bulkUpdate({ videoIds, fields: fieldsPayload });
        showToast(t("bulk.updatedSuccessfully", { count }), "success");
      }

      setIsModalOpen(false);
      setSelectedAction("");
      setFieldValue("");
      onClearSelection();
      onApplySuccess();
    } catch (err: any) {
      showToast(err?.message ?? t("bulk.actionError"), "error");
    }
  };

  const getActionLabel = (key: BulkActionKey) =>
    getActionsOptions(t).find((opt: ActionOption) => opt.value === key)
      ?.label ?? key;

  // Disable confirmation if a required field is empty,
  // except for actions that do not require a value (delete, channel).
  const NO_VALUE_NEEDED: BulkActionKey[] = ["delete", "channel"];
  const isConfirmDisabled =
    isLoading ||
    (!NO_VALUE_NEEDED.includes(selectedAction) && fieldValue === "");

  return (
    <>
      {/* ── Contextual action bar (shown only when items are selected) ── */}
      {hasSelection && (
        <div className={styles.bulkActionBar}>
          <div className={styles.bulkActionBarContent}>
            {/* Title + selection badge */}
            <div className={styles.bulkActionTitleGroup}>
              <h2 className={styles.bulkActionTitle}>
                {t("bulk.title")}
              </h2>
              {hasSelection ? (
                <div className={styles.bulkSelectionGroup}>
                  <span className={styles.bulkSelectionBadge}>
                    {count} {t("common.videos")}
                  </span>
                  {/* Warning that encoding is in progress */}
                  {hasEncodingInProgress && (
                    <Tooltip
                      title={t("bulk.encodingInProgressTooltip")}
                      placement="top"
                      arrow
                    >
                      <span className={styles.bulkEncodingWarning}>
                        <WarningAmberIcon fontSize="small" />
                        {t("pending.encoding")}
                      </span>
                    </Tooltip>
                  )}
                </div>
              ) : (
                <span className={styles.bulkSelectionPrompt}>
                  <InfoOutlinedIcon fontSize="small" />
                  {t("bulk.checkVideosPrompt")}
                </span>
              )}
            </div>

            {/* Controls */}
            <div className={styles.bulkActionControls}>
              <Box className={filterStyles.filterItem}>
                <ListItemButton
                  onClick={handleDropdownClick}
                  aria-expanded={dropdownOpen}
                  disabled={!hasSelection}
                  className={`${filterStyles.filterButton} ${styles.bulkActionDropdown} ${
                    !hasSelection ? styles.bulkActionDropdownDisabled : ""
                  }`}
                >
                  <Typography variant="body2" fontWeight={500} noWrap>
                    {t("bulk.chooseAction")}
                  </Typography>
                  {dropdownOpen ? (
                    <ExpandLessIcon fontSize="small" />
                  ) : (
                    <ExpandMoreIcon fontSize="small" />
                  )}
                </ListItemButton>

                <Popper
                  open={dropdownOpen}
                  anchorEl={anchorEl}
                  placement="bottom-start"
                  transition
                  className={styles.bulkActionsPopper}
                  ref={(element: HTMLElement | null) =>
                    element?.style.setProperty(
                      "--bulk-action-width",
                      `${Math.max(anchorEl?.clientWidth || 0, 320)}px`,
                    )
                  }
                  modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                      <Paper elevation={8} className={filterStyles.filterMenu}>
                        <ClickAwayListener
                          onClickAway={() => setDropdownOpen(false)}
                        >
                          <Box className={styles.bulkActionsMenuContent}>
                            {/* Edit group */}
                            <Typography
                              variant="caption"
                              className={styles.bulkMenuGroupHeading}
                            >
                              {t("bulk.editGroup")}
                            </Typography>

                            {resolvedActions
                              .filter((o) => o.group === "edit")
                              .map((opt) => (
                                <Tooltip
                                  key={opt.value}
                                  title={
                                    !opt.enabled
                                      ? (opt.conditionLabel ??
                                        t("bulk.unavailableForSelection"))
                                      : ""
                                  }
                                  placement="right"
                                  arrow
                                  disableHoverListener={opt.enabled}
                                >
                                  {/* A span is required for the Tooltip when MenuItem is disabled. */}
                                  <span className={styles.bulkMenuItemTooltipTarget}>
                                    <MenuItem
                                      disabled={!opt.enabled}
                                      onClick={() =>
                                        opt.enabled &&
                                        handleSelectAction(opt.value)
                                      }
                                      className={`${styles.bulkMenuItem} ${
                                        opt.enabled
                                          ? styles.bulkMenuItemEnabled
                                          : styles.bulkMenuItemDisabled
                                      }`}
                                    >
                                      {!opt.enabled && (
                                        <LockIcon className={styles.bulkMenuLockIcon} />
                                      )}
                                      {opt.label}
                                    </MenuItem>
                                  </span>
                                </Tooltip>
                              ))}

                            <Divider
                              className={styles.bulkMenuDivider}
                            />

                            {/* Groupe danger */}
                            <Typography
                              variant="caption"
                              className={`${styles.bulkMenuGroupHeading} ${styles.bulkMenuDangerHeading}`}
                            >
                              {t("bulk.dangerZone")}
                            </Typography>
                            {resolvedActions
                              .filter((o) => o.group === "danger")
                              .map((opt) => (
                                <MenuItem
                                  key={opt.value}
                                  onClick={() => handleSelectAction(opt.value)}
                                  className={`${styles.bulkMenuItem} ${styles.bulkMenuDangerItem}`}
                                >
                                  {opt.label}
                                </MenuItem>
                              ))}
                          </Box>
                        </ClickAwayListener>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </Box>

              {hasSelection && (
                <Button
                  type="button"
                  variant="tertiary"
                  color="neutral"
                  onClick={onClearSelection}
                >
                  {t("bulk.deselectAll")}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Modal ─────────────────────────────────────────────────── */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          selectedAction === "delete"
            ? t("bulk.confirmDelete")
            : `${t("bulk.modalTitle", { action: getActionLabel(selectedAction) })}`
        }
        size={ModalSize.MEDIUM}
      >
        <div className={styles.bulkModalContent}>
          {/* Deletion warning */}
          {selectedAction === "delete" && (
            <Alert severity="warning" icon={<WarningAmberIcon />}>
              {t.rich("bulk.deleteVideosWarning", {
                count,
                strong: (chunks) => <strong>{chunks}</strong>,
                encoding: (chunks) =>
                  hasEncodingInProgress ? (
                    <div className={styles.bulkDeleteEncodingNote}>{chunks}</div>
                  ) : null,
              })}
            </Alert>
          )}

          {/* Formulaire dynamique */}
          {selectedAction !== "delete" && selectedAction !== "" && (
            <div>
              <label className={styles.bulkFieldLabel}>
                {t.rich("bulk.newValueFor", {
                  label: () => <em>{getActionLabel(selectedAction)}</em>,
                })}
              </label>

              {selectedAction === "type" && (
                <select
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  className={styles.bulkFormControl}
                >
                  <option value="" disabled>
                    {t("bulk.chooseType")}
                  </option>
                  {types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
              )}

              {selectedAction === "channel" && (
                <select
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  className={styles.bulkFormControl}
                >
                  <option value="">{t("bulk.noChannel")}</option>
                  {channels.map((ch) => (
                    <option key={ch} value={ch}>
                      {t("common.channel")} #{ch}
                    </option>
                  ))}
                </select>
              )}

              {selectedAction === "description" && (
                <textarea
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  rows={4}
                  placeholder="Nouvelle description…"
                  className={`${styles.bulkFormControl} ${styles.bulkDescriptionInput}`}
                />
              )}

              {selectedAction === "status" && (
                <select
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  className={styles.bulkFormControl}
                >
                  <option value="" disabled>
                    {t("bulk.chooseStatus")}
                  </option>
                  <option value="PU">{t("bulk.optionPublic")}</option>
                  <option value="DR">{t("bulk.optionPrivate")}</option>
                  <option value="RE">{t("bulk.optionRestricted")}</option>
                </select>
              )}

              {selectedAction === "is_auth_required" && (
                <select
                  value={String(fieldValue)}
                  onChange={(e) => setFieldValue(e.target.value)}
                  className={styles.bulkFormControl}
                >
                  <option value="" disabled>
                    {t("bulk.choose")}
                  </option>
                  <option value="true">{t("bulk.optionAuthYes")}</option>
                  <option value="false">{t("bulk.optionAuthNo")}</option>
                </select>
              )}

              {selectedAction === "allow_downloading" && (
                <select
                  value={String(fieldValue)}
                  onChange={(e) => setFieldValue(e.target.value)}
                  className={styles.bulkFormControl}
                >
                  <option value="" disabled>
                    {t("bulk.choose")}
                  </option>
                  <option value="true">{t("bulk.optionDownloadYes")}</option>
                  <option value="false">{t("bulk.optionDownloadNo")}</option>
                </select>
              )}

              {selectedAction === "disable_comment" && (
                <select
                  value={String(fieldValue)}
                  onChange={(e) => setFieldValue(e.target.value)}
                  className={styles.bulkFormControl}
                >
                  <option value="" disabled>
                    -- Choisir --
                  </option>
                  <option value="false">{t("bulk.optionCommentsOn")}</option>
                  <option value="true">{t("bulk.optionCommentsOff")}</option>
                </select>
              )}

              {selectedAction === "license" && (
                <select
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  className={styles.bulkFormControl}
                >
                  <option value="" disabled>
                    {t("bulk.chooseLicense")}
                  </option>
                  {getLicenseChoices(t).map((lic) => (
                    <option key={lic.value} value={lic.value}>
                      {lic.label}
                    </option>
                  ))}
                </select>
              )}

              {selectedAction === "date_evt" && (
                <input
                  type="date"
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  className={styles.bulkFormControl}
                />
              )}

              {selectedAction === "date_delete" && (
                <>
                  <Alert severity="info" className={styles.bulkScheduleNotice}>
                    {t("bulk.scheduleDeletionNotice")}
                  </Alert>
                  <input
                    type="date"
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                    className={styles.bulkFormControl}
                  />
                </>
              )}

              {selectedAction === "tags" && (
                <>
                  <input
                    type="text"
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                    placeholder={t("bulk.examplePlaceholder")}
                    className={styles.bulkFormControl}
                  />
                  <p className={styles.bulkKeywordsHelper}>
                    {t("bulk.keywordsHelper")}
                  </p>
                </>
              )}

              {selectedAction === "discipline" && (
                <select
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  className={styles.bulkFormControl}
                >
                  <option value="" disabled>
                    {t("bulk.chooseDiscipline")}
                  </option>
                  {disciplines.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title}
                    </option>
                  ))}
                </select>
              )}

              {selectedAction === "cursus" && (
                <select
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  className={styles.bulkFormControl}
                >
                  <option value="" disabled>
                    {t("bulk.chooseLevel")}
                  </option>
                  {getCursusChoices(t).map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {/* Affected videos with encoding badge */}
          <div>
            <p className={styles.bulkAffectedTitle}>
              {t("bulk.affectedVideos", { count })}
            </p>
            <div className={styles.bulkAffectedVideos}>
              {selectedVideos.map((video) => {
                const isEncoding =
                  video.encoding_status === "PE" ||
                  video.encoding_status === "PR";
                return (
                  <div key={video.id} className={styles.bulkAffectedVideo}>
                    <span className={styles.bulkVideoId}>
                      #{video.id}
                    </span>
                    <span className={styles.bulkVideoTitle}>
                      {video.title}
                    </span>
                    {isEncoding && (
                      <Tooltip title="Encodage en cours" placement="left">
                        <span className={styles.bulkEncodingBadge}>
                          {t("pending.encoding")}
                        </span>
                      </Tooltip>
                    )}
                    {video.encoding_status === "ER" && (
                      <Tooltip
                        title={t("table.encodingError")}
                        placement="left"
                      >
                        <span className={styles.bulkEncodingErrorBadge}>
                          {t("bulk.errorBadge")}
                        </span>
                      </Tooltip>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal buttons */}
          <div className={styles.bulkModalActions}>
            <Button
              type="button"
              variant="tertiary"
              color="neutral"
              onClick={handleCloseModal}
              disabled={isLoading}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="button"
              variant="primary"
              color={selectedAction === "delete" ? "error" : "brand"}
              onClick={handleSubmit}
              disabled={isConfirmDisabled}
            >
              {isLoading ? (
                <span className={styles.bulkProcessing}>
                  <CircularProgress size={16} color="inherit" />
                  {t("pending.processing")}
                </span>
              ) : selectedAction === "delete" ? (
                `${t("bulk.deletePermanently")}`
              ) : (
                `${t("bulk.confirmEdit")}`
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* ── Toast global ──────────────────────────────────────────── */}
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.severity}
          variant="filled"
          icon={
            toast.severity === "success" ? (
              <CheckCircleOutlineIcon />
            ) : (
              <ErrorOutlineIcon />
            )
          }
          className={styles.bulkToast}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}
