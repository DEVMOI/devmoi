import Head from "next/head";
import moifetch from "moifetch";
const ReactMarkdown = require("react-markdown");
import path from "path";
import fs from "fs";

export async function getStaticProps() {
  let branch;
  let guides = [];
  fs.readdir(path.join("_posts"), (err, files) => {
    if (files) {
      files.forEach(file => {
        // Mounts commnds
        guides.push(file);
      });
    } else {
      console.log("Component Not Found...");
    }
  });

  process.env.NODE_ENV == "development"
    ? (branch = "dev")
    : (branch = "master");
  const res = await moifetch(
    `https://raw.githubusercontent.com/NodeGG/devmoi/${branch}/_posts/getting-started.md`
  );

  const data = await res;
  return {
    props: {
      data,
      guides
    }
  };
}

export default ({ data, guides }) => {
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
        <div className="col-3 h-100 overflow-auto">
          {guides.map(guide => {
            return <p>{guide}</p>;
          })}
        </div>
        <div className="col-9 overflow-auto">
          <ReactMarkdown className="" source={data.body} />
        </div>
      </div>
    </div>
  );
};
