import RSSFeed from '@/components/RSSFeed';
// import TeamCard from '@/components/TeamCard'
import dynamic from 'next/dynamic';
const TeamCard = dynamic(() => import('@/components/TeamCard'), {
  ssr: false,
});
const About = () => (
  <div className="d-flex flex-column align-items-center justify-content-center mx-auto h-100">
    <style jsx>
      {`
        .about-rss {
          height: 18.75rem;
          width: 50rem;
        }
      `}
    </style>

    <h1 className="display-3">DEVMOI</h1>
    <h5>A Community of Developers and Content Creators.</h5>
    <br />
    <a className="mb-5" href="https://discord.gg/DnbkrC8" target="_blank">
      <img
        className="border border-dark"
        src="https://img.shields.io/discord/687169639712686097?style=for-the-badge&logo=discord"
        alt="Discord Icon"
      />
    </a>
    <TeamCard
      seed={'0xa8d145dd3003817da1dc83f838ee5088b65acf2e'}
      role="Lead Developer"
    />
    <div className={'about-rss mt-5'}>
      <RSSFeed />
    </div>
  </div>
);

export default About;
