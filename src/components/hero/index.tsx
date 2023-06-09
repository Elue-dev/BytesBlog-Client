import { selectIsLoggedIn } from "@/redux/slices/auth.slice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../button";
import ThemeToggle from "../theme_toggle";
import styles from "./hero.module.scss";

export default function Hero() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <section className={`h-[75vh] ${styles.hero} mt-1`}>
      {!isLoggedIn && (
        <div className="container pt-3">
          <ThemeToggle />
        </div>
      )}
      <div className={`${styles.content} pt-16`}>
        <h2 className="leading-12 text-5xl text-zinc-900">
          Unleash your thoughts and pen them down
        </h2>
        <p className="mt-4 font-normal text-grayNeutral sm:font-normal">
          Share your thoughts even as you immerse yourself in our rich content
          that covers a wide range of topics.
        </p>
        {isLoggedIn ? (
          <Link to="/blog">
            <Button className="mt-6 w-24 bg-primaryColor p-4 text-white  hover:bg-primaryColorHover">
              Visit Blog
            </Button>
          </Link>
        ) : (
          <Link to="/auth/create-account">
            <Button className="mt-6 flex w-24 items-center justify-center whitespace-nowrap bg-primaryColor p-4 text-white hover:bg-primaryColorHover">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
