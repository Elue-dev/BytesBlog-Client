import Hero from "../../components/hero";
import { offers } from "./data";
import homeImage from "@/assets/homeImage.svg";
import styles from "./landing.page.module.scss";
import Button from "../../components/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className={styles.home}>
      <Hero />
      <div className="pt-2 sm:pt-20">
        <h1 className={`${styles.heading} text-center text-3xl font-semibold`}>
          What we offer you
        </h1>
        <div className={`${styles.main}`}>
          <div className="mb-16 grid gap-6 pt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <div key={offer.id}>
                <div className="flex">
                  <img
                    src={offer.icon}
                    alt={offer.heading}
                    className="mb-4 h-20 w-20 rounded-full bg-primaryColorLighter p-4"
                  />
                </div>
                <div></div>
                <h2 className="text-xl font-semibold">{offer.heading}</h2>
                <p className="pt-2 text-lightTextColor">{offer.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-0 pt-1 sm:flex-row sm:gap-8 sm:pt-20">
            <div className="w-full sm:w-1/2">
              <img
                src={homeImage}
                alt="Join Community"
                className="h-[19rem] w-full"
              />
            </div>
            <div className="w-full sm:mt-0 sm:w-1/2">
              <h2 className="mb-3 text-4xl font-semibold leading-[3rem] sm:text-3xl">
                Join a community of creative geniuses
              </h2>
              <p className="text-lightTextColor">
                Connect with curious minds, tell your story and share your
                knowledge even just the way you want it
              </p>
              <Link to="/blog">
                <Button className="mt-6 bg-primaryColor p-4 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`${styles["home__footer"]} mt-10 h-20 w-full bg-primaryColorLight`}
        ></div>
      </div>
    </section>
  );
}
