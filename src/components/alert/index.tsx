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
          <Message severity={severity || undefined} text={message} />
        </div>
      ) : null}
    </section>
  );
}
