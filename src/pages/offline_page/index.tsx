import { Radio } from "react-loader-spinner";
import styles from "./offline.page.module.scss";

export default function OfflinePage() {
  return (
    <div className={styles.offline}>
      <div className="flex items-center justify-center">
        <Radio
          visible={true}
          height="95"
          width="95"
          ariaLabel="radio-loading"
          wrapperStyle={{}}
          wrapperClass="radio-wrapper"
        />
      </div>
      <h1 className="text-center text-3xl text-lighterGray">
        Seems your network is lost.
      </h1>
      <p className="mt-4 text-center text-2xl text-dark">
        <b>
          You would be able to access BytesBlog once your network connection is
          restored.
        </b>
      </p>
    </div>
  );
}
