"use client";
import styles from "./styles.module.css";
import { useAppInfo } from "@/src/hooks/useAppInfo";
import Link from "next/link";

import { useTranslation } from "@/src/hooks/useTranslation";
import Image from "next/image";
import { useSyncExternalStore } from "react";

export default function Footer() {
  const { info } = useAppInfo();
  const { t } = useTranslation();
  const projectName = info?.project ?? "Esup.Pod";
  const version = info?.version ?? "N/A";

  const current_uri = useSyncExternalStore(
    () => () => {},
    () => window.location.href,
    () => "",
  );

  return (
    <footer className={`${styles.footer} ${styles.sidebarFixed}`} id="footer">
      <div className={styles.footer_content}>
        <div className={styles.footer_contact_univ}>
          <div className={styles.footer_contact_univ_logo}>
            <Image
              src="/logoEsup.svg"
              alt={t("accessibility.institutionLogo")}
              className={styles.footer_contact_univ_logo_image}
              fill
            />
          </div>
          <address>
            <p>
              Consortium Esup
              <br /> La Maison des Universites
              <br /> 103 Bvd St Michel
              <br />
              75005 PARIS - France
            </p>
          </address>
        </div>
        <div className={styles.footer_link}>
          <Link href="/pages/mentions-legales">{t("footer.legalNotice")}</Link>
          <Link href="/pages/accessibilite">{t("footer.accessibilityPartially")}</Link>
          <Link href="/pages/plan-du-site">{t("footer.siteMap")}</Link>
          <Link href="/pages/utiliser-pod">{t("home.btnUsePod")}</Link>
          <Link href="/pages/comment-faire">{t("home.btnHowTo")}</Link>
          <Link href="/pages/droits-auteur">{t("home.btnCopyright")}</Link>
        </div>
        <div className={styles.footer_extra_link}>
          <div className={styles.footer_extra_link_icons}>
            <span className={styles.footer_extra_link_icon}>
              <a href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(current_uri)}`} target="_blank" rel="noreferrer">
                <Image src="/facebook_icon.png" alt={t("accessibility.facebookLogo")} fill />
              </a>
            </span>
            <span className={styles.footer_extra_link_icon}>
              <a href={`https://twitter.com/share?url=${encodeURIComponent(current_uri)}`} target="_blank" rel="noreferrer">
                <Image src="/x_icon.png" alt={t("accessibility.xLogo")} fill />
              </a>
            </span>
            <span className={styles.footer_extra_link_icon}>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(current_uri)}`} target="_blank" rel="noreferrer">
              <Image src="/linkedin_icon.png" alt={t("accessibility.linkedinLogo")} fill />
            </a>
            </span>
            <span className={styles.footer_extra_link_icon}>
            <a href={`https://bsky.app/intent/compose?text=${encodeURIComponent(current_uri)}`} target="_blank" rel="noreferrer">
              <Image src="/bluesky_icon.png" alt={t("accessibility.blueskyLogo")} fill />
            </a>
            </span>
            <span className={styles.footer_extra_link_icon}>
            <a href={`${encodeURIComponent(current_uri)}`} target="_blank" rel="noreferrer">
              <Image src="/mastodon_icon.png" alt={t("accessibility.mastodonLogo")} fill />
            </a>
            </span>
          </div>
          <div className={styles.footer_link_esup}>
            <a href="https://github.com/EsupPortail/Esup-Pod-front" target="_blank" rel="noreferrer">{t("footer.esupProject")}</a>
            <a href="https://www.esup-portail.org/" target="_blank" rel="noreferrer">{t("footer.esupPortal")}</a>
          </div>
        </div>
      </div>
      <p className={styles.credits_infos}>
        {projectName} | {t("footer.videoPlatform")} - Consortium Esup • Version {version}
      </p>
    </footer>
  );
}
