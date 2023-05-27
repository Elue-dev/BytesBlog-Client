import styles from "./navbar.module.scss";
import byteslogo from "@/assets/bytesLogo.svg";
import userIcon from "@/assets/userIcon.svg";
import Button from "../button";
import { Link, useLocation } from "react-router-dom";
import { TfiWrite } from "react-icons/tfi";
import { IoIosArrowDown } from "react-icons/io";

export default function Navbar() {
  const { pathname } = useLocation();

  if (pathname.includes("auth")) return null;

  const user = true;

  return (
    <section className={styles.navbar}>
      <div className="mt-4 flex items-center justify-between">
        <Link to="/">
          <img src={byteslogo} alt="BytesBlog Logo" />
        </Link>
        <div>
          {user ? (
            <div className="flex items-center justify-start gap-1">
              <Link to="/blog/write">
                <Button className="flex items-center justify-start gap-1 bg-primaryColor text-white">
                  Write a Post <TfiWrite />
                </Button>
              </Link>
              <div className="flex cursor-pointer items-center justify-start gap-1">
                <img src={userIcon} alt="user" />
                <IoIosArrowDown />
              </div>
            </div>
          ) : (
            <>
              <Link to="/auth/sign-in">
                <Button className="bg-white font-semibold text-primaryColor">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/create-account">
                <Button className="bg-primaryColor text-white">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
