import styles from "./navbar.module.scss";
import byteslogo from "@/assets/bytesLogo.svg";
import userIcon from "@/assets/userIcon.svg";
import profileIcon from "@/assets/profileIcon.svg";
import savedPosts from "@/assets/savedPosts.svg";
import interestsIcon from "@/assets/interestsIcon.svg";
import Button from "../button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsVectorPen } from "react-icons/bs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useState } from "react";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrollPage, setScrollpage] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const fixNavbar = () => {
    if (window.scrollY > 80) {
      setScrollpage(true);
    } else {
      setScrollpage(false);
    }
  };

  window.addEventListener("scroll", fixNavbar);

  if (pathname.includes("auth")) return null;

  return (
    <section className={scrollPage ? `${styles.main}` : ""}>
      <div className={styles.navbar}>
        <div className="mt-4 flex items-center justify-between">
          <Link to="/">
            <img
              src={byteslogo}
              alt="BytesBlog Logo"
              className="h-9 sm:h-auto"
            />
          </Link>
          <div>
            {location.pathname.includes("blog") ? (
              <div className="flex items-center justify-start gap-0 sm:gap-1">
                <Link to="/blog/write">
                  <Button className="flex items-center justify-start gap-1 whitespace-nowrap bg-primaryColor p-2.5 text-white hover:bg-primaryColorHover sm:p-3">
                    Write a Post
                    <BsVectorPen />
                  </Button>
                </Link>
                <div
                  className="relative flex cursor-pointer items-center justify-start gap-0 sm:gap-1"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <img
                    src={userIcon}
                    alt="user"
                    className="pointer-events-none h-11 sm:h-14"
                  />
                  {showDropdown ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                </div>

                {showDropdown ? (
                  <div className="absolute right-2 top-9 z-10 mx-4 my-8 w-60 rounded-sm bg-white p-5 shadow-lg sm:right-auto sm:top-12">
                    <div className="py-5 leading-10 text-gray500">
                      <div
                        onClick={() => {
                          navigate("/user/profile");
                          setShowDropdown(false);
                        }}
                        className="flex cursor-pointer items-center justify-start gap-3"
                      >
                        <img src={profileIcon} alt="profile" />
                        <span> Profile</span>
                      </div>
                      {/* <div
                        onClick={() => {
                          navigate("");
                          setShowDropdown(false);
                        }}
                        className="flex cursor-pointer items-center justify-start gap-3"
                      >
                        <img src={savedPosts} alt="saved posts" />
                        <span> Saved Posts</span>
                      </div> */}
                      <div
                        onClick={() => {
                          navigate("");
                          setShowDropdown(false);
                        }}
                        className="mb-3 flex cursor-pointer items-center justify-start gap-3"
                      >
                        <img src={interestsIcon} alt="manage interests" />
                        <span>Manage Interests</span>
                      </div>
                      <hr />
                      <div
                        onClick={() => setShowDropdown(false)}
                        className="mt-4 flex cursor-pointer items-center justify-start gap-3"
                      >
                        Sign Out
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <Link to="/auth/sign-in">
                  <Button className="mr-4 bg-white font-semibold text-primaryColor">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/create-account">
                  <Button className="bg-primaryColor p-3 text-white hover:bg-primaryColorHover">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
