import CommunityCard from "@/components/CommunityCard/CommunityCard";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.Main}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/cliques.svg" />

        <div className={styles.HeaderWrapper}>
          <div className={styles.HeaderContent}>
            <h1>Welcome to Cliques</h1>
            <p>The platformless access management for your community.</p>
          </div>

          <img className={styles.HeaderBg} src="/header.png" />
        </div>
      </header>

      <section className={styles.Wrapper}>
        <h4>Explore Cliques</h4>

        <div className={styles.Communities}>
          <CommunityCard
            hasAccess
            title="GrumpyKitties DAO"
            roles={1}
            users="63k"
            imgSrc="/communities/grumpy-kitties.png"
          />
          <CommunityCard
            title="TraderFi"
            roles={3}
            users="50k"
            imgSrc="/communities/traderfi.png"
          />
          <CommunityCard
            title="Quest Swap"
            roles={5}
            users="125k"
            imgSrc="/communities/questswap.png"
          />
          <CommunityCard
            title="ZoneZero"
            roles={1}
            users="22k"
            imgSrc="/communities/zonezero.png"
          />
        </div>
      </section>
    </main>
  );
}
