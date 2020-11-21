import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { login, init } from '../actions';
import UserIcon from './common/UserIcon';
import { MetaMaskButton } from 'rimble-ui';

function LoginButton(props) {
  let { session, login } = props;
  let { address } = session;
  const [addr, setaddrBool] = useState(null);

  useEffect(() => {
    setaddrBool(address.length > 0);
  }, []);

  useEffect(() => {
    if (address) {
      if (address.length > 0) {
        setaddrBool(true);
      } else {
        setaddrBool(false);
      }
    }
  }, [address]);

  return !addr ? (
    <MetaMaskButton
      size="small"
      onClick={() => {
        login();
      }}>
      Connect with MetaMask
    </MetaMaskButton>
  ) : (
    <UserIcon
      id="nav-avatar"
      seed={address}
      userIconStyle={'rounded-circle border border-dark'}
    />
  );
}
const mapStateToProps = (state) => ({
  session: state.session,
});
export default connect(mapStateToProps, { login, init })(LoginButton);
