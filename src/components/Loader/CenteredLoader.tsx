import { Loader } from "@openfun/cunningham-react";
import styles from "./styles.module.css";

export default function CenteredLoader() {
  return (
    <div className={styles["centered-loader"]}>
      <Loader />
    </div>
  );
}
