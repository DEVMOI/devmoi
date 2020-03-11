import fs from "fs";
import path from "path";
import Head from "next/head";
import moifetch from "moifetch";
const ReactMarkdown = require("react-markdown");
import React, { useState, useEffect } from "react";

export async function getStaticProps() {
  let branch;
  let guides = [];
  fs.readdir(path.join("_posts"), (err, files) => {
    files
      ? files.forEach(file => {
          guides.push(file);
        })
      : console.log("Component Not Found...");
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
      guides,
      branch
    }
  };
}

export default ({ data, guides, branch }) => {
  process.env.NODE_ENV == "development"
    ? console.log("dev")
    : console.log("prod");

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-3 h-100 overflow-auto border-left border-right border-bottom border-dark">
          {guides.map((guide, i) => {
            return <p key={i}>{guide}</p>;
          })}
        </div>
        <div className="col-9 overflow-auto">
          <ReactMarkdown className="" source={data.body} />
        </div>
      </div>
    </div>
  );
};
