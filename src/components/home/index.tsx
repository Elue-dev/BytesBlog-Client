import Hero from "../hero";
import { offers } from "./data";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <section>
      <Hero />
      <div className="pt-8">
        <h1 className="text-center text-3xl font-semibold">
          What we offer you
        </h1>
        <div
          className={`${styles.offer} grid gap-4 pt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
        >
          {offers.map((offer) => (
            <div key={offer.id}>
              <h2 className="text-xl font-semibold">{offer.heading}</h2>
              <p className="pt-2 text-lightTextColor">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
