import styles from "./navbar.module.scss";
import logo2 from "@/assets/bytesLogo.svg";
import Button from "../button";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  if (pathname.includes("auth")) return null;

  return (
    <section className={styles.navbar}>
      <div className=" mt-4 flex items-center justify-between">
        <Link to="/">
          <img src={logo2} alt="BytesBlog Logo" />
        </Link>
        <div>
          <Link to="/auth/sign-in">
            <Button className="bg-white font-semibold text-primaryColor">
              Sign In
            </Button>
          </Link>
          <Link to="/auth/create-account">
            <Button className="bg-primaryColor text-white">Sign Up</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
