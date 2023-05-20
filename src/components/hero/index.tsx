import Button from "../button";
import styles from "./hero.module.scss";

export default function Hero() {
  return (
    <section className={`h-[50vh] ${styles.hero} mt-2 bg-primaryColorLight`}>
      <div className={`${styles.content} pt-20`}>
        <h2 className="leading-12 max-w-md text-4xl">
          Unleash your thoughts and pen them down
        </h2>
        <p className="mt-4 max-w-md text-lightTextColor">
          Share your thoughts even as you immerse yourself in our rich content
          that covers a wide range of topics.
        </p>
        <Button className="mt-6 bg-primaryColor text-white">Get Started</Button>
      </div>
    </section>
  );
}
