import { connect } from 'react-redux';

import EthWalletCard from '@/components/EthWalletCard';

function Wallet(props) {
  let { showIcon, seed, role } = props;
  let { address } = props.session;
  return (
    <div className={'wallet'}>
      <EthWalletCard
        showIcon={showIcon}
        seed={
          (seed !== undefined &&seed.length) !== 0
            ? seed
            : address.length !== 0
            ? address
            : process.env.ADMIN_ID
        }
        role={
          process.env.ADMIN_ID === address ? 'LEAD DEVELOPER' : 'ETH Wallet'
        }
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
  session: state.session,
});
export default connect(mapStateToProps)(Wallet);
