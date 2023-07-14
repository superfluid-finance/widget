import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

const HeroImage = () => {
  return (
    <div className={styles.HeroWrapper}>
      <img
        src="/heading1.png"
        className={styles.HeroImage}
        alt="Clofiny hero img"
      />
      <div className={styles.HeroText}>
        <h1>Support your favorite projects</h1>
        <p>Explore platforms and creators.</p>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>DevShare Demo | Superfluid</title>
        <meta name="description" content="DevShare Demo | Superfluid widget" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className={styles.Wrapper}>
        <HeroImage />

        <main className={styles.Main}>
          <div className={styles.ActiveProjects}>
            <b>1</b> Active project
          </div>

          <div className={styles.Projects}>
            <ProjectCard
              title="BlockchainBites"
              description="BlockchainBites is an educational platform dedicated to demystifying the complexities of blockchain technology..."
              imgUrl="/projects/project1.png"
              totalContributions={698.98}
              websiteUrl="blockchainbites.xyz"
              active
            />

            <ProjectCard
              title="SpehereNet"
              description="Introducing SphereNet, a cutting-edge blockchain platform revolutionizing the way businesses and individuals securely..."
              imgUrl="/projects/project2.png"
              totalContributions={5200.02}
              websiteUrl="sphere.net"
            />

            <ProjectCard
              title="No Bad Days"
              description={`"No Bad Days" is the ultimate podcast, where we explore the transformative power of this technology through insightful...`}
              imgUrl="/projects/project3.png"
              totalContributions={9860.0}
              websiteUrl="nobaddays.com"
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
