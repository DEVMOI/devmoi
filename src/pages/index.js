import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
const UserInfo = dynamic(() => import('@/components/UserInfo'), { ssr: false });
const Home = ({ address }) => (
  <div className="home">
    <div>
      <p className={`h3`}>
        Welcome{' '}
        <span className={`address`}>
          {address !== null && address !== undefined && address.length !== 0
            ? address
            : 'To Devmoi'}
        </span>
        ,
      </p>
      <p></p>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  address: state.session.address,
});

export default connect(mapStateToProps)(Home);
