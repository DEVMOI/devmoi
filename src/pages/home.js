import { Layout } from '../components';
import { useState, useEffect } from 'react';
import moifetch from 'moifetch';
import Parser from 'rss-parser';

export async function getServerSideProps() {
  const res = await moifetch.GET(
    'https://github.com/organizations/DEVMOI/Moikapy.private.atom?token=AELYH7GAXWBCUCRPWXFR3CN5DSMQE'
  );
  const data = await res;
  return {
    props: {
      res: data,
    },
  };
}
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

export default ({ res }) => {
  const [rssActivityArr, setData] = useState([]);
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
    <Layout classes="pt-3 h-100">
      <div className="d-flex flex-column h-100">
        <style global jsx>
          {`
            .activity-item {
              color: #000;
            }
            a.activity-item:hover {
              color: black;
            }
            .width-full div .d-flex div {
              max-width: 25rem;
            }
            @media (max-width: 575.98px) {
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
        <h3>Activity Feed:</h3>
        <div className="border border-dark my-3 overflow-auto">
          {rssActivityArr.map(({ link, content }, key) => {
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
          })}
        </div>
      </div>
    </Layout>
  );
};
