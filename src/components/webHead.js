import Head from "next/head";

const WebHead = () => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <link rel="shortcut icon" href="/assets/images/logo.png" />
      <title>Zora</title>
    </Head>
  );
};

export default WebHead;
