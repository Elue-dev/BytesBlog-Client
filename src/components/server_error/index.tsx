import { TbFaceIdError } from "react-icons/tb";
import Button from "../button";
import styles from "@/pages/offline_page/offline.page.module.scss";

export default function ServerError() {
  return (
    <div className={styles.offline}>
      <TbFaceIdError size={60} />
      <h1 className="my-3 text-2xl font-semibold">
        Oops. Something went very wrong.
      </h1>
      <Button
        onClick={() => location.reload()}
        className="h-10 w-24 border bg-primaryColor text-white hover:bg-primaryColorHover"
      >
        RETRY
      </Button>
    </div>
  );
}
