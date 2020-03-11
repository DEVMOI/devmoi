import Head from "next/head";
import moifetch from "moifetch";
const ReactMarkdown = require("react-markdown");
export async function getStaticProps() {
  let branch;
  process.env.NODE_ENV == "development"
    ? (branch = "dev")
    : (branch = "master");
  const res = await moifetch(
    `https://raw.githubusercontent.com/NodeGG/devmoi/${branch}/_posts/getting-started.md`
  );
  const data = await res;
  return {
    props: {
      data
    }
  };
}

export default ({ data }) => {
  console.log(data);
  return (
    <div className="container-fluid h-100">
      <a
        onClick={() => {
          window.location.pathname = "/";
        }}
      >
        Back
      </a>
      <div className="row h-100">
        <div className="col-2 h-100 overflow-auto"></div>
        <div className="col-10 overflow-auto">
          <ReactMarkdown className="" source={""} />
        </div>
      </div>
    </div>
  );
};
