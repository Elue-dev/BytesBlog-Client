import { Link } from "react-router-dom";
import Button from "../button";
import styles from "./hero.module.scss";

export default function Hero() {
  return (
    <section className={`h-[75vh] ${styles.hero} mt-1`}>
      <div className={`${styles.content} pt-16`}>
        <h2 className="leading-12 text-5xl">
          Unleash your thoughts and pen them down
        </h2>
        <p className="mt-4 font-normal text-grayNeutral sm:font-normal">
          Share your thoughts even as you immerse yourself in our rich content
          that covers a wide range of topics.
        </p>
        <Link to="/auth/create-account">
          <Button className="mt-6 bg-primaryColor p-4  text-white">
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
}
