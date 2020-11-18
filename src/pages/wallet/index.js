import dynamic from 'next/dynamic';
import { connect } from 'react-redux';

const TeamCard = dynamic(() => import('@/components/TeamCard'), {
  ssr: false,
});

function Wallet(props) {
  let { address } = props.session;
  return (
    <div className={'wallet'}>
      <TeamCard
        seed={address.length !== 0 ? address : process.env.ADMIN_ID}
        role={
          process.env.ADMIN_ID !== address ? 'LEAD DEVELOPER' : 'ETH Wallet'
        }
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
  session: state.session,
});
export default connect(mapStateToProps)(Wallet);
