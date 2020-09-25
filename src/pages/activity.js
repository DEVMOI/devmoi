import { Layout } from '../components';
import RSSFeed from '../components/RSSFeed';

const Activity = ({ isServer }) => {
  return (
    <Layout classes="pt-3 h-100">
      <RSSFeed/>
    </Layout>
  );
};
export default Activity;
