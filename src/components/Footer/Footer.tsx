"use client";
import styles from "./styles.module.css";
import { useAppInfo } from "@/src/hooks/useAppInfo";
import Link from "next/link";

import { useTranslation } from "@/src/hooks/useTranslation";
import Image from "next/image";

export default function Footer() {
  const { info } = useAppInfo();
  const { t } = useTranslation();
  const projectName = info?.project ?? "Esup.Pod";
  const version = info?.version ?? "N/A";

  return (
    <footer className={`${styles.footer} ${styles["sidebarFixed"]}`} id="footer">
      <div className={styles["footer-content"]}>
        <div className={styles["footer-contact-univ"]}>
          <div className={styles["footer-contact-univ-logo"]}>
            <Image
              src="/logoEsup.svg"
              alt={t("a11y.institutionLogo")}
              className={styles["footer-contact_univ_logo_image"]}
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
        <div className={styles["footer-link"]}>
          <Link href="/pages/mentions-legales">{t("footer.legalNotice")}</Link>
          <Link href="/pages/accessibilite">{t("footer.accessibilityPartially")}</Link>
          <Link href="/pages/plan-du-site">{t("footer.siteMap")}</Link>
          <Link href="/pages/utiliser-pod">{t("home.btnUsePod")}</Link>
          <Link href="/pages/comment-faire">{t("home.btnHowTo")}</Link>
          <Link href="/pages/droits-auteur">{t("home.btnCopyright")}</Link>
        </div>
        <div className={styles["footer-extra-link"]}>
          <div className={styles["footer-extra-link-icons"]}>
            <span className={styles["footer-extra-link-icon"]}>
              <Image src="/facebook_icon.png" alt={t("a11y.facebookLogo")} fill />
            </span>
            <span className={styles["footer-extra-link-icon"]}>
              <Image src="/x_icon.png" alt={t("a11y.xLogo")} fill />
            </span>
            <span className={styles["footer-extra-link-icon"]}>
              <Image src="/linkedin_icon.png" alt={t("a11y.linkedinLogo")} fill />
            </span>
          </div>
          <div className={styles["footer-extra-link-esup"]}>
            <a href="https://github.com/EsupPortail/Esup-Pod-front" target="_blank" rel="noreferrer">{t("footer.esupProject")}</a>
            <a href="https://www.esup-portail.org/" target="_blank" rel="noreferrer">{t("footer.esupPortal")}</a>
          </div>
        </div>
      </div>
      <p className={styles["credits-infos"]}>
        {projectName} | {t("footer.videoPlatform")} - Consortium Esup • Version {version}
      </p>
    </footer>
  );
}
