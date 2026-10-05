"use client";

import React, { useState, useMemo } from "react";
import {
  useContributions,
  useContributorsSearch,
  Contributor,
} from "@/src/hooks/useContributors";
import { useAppConfig } from "@/src/hooks/useAppConfig";
import { Alert, Button, VariantType } from "@openfun/cunningham-react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import CircularProgress from "@mui/material/CircularProgress";
import editStyles from "./edit/styles.module.css";
import videoStyles from "./VideoCard.module.css";
import { useTranslation } from "@/src/hooks/useTranslation";

// Custom debounce
function debounce<T extends (...args: never[]) => void>(
  func: T,
  timeout = 300,
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export default function VideoContributorsForm({
  videoId,
}: {
  videoId: number;
}) {
  const {
    contributions,
    isLoading: contributionsLoading,
    addContribution,
    removeContribution,
  } = useContributions(videoId);
  const { config } = useAppConfig();
  const { t } = useTranslation();

  const roleChoices = (config as any)?.completion?.role_choices || [
    ["actor", t("contributors.roles.actor")],
    ["author", t("contributors.roles.author")],
    ["consultant", t("contributors.roles.consultant")],
    ["contributor", t("contributors.roles.contributor")],
    ["director", t("contributors.roles.director")],
    ["speaker", t("contributors.roles.speaker")],
    ["technician", t("contributors.roles.technician")],
    ["voice-over", t("contributors.roles.voiceOver")],
  ];

  const [searchInputValue, setSearchInputValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data: searchResults, isLoading: searchLoading } =
    useContributorsSearch(debouncedSearch);

  const [selectedContributor, setSelectedContributor] =
    useState<Contributor | null>(null);
  const [selectedRole, setSelectedRole] = useState("author");
  const [jobTitle, setJobTitle] = useState("");

  const [error, setError] = useState<string | null>(null);

  const debouncedSetSearch = useMemo(
    () => debounce((v: string) => setDebouncedSearch(v), 400),
    [],
  );

  const handleAdd = async () => {
    if (!selectedContributor) return;
    setError(null);
    try {
      await addContribution.mutateAsync({
        video: videoId,
        contributor_id: selectedContributor.id,
        role: selectedRole,
        job_title: selectedRole === "speaker" ? jobTitle : undefined,
      });
      setSelectedContributor(null);
      setSearchInputValue("");
      setJobTitle("");
    } catch (err: any) {
      setError(err.message || t("contributors.addError"));
    }
  };

  const getRoleLabel = (roleId: string) => {
    const choice = roleChoices.find((c: any) => c[0] === roleId);
    return choice ? choice[1] : roleId;
  };

  return (
    <div className={editStyles["element-card"]}>
      <div className={editStyles["element-card_info"]}>
        <span className={editStyles["element-card_title"]}>
          {t("common.contributors")}
        </span>
        <span className={editStyles["element-card_desc"]}>
          {t("common.addContributorsDesc")}
        </span>
      </div>
      <div className={videoStyles.contributorsForm}>
        {error && (
          <Alert
            type={VariantType.ERROR}
            canClose
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <div className={videoStyles.contributorsFormFields}>
          <div className={videoStyles.contributorsFormRow}>
            <Autocomplete
              className={videoStyles.contributorsAutocomplete}
              options={searchResults || []}
              getOptionLabel={(opt) => `${opt.first_name} ${opt.last_name}`}
              isOptionEqualToValue={(opt, val) => opt.id === val.id}
              value={selectedContributor}
              onChange={(e, val) => setSelectedContributor(val)}
              inputValue={searchInputValue}
              onInputChange={(e, val) => {
                setSearchInputValue(val);
                debouncedSetSearch(val);
              }}
              loading={searchLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("contributors.searchLabel")}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {searchLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <TextField
              select
              label={t("contributors.roleLabel")}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              size="small"
              className={videoStyles.contributorsRole}
            >
              {roleChoices.map((choice: any) => (
                <MenuItem key={choice[0]} value={choice[0]}>
                  {choice[1]}
                </MenuItem>
              ))}
            </TextField>

            {(selectedRole as any) === "speaker" &&
              (config as any)?.completion?.use_speaker !== false && (
                <TextField
                  label={t("contributors.functionLabel")}
                  size="small"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              )}

            <Button
              color="brand"
              onClick={handleAdd}
              disabled={!selectedContributor || addContribution.isPending}
            >
              {addContribution.isPending ? t("common.adding") : t("common.add")}
            </Button>
          </div>

          <Box className={videoStyles.contributorsList}>
            {contributionsLoading ? (
              <CircularProgress size={24} />
            ) : contributions.length > 0 ? (
              <Box className={videoStyles.contributorsItems}>
                {contributions.map((c) => (
                  <Box key={c.id} className={videoStyles.contributorItem}>
                    <Box className={videoStyles.contributorIdentity}>
                      <PersonIcon color="action" />
                      <Box>
                        <div className={videoStyles.contributorName}>
                          {c.contributor_details.first_name}{" "}
                          {c.contributor_details.last_name}
                        </div>
                        <div className={videoStyles.contributorRoleText}>
                          {getRoleLabel(c.role)}
                          {c.role === "speaker" && c.job_title
                            ? ` - ${c.job_title}`
                            : ""}
                        </div>
                      </Box>
                    </Box>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeContribution.mutate(c.id)}
                      disabled={removeContribution.isPending}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            ) : (
              <span className={videoStyles.noContributors}>
                {t("contributors.noContributors")}
              </span>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}
