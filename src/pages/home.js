import { Layout } from "../components";
import { useState, useEffect } from "react";
import moifetch from "moifetch";
import Parser from "rss-parser";
export async function getStaticProps() {
  const res = await moifetch(
    "https://github.com/organizations/NodeGG/Moikapy.private.atom?token=AELYH7E3PYESPTOH4PKAOWV4PBDEQ"
  );
  const data = await res;
  return {
    props: {
      data
    }
  };
}

const parseDate = (date = "", seperator = "/") => {
  let current_datetime = new Date(date);
  let formatted_date =
    current_datetime.getMonth() +
    1 +
    seperator +
    current_datetime.getDate() +
    seperator +
    current_datetime.getFullYear();
  return formatted_date;
};

export default ({ data }) => {
  const [rssActivityArr, setData] = useState([]);
  useEffect(() => {
    let parser = new Parser();
    let arr = [];
    parser.parseString(data.body, (err, feed) => {

      feed.items.forEach(
        ({ title, link, pubDate, author, content, contentSnippet }) => {
          arr.push({
            title,
            link,
            pubDate,
            author,
            content,
            contentSnippet
          });
        }
      );
      setData(arr);
    });
    document.querySelectorAll(".push .body .border-bottom") !== undefined
      ?
        (document
          .querySelectorAll(".activity-item .border-bottom")
          .forEach(el => {
            el.classList.remove("border-bottom");
          }),
        document.querySelectorAll(".activity-item a").forEach(el => {
          el.target = "_blank";
          !el.href.includes("https://github.com")
            ? (el.href = el.href.replace(
                `${window.location.origin}`,
                "https://github.com"
              ))
            : null;
        }))
      : null;
  });
  // console.log(data.statusCode)
  return (
    <Layout classes="pt-3 h-100">
      <div className="d-flex flex-column h-100">
        <style jsx>
          {`
            .activity-item {
              color: #000;
            }
          `}
        </style>
        <h3>Activity Feed:</h3>
        <div className="border border-dark my-3 overflow-auto">
          {rssActivityArr.map(({ link, content }, key) => {
            return (
              <a
                key={key}
                href={link}
                target='_blank'
                className="activity-item text-wrap text-break text-decoration-none"
              >
                {/* //Content */}
                <div
                  className="w-100 border border-dark px-5"
                  dangerouslySetInnerHTML={{
                    __html: `${content}`
                  }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
