import Layout from '../components/Layout';
import RSSFeed from '../components/RSSFeed';
import { useRouter } from 'next/router';

const Landing = () => {
  
  return (
    <Layout isFluid={true} classes="container-fluid h-100 border border-dark">
      <style jsx>
        {
          `
          .home-rss{
            height: 18.75rem;
            width: 50rem;
          }
          `
        }
      </style>
      <div className="d-flex flex-column align-items-center justify-content-center mx-auto h-100">
        <h1 className="display-3">DEVMOI</h1>
        <h5>A Community of Developers and Content Creators.</h5>

        <br />
        <a className="mb-4" href="https://discord.gg/DnbkrC8" target="_blank">
          <img
            className="border border-dark"
            src="https://img.shields.io/discord/687169639712686097?style=for-the-badge&logo=discord"
            alt="Discord Icon"
          />
        </a>
        <div className={'home-rss'}>
        <RSSFeed/>
        </div>
        {/* <a
          className="btn btn-outline-dark text-uppercase"
          onClick={(e) => {
            e.preventDefault();
            router.push('/activity');
          }}>
          enter
        </a> */}
      </div>
    </Layout>
  );
};
export default Landing;
