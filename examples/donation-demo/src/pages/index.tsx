import Content from "@/components/Content/Content";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SubBox from "@/components/SubBox/SubBox";
import Subheader from "@/components/Subheader/Subheader";
import styles from "@/styles/Home.module.css";

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Clonify Demo | Superfluid</title>
        <meta name="description" content="Clonify Demo | Superfluid widget" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className={styles.Wrapper}>
        <img
          src="/header.png"
          className={styles.HeroImage}
          alt="Clofiny hero img<"
        />
        <main className={styles.Main}>
          <div>
            <Subheader />

            <h3>Description</h3>
            <Content>
              <p>
                BlockchainBites is an educational platform dedicated to
                demystifying the complexities of blockchain technology. Our
                mission is to provide comprehensive, yet easily digestible
                resources for both novice learners and advanced developers.
              </p>
            </Content>
            <hr />

            <h3>About</h3>
            <Content>
              <p>
                Blockchain technology has the power to transform industries and
                revolutionize the way we interact with data and digital assets.
                However, understanding blockchain can be daunting, with its
                complex concepts and technical jargon. That&lsquo;s where
                BlockchainBites comes in.
              </p>
              <br />
              <p>
                Our platform is dedicated to making blockchain education
                accessible, engaging, and practical for everyone, from beginners
                to advanced developers. We believe that by fostering a strong
                educational foundation, we can unlock the full potential of
                blockchain and drive its widespread adoption.
              </p>
              <br />
              <p>
                At BlockchainBits, we have curated a rich collection of
                resources, including interactive tutorials, insightful articles,
                and real-world use cases. Our goal is to provide you with the
                tools and knowledge needed to navigate the blockchain landscape
                with confidence and creativity. By supporting us you contribute
                to the expansion and enhancement of the BlockchainBits platform.
                Your generous contributions will allow us to develop new
                content, improve user experience, and provide even more value to
                our community.
              </p>
              <br />
              <b>Why should you support BlockchainBites?</b>
              <br />
              <p>
                Empowerment: Your contribution helps empower individuals
                worldwide to understand and harness the power of blockchain
                technology, fostering innovation and positive change.
              </p>
              <br />
              <p>
                Community Engagement: By supporting BlockchainBites, you become
                part of a vibrant community of blockchain enthusiasts,
                developers, and thought leaders. Connect, collaborate, and
                exchange ideas with like-minded individuals.
              </p>
              <br />
              <p>
                Cutting-Edge Education: We strive to stay at the forefront of
                blockchain education, constantly updating our resources to
                reflect the latest advancements and industry trends. Your
                support helps us deliver up-to-date and relevant content.
              </p>
              <br />
              <p>
                Accessibility: We believe that education should be accessible to
                all. Your contributions will enable us to offer scholarships,
                workshops, and other initiatives to reach individuals who may
                face financial or geographic barriers.
              </p>

              <p>
                Join us in our mission to demystify blockchain technology and
                build a more educated, inclusive, and empowered blockchain
                community.
              </p>
            </Content>
          </div>
          <SubBox />
        </main>
        <Footer />
      </div>
    </>
  );
}
