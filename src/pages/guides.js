import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import moifetch from 'moifetch';
// const ReactMarkdown = require('react-markdown');
import React, { useState, useEffect } from 'react';

export async function getStaticProps() {
  let branch;
  let guides = [];
  fs.readdir(path.join('_posts'), (err, files) => {
    files
      ? files.forEach((file) => {
          guides.push(file);
        })
      : console.log('Component Not Found...');
  });

  process.env.NODE_ENV == 'development'
    ? (branch = 'dev')
    : (branch = 'master');
  const res = await moifetch(
    `https://raw.githubusercontent.com/NodeGG/devmoi/${branch}/_posts/getting-started.md`
  );

  const data = await res;
  return {
    props: {
      data,
      guides,
      branch,
    },
  };
}

export default ({ data, guides, branch }) => {
  process.env.NODE_ENV == 'development'
    ? console.log('dev')
    : console.log('prod');
  const [isClosed, setSidebarStatus] = useState(false);
  return (
    <div className="container h-100">
      <style jsx>
        {`
          .guide {
            max-width: 68.125rem;
            margin-left: 9.375rem;
          }
          .guide-list-open {
            width: 9.375rem;
            margin-top: 3.5625rem;
            position: fixed;
            top: 0;
            z-index: 1030;
          }
          .guide-list-closed {
            width: 2.5078rem;
            margin-top: 3.5625rem;
            position: fixed;
            top: 0;
            z-index: 1030;
          }
        `}
      </style>
      <div className="row h-100">
        <div
          className={
            isClosed
              ? 'guide-list-closed h-100 overflow-auto border-right border-bottom border-dark'
              : 'guide-list-open h-100 overflow-auto border-right border-bottom border-dark'
          }>
          {!isClosed
            ? guides.map((guide, i) => {
                return (
                  <p
                    className="mb-0 text-center py-3 border-bottom border-dark"
                    key={i}>
                    {guide}
                  </p>
                );
              })
            : null}
        </div>
        <div
          className={
            isClosed
              ? 'guide h-100 w-100 ml-5 border-right border-dark'
              : 'guide w-100 border-right border-dark'
          }></div>
      </div>
    </div>
  );
};
