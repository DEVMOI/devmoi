import Head from "next/head";
import moifetch from "moifetch";

// export async function getStaticProps() {
//   const res = await moifetch("https://httpbin.org/get");
//   const data = await res;

//   return {
//     props: {
//       data
//     }
//   };
// }

export default ({ data }) => {
  return (
    <div className="container-fluid h-100 border border-dark">
      <div className="d-flex flex-column align-items-center justify-content-center mx-auto h-100">
        <h1>DEVMOI</h1>
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
      </div>
    </div>
  );
};
