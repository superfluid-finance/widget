import Head from "next/head";
import Link from "next/link";

import Badge from "@/components/Badge/Badge";
import JoinButton from "@/components/JoinButton/JoinButton";
import RoleCard from "@/components/RoleCard/RoleCard";
import styles from "@/styles/Community.module.css";

export default function Community() {
  return (
    <>
      <Head>
        <title>Cliques Demo | Superfluid</title>
        <meta name="description" content="Cliques Demo | Superfluid widget" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.Main}>
        <header className={styles.Header}>
          <img className={styles.Logo} src="/cliques-white.svg" />
        </header>

        <section className={styles.Wrapper}>
          <div className={styles.Navigation}>
            <Link href="/" className={styles.Back}>
              <img src="/icons/back.svg" />
              <span>Go back to projects</span>
            </Link>

            <div className={styles.Badges}>
              <Badge iconUrl="/icons/users.svg">63k</Badge>
              <Badge iconUrl="/icons/role.svg">1 role</Badge>
            </div>
          </div>

          <h4>GrumpyKitties</h4>

          <p>
            This unique project brings together a community of quirky, sassy,
            and slightly disgruntled felines to form their very own DAO. Prepare
            yourself for a delightful blend of cuteness and chaos as these
            fur-tastic kitties make important governance decisions, distribute
            rewards and share knowledge with a touch of whimsy and a dash of
            catnip-induced charm.
          </p>
          <br />
          <p>
            Join our community and receive your NFT to access unique community
            content.
          </p>
          <br />

          <JoinButton>Join Community</JoinButton>

          <h4>Roles (1)</h4>

          <RoleCard
            title="Clique Member"
            members="63k"
            description="The Member tier grants you access to the exclusive world of Grumpy Kitties, where you can participate in community discussions and enjoy early sneak peeks of the latest updates!"
            requirements={["Stream 5 fUSDCx and receive an NFT"]}
          />
        </section>
      </main>
    </>
  );
}
