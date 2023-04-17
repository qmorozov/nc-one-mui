import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>nc-one</title>
        <meta name="description" content="This is a test task for nc-one" />
        <link
          rel="shortcut icon"
          type="image/png"
          href="https://djinni.co/api/imgproxy/BS5ZVQzH8YZEKnRRxH2GVcXbnIcGOHhj4QREQtNWho4/rs:fit:280:280:True/aHR0cHM6Ly9wLmRq/aW5uaS5jby9kOC82/NGVkMmJlMjA5MDE3/ZTZjYzJkZGY3MDg1/YjQxYTYvV2hhdHNB/cHBfSW1hZ2VfMjAy/MC1fNDAwLmpwZWc.jpg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
