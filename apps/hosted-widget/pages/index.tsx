import { NextPage } from "next";
import Head from "next/head";

const redirectURL = process.env.NEXT_PUBLIC_ROOT_REDIRECT_URL;

const Home: NextPage = () => {
  return (
    <Head>
      {/* Redirect after 0 seconds. */}
      <meta http-equiv="refresh" content={`0; URL=${redirectURL}`}></meta>
    </Head>
  );
};

export default Home;
