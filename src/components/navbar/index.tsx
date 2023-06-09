import styles from "./navbar.module.scss";
import byteslogo from "@/assets/bytesLogo.svg";
import bytesLogoDark from "@/assets/bytesLogoDark.svg";
import profileIcon from "@/assets/profileIcon.svg";
import profileDark from "@/assets/profileDark.svg";
import interestsIcon from "@/assets/interestsIcon.svg";
import interestsDark from "@/assets/interestsDark.svg";
import Button from "../button";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsVectorPen } from "react-icons/bs";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiArticleLine,
} from "react-icons/ri";
import { useEffect, useState } from "react";
import {
  REMOVE_ACTIVE_USER,
  selectIsLoggedIn,
} from "@/redux/slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { User } from "@/types/user";
import { RootState } from "@/redux/store";
import { getUserInitials } from "@/helpers/user.initials";
import ThemeToggle from "../theme_toggle";
import { useTheme } from "@/context/useTheme";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrollPage, setScrollpage] = useState(false);
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );

  const dispatch = useDispatch();
  const { userId } = useParams();
  const { mode } = useTheme()!;

  let initials;
  if (currentUser)
    initials = getUserInitials(currentUser.firstName, currentUser.lastName);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fixNavbar = () => {
      if (window.scrollY > 80) {
        setScrollpage(true);
      } else {
        setScrollpage(false);
      }
    };

    window.addEventListener("scroll", fixNavbar);

    return () => {
      window.removeEventListener("scroll", fixNavbar);
    };
  }, []);

  const signOutUser = () => {
    dispatch(REMOVE_ACTIVE_USER());
    setShowDropdown(false);
  };

  if (pathname.includes("auth")) return null;

  return (
    <section
      className={scrollPage ? `${styles.main}` : ""}
      style={{
        background: mode === "light" ? "#fff" : "rgb(8, 8, 8)",
      }}
    >
      <div className={styles.navbar}>
        <div className="flex items-center justify-between">
          {mode === "dark" ? (
            <Link to="/">
              <img
                src={bytesLogoDark}
                alt="BytesBlog Logo"
                className="h-9 sm:h-auto"
              />
            </Link>
          ) : (
            <Link to="/">
              <img
                src={byteslogo}
                alt="BytesBlog Logo"
                className="h-9 sm:h-auto"
              />
            </Link>
          )}

          <div>
            {isLoggedIn ? (
              <div className="flex items-center justify-start gap-0 sm:gap-1">
                {!pathname.includes("write") && (
                  <Link
                    to="/blog/write?action=new"
                    className={styles["write__post__cont"]}
                  >
                    <Button
                      className={`${styles.write} flex items-center justify-start gap-1 whitespace-nowrap bg-primaryColor p-2.5 text-white hover:bg-primaryColorHover sm:p-3`}
                    >
                      Write a Post
                      <BsVectorPen />
                    </Button>
                  </Link>
                )}
                <div
                  className="relative flex cursor-pointer items-center justify-start gap-0 sm:gap-1"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {currentUser?.avatar === "" ? (
                    <>
                      <div
                        className={styles["user__initials"]}
                        style={{
                          background: mode === "dark" ? "#f0f0f0" : "#000",
                          color: mode === "dark" ? "#000" : "#f0f0f0",
                        }}
                      >
                        {initials}
                      </div>
                      {showDropdown ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                    </>
                  ) : (
                    <>
                      <img
                        src={currentUser?.avatar}
                        alt={currentUser?.firstName}
                        className="pointer-events-none h-11 w-11 rounded-full object-cover sm:h-14 sm:w-14"
                      />
                      {showDropdown ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                    </>
                  )}
                </div>

                {showDropdown ? (
                  <div
                    className={`absolute right-2 top-9 z-10 mx-4 my-8 w-60 rounded-sm ${
                      mode === "dark" ? "bg-blackNeutral" : "bg-white"
                    } p-5 shadow-lg sm:right-auto sm:top-12`}
                  >
                    <div className="leading-10 text-gray500">
                      <div className={styles["write__cont__mobile"]}>
                        <div
                          onClick={() => {
                            navigate("/blog/write?action=new");
                            setShowDropdown(false);
                          }}
                          className="flex cursor-pointer items-center justify-start gap-3"
                        >
                          <div>
                            {" "}
                            {mode === "dark" ? (
                              <BsVectorPen color="#fff" />
                            ) : (
                              <BsVectorPen />
                            )}
                          </div>
                          <span
                            className={
                              mode === "dark" ? "text-lightGray" : "text-dark"
                            }
                          >
                            Add Post
                          </span>
                        </div>
                      </div>

                      {pathname.includes("user") && !userId ? (
                        <div
                          onClick={() => {
                            navigate("/blog");
                            setShowDropdown(false);
                          }}
                          className="flex cursor-pointer items-center justify-start gap-3"
                        >
                          <RiArticleLine size={20} />
                          <span
                            className={
                              mode === "dark" ? "text-lightGray" : "text-dark"
                            }
                          >
                            Blog
                          </span>
                        </div>
                      ) : (
                        <>
                          <div
                            onClick={() => {
                              navigate("/user/profile");
                              setShowDropdown(false);
                            }}
                            className="flex cursor-pointer items-center justify-start gap-3"
                          >
                            {mode === "dark" ? (
                              <img
                                src={profileDark}
                                alt="profile"
                                className="h-6"
                              />
                            ) : (
                              <img src={profileIcon} alt="profile" />
                            )}

                            <span
                              className={
                                mode === "dark" ? "text-lightGray" : "text-dark"
                              }
                            >
                              Profile
                            </span>
                          </div>
                        </>
                      )}

                      <div
                        onClick={() => {
                          navigate("/user/manage-interests");
                          setShowDropdown(false);
                        }}
                        className="mb-3 flex cursor-pointer items-center justify-start gap-3"
                      >
                        <img
                          src={mode === "dark" ? interestsDark : interestsIcon}
                          alt="manage interests"
                        />
                        <span
                          className={
                            mode === "dark" ? "text-lightGray" : "text-dark"
                          }
                        >
                          Manage Interests
                        </span>
                      </div>
                      <hr />
                      <div
                        onClick={signOutUser}
                        className={`${
                          mode === "dark" ? "text-lightGray" : "text-dark"
                        } mt-4 flex cursor-pointer items-center justify-start gap-3`}
                      >
                        Sign Out
                      </div>

                      <div>
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <Link to="/auth/sign-in">
                  <Button className="mr-4 bg-transparent font-semibold text-primaryColor">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/create-account">
                  <Button className="bg-primaryColor p-3 text-white hover:bg-primaryColorHover">
                    Sign Up
                  </Button>
                </Link>
                <span className="flex items-end"></span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
