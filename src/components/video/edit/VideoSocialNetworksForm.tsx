"use client";

import React, { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSocialNetworks } from "@/src/hooks/useSocialNetworks";
import { authFetch } from "@/src/api/authFetch";
import { useAuth } from "@/src/context/AuthProvider";
import type { Video } from "@/src/types";
import { useTranslation } from "@/src/hooks/useTranslation";
import styles from "./styles.module.css";

type Props = {
  video: Video;
  onNetworksUpdated?: () => void;
};

export default function VideoSocialNetworksForm({
  video,
  onNetworksUpdated,
}: Props) {
  const { socialNetworks, isLoading } = useSocialNetworks();
  const { accessToken, refresh } = useAuth();

  const [selectedIds, setSelectedIds] = useState<number[]>(
    video.social_networks ?? socialNetworks.map((n) => n.id),
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const { t } = useTranslation();
  const handleToggleNetwork = async (id: number) => {
    const nextIds = selectedIds.includes(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];

    setSelectedIds(nextIds);
    setIsUpdating(true);
    setMsg(null);

    try {
      const res = await authFetch(`/api/videos/${video.id}/`, {
        accessToken,
        onRefresh: refresh,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ social_networks: nextIds }),
      });
      if (!res.ok) {
        throw new Error(t("socialNetworks.errorSaveSocial"));
      }
      setMsg(t("socialNetworks.saved"));
      if (onNetworksUpdated) onNetworksUpdated();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : t("errors.save"));
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.socialNetworksForm}>
      <div className={styles.socialNetworksHeader}>
        <ShareIcon className={styles.socialNetworksIcon} />
        <h3 className={styles.socialNetworksTitle}>
          {t("socialNetworks.authorizedShare")}
        </h3>
      </div>

      <p className={styles.socialNetworksDescription}>
        {t("socialNetworks.choice")}
      </p>

      {msg && (
        <div
          className={`${styles.socialNetworksMessage} ${
            msg.includes(t("socialNetworks.saved"))
              ? styles.socialNetworksSuccess
              : styles.socialNetworksError
          }`}
        >
          {msg}
        </div>
      )}

      {isLoading ? (
        <p className={styles.socialNetworksLoading}>
          {t("socialNetworks.loading")}
        </p>
      ) : (
        <div className={styles.socialNetworksGrid}>
          {socialNetworks.map((net) => {
            const isChecked = selectedIds.includes(net.id);
            return (
              <FormControlLabel
                key={net.id}
                control={
                  <Checkbox
                    checked={isChecked}
                    disabled={isUpdating}
                    onChange={() => handleToggleNetwork(net.id)}
                    size="small"
                  />
                }
                label={
                  <span className={styles.socialNetworkLabel}>
                    {net.name}
                  </span>
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
