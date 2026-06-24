import LineUp from "./line-up";
import { TeamCards } from "./team-cards";
import styles from "./framer-lineup-exact.module.css";

export function FramerLineUpExact() {
  return (
    <section className={styles.wrap}>
      <LineUp />
      <TeamCards />
    </section>
  );
}
