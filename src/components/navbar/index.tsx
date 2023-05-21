import styles from "./navbar.module.scss";
import logo2 from "@/assets/bytesLogo.svg";
import Button from "../button";

export default function Navbar() {
  return (
    <section className={styles.navbar}>
      <div className=" mt-4 flex items-center justify-between">
        <img src={logo2} alt="logo" />
        <div>
          <Button className="bg-white font-semibold text-primaryColor">
            Sign In
          </Button>
          <Button className="bg-primaryColor text-white">Sign Up</Button>
        </div>
      </div>
    </section>
  );
}
