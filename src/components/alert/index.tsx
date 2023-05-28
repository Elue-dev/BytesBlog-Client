import { useAlert } from "../../context/useAlert";
import { Message } from "primereact/message";
import styles from "./alert.module.scss";

export default function Alert() {
  const context = useAlert();
  if (!context) return null;
  const { showAlert, message, severity } = context;

  return (
    <section>
      {showAlert ? (
        <div className={`${styles.alert} ${styles.show}`}>
          <Message
            severity={severity || undefined}
            text={message}
            style={{
              border: "2px solid rgb(239, 239, 239)",
              boxShadow: "inset 0 0 0 0.15rem #d0edd8 !important",
            }}
          />
        </div>
      ) : null}
    </section>
  );
}
