import Content from "@/components/Content/Content";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SubBox from "@/components/SubBox/SubBox";
import Subheader from "@/components/Subheader/Subheader";
import styles from "@/styles/Project.module.css";

export default function Project() {
  return (
    <>
      <Header />

      <div className={styles.Wrapper}>
        <img
          src="/heading2.png"
          className={styles.HeroImage}
          alt="Blockchain bytes hero image"
        />
        <main className={styles.Main}>
          <div className={styles.ProjectContent}>
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
              <br />
              <p>
                <span className={styles.Red}>Empowerment:</span> Your
                contribution helps empower individuals worldwide to understand
                and harness the power of blockchain technology, fostering
                innovation and positive change.
              </p>
              <br />
              <p>
                <span className={styles.Green}>Community Engagement:</span> By
                supporting BlockchainBites, you become part of a vibrant
                community of blockchain enthusiasts, developers, and thought
                leaders. Connect, collaborate, and exchange ideas with
                like-minded individuals.
              </p>
              <br />
              <p>
                <span className={styles.Blue}>Cutting-Edge Education:</span> We
                strive to stay at the forefront of blockchain education,
                constantly updating our resources to reflect the latest
                advancements and industry trends. Your support helps us deliver
                up-to-date and relevant content.
              </p>
              <br />
              <p>
                <span className={styles.Purple}>Accessibility:</span> We believe
                that education should be accessible to all. Your contributions
                will enable us to offer scholarships, workshops, and other
                initiatives to reach individuals who may face financial or
                geographic barriers.
              </p>
              <br />
              <p>
                <b>
                  Join us in our mission to demystify blockchain technology and
                  build a more educated, inclusive, and empowered blockchain
                  community.
                </b>
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
