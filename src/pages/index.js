import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
const UserInfo = dynamic(() => import('@/components/UserInfo'), { ssr: false });
const Home = ({address}) => (
  <div className="container-xl px-0 pt-5">
    {address.length !== 0 ? (
      <UserInfo address={address} />
    ) : (
      ''
    )}
  </div>
);

const mapStateToProps = (state) => ({
  address: state.session.address,
});

export default connect(mapStateToProps)(Home);
