import Head from "next/head";
import moifetch from "moifetch";
const ReactMarkdown = require("react-markdown");
// export async function getStaticProps() {
//   const res = await moifetch("https://httpbin.org/get");
//   const data = await res;

//   return {
//     props: {
//       data
//     }
//   };
// }
const parseSentence = () => {
  const regex = / \s+/g;
  const str = `This is a [Next.js](https://nextjs.org/) project bootstrapped with [\`create-next-app\`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying \`pages/index.js\`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.`;
  const subst = `\r\n\r\n`;

  // The substituted value will be contained in the result variable
  const result = str.replace(regex, subst);

  console.log("Substitution result: \r\n", result);
  return str;
};
export default ({ data }) => {
  return (
    <div className="container-fluid h-100 border border-dark">
      <style jsx>{``}</style>
      <div className="d-flex flex-column align-items-center justify-content-center mx-auto h-100">
        <h1 className="display-3">DEVMOI</h1>
        <p className="lead">
          Join us:
          <br />
          <a href="https://discord.gg/DnbkrC8" target="_blank">
            <img
              className="border border-dark"
              src="https://img.shields.io/discord/687169639712686097?style=for-the-badge&logo=discord"
              alt="Discord Icon"
            />
          </a>
        </p>
        <a
          className="btn btn-outline-dark"
          onClick={() => {
            window.location.pathname = "/guides";
          }}
        >
          Get Started
        </a>
      </div>
    </div>
  );
};
