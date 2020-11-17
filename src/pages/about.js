import RSSFeed from '@/components/RSSFeed';
import { Link } from 'rimble-ui';
import { useRouter } from 'next/router';

const About = () => {
  const router = useRouter();
  return (
    <div className="d-flex flex-column">
      <style jsx>
        {`
          .about-rss {
            // max-height: 40.625rem;
            // height: 100%;
          }
        `}
      </style>
      <div className="d-flex flex-column col">
        <p className={'h5'}>
          A Community of Gamers, Developers, Content Creators, and Crypto
          Enthusiasts.
        </p>

        <Link
          className="my-5 mr-auto"
          title="Go To Community Discord"
          href="https://discord.gg/DnbkrC8"
          target="_blank">
          <img
            className="border border-dark"
            src="https://img.shields.io/discord/687169639712686097?style=for-the-badge&logo=discord"
            alt="Discord Icon"
          />
        </Link>
        <Link
          className=" mr-auto"
          onClick={(e) => {
            e.preventDefault();
            router.push('/team');
          }}
          target="_blank"
          title="Go To Team Page">
          Meet The Team
        </Link>
      </div>

      <div className={'about-rss mt-5 col overflow-scroll'}>
        <RSSFeed />
      </div>
    </div>
  );
};

export default About;
