
import { useState, useEffect } from 'react';
import moifetch from 'moifetch';
import Parser from 'rss-parser';
import dynamic from 'next/dynamic';
const parseDate = (date = '', seperator = '/') => {
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

const RSSFeed = (props) => {
  const [rssActivityArr, setData] = useState([]);
  const [res, setRes] = useState({});

  async function handleRes() {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    await moifetch
      .GET(
        proxyUrl +
          'https://github.com/organizations/DEVMOI/Moikapy.private.atom?token=AELYH7C27IZVXT3HCDMPJ5N5NYFGI'
      )
      .then(async(res) => {
        await setRes(res);
      });
  }
  useEffect(() => {
    handleRes();
  }, []);

  useEffect(() => {
    let parser = new Parser();
    let arr = [];
    parser.parseString(res.data, (err, feed) => {
      if (feed !== undefined) {
        feed.items.forEach(
          ({ title, link, pubDate, author, content, contentSnippet }) => {
            arr.push({
              title,
              link,
              pubDate,
              author,
              content,
              contentSnippet,
            });
          }
        );
        setData(arr);
      }
    });
    document.querySelectorAll('.push .body .border-bottom') !== undefined
      ? (document
          .querySelectorAll('.activity-item .border-bottom')
          .forEach((el) => {
            el.classList.remove('border-bottom');
          }),
        document.querySelectorAll('.activity-item a').forEach((el) => {
          el.title = 'Click for More Information...';
          el.target = '_blank';
          !el.href.includes('https://github.com')
            ? (el.href = el.href.replace(
                `${window.location.origin}`,
                'https://github.com'
              ))
            : null;
        }))
      : null;
  }, [res]);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <style global jsx>
        {`
          .activity-item {
            color: #000;
          }
          a.activity-item:hover {
            color: black;
          }
          .width-full div .d-flex div {
            max-width: 30rem;
          }
          // .Box div {
          //   max-width: 27rem;
          // }
          @me @media (max-width: 575.98px) {
            .body > div {
              flex-direction: column;
            }
            .body > div > div > div > div {
              flex-direction: column-reverse;
            }

            .commits ul {
              padding-inline-start: 0 !important;
              padding-left: 0 !important;
            }
            .commits ul li {
              flex-direction: column;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        `}
      </style>
      <div className="border border-dark my-3 overflow-auto">
        {rssActivityArr.length !== 0 ? (
          rssActivityArr.map(({ link, content }, key) => {
            return (
              <a
                key={key}
                href={link}
                title="Click for More Information..."
                target="_blank"
                className="activity-item text-wrap text-break text-decoration-none">
                {/* //Content */}
                <div
                  className="w-100 border border-dark px-3 px-sm-5 text-decoration-none"
                  dangerouslySetInnerHTML={{
                    __html: `${content}`,
                  }}
                />
              </a>
            );
          })
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
const _RSSFeed = dynamic(() => Promise.resolve(RSSFeed), {
  ssr: false,
});

export default _RSSFeed;
