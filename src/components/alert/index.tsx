import { useAlert } from "@/context/useAlert";
import { Message } from "primereact/message";
import styles from "./alert.module.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

export default function Alert() {
  const alertContext = useAlert();
  if (!alertContext) return null;

  const { showAlert, message, severity } = alertContext;

  return (
    <section>
      {showAlert ? (
        <div className={styles.alert}>
          <Message
            severity={severity || undefined}
            text={message}
            style={{
              boxShadow: "inset 0 0 0 0.15rem #d0edd8 !important",
            }}
          />
        </div>
      ) : null}
    </section>
  );
}
