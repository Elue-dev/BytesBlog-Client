import { useTheme } from "@/context/useTheme";
import styles from "./theme.toggle.module.scss";

export default function ThemeToggle() {
  const { toggle, mode } = useTheme()!;

  return (
    <div className={styles.container} onClick={toggle}>
      <div className={styles.icon}>🌙</div>
      <div className={styles.icon}>🔆</div>
      <div
        className={styles.ball}
        style={mode === "light" ? { left: "2px" } : { right: "2px" }}
      />
    </div>
  );
}
