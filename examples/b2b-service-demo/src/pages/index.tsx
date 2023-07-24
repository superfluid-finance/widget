import Head from "next/head";
import { useState } from "react";

import BookModal from "@/components/BookModal/BookModal";
import Footer from "@/components/Footer/Footer";
import PricingCard from "@/components/PricingCard/PricingCard";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Head>
        <title>Clonify Demo | Superfluid</title>
        <meta name="description" content="Clonify Demo | Superfluid widget" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.Main}>
        <header className={styles.Header}>
          <img src="/logo.svg" alt="Logo" />
        </header>

        <section className={styles.Wrapper}>
          <div className={styles.Heading}>
            <h1>Choose a pricing plan</h1>
            <p>Build and scale your app easier than ever before.</p>
          </div>
          <div className={styles.PricingOptions}>
            <PricingCard
              title="Starter"
              description="Up to 1,000,000 compute units/mo"
              ctaTitle="Subscribe"
              price={29}
              onFinish={openModal}
              features={[
                "Supernode, Build, Monitor, and Notify",
                "Enhanced APIs",
                "Multichain mainnets and testnets",
                "No daily request limits",
                "Full archive data",
              ]}
            />

            <PricingCard
              title="Growth"
              description="Up to 5,000,000 compute units/mo"
              ctaTitle="Subscribe"
              price={99}
              onFinish={openModal}
              features={[
                "Auto-scaling compute units",
                "Parity trace and gETH debug",
                "Access to reinforced transactions",
                "Early access t2x higher throughput",
                "Access to Paymaster Services",
              ]}
            />

            <PricingCard
              outlined
              title="Business"
              description="Custom compute units"
              ctaTitle="Talk to us"
              price={1000}
              onClick={openModal}
              features={[
                "Uncapped Simulation Throughput",
                "Committed use discounts",
                "Custom SLAs",
                "Custom throughput",
                "24/7 VIP support",
              ]}
            />
          </div>
        </section>

        <BookModal show={showModal} onClose={closeModal} />

        <Footer />
      </main>
    </>
  );
}
