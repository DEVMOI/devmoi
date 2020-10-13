import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import MetaMaskOnboarding from '@metamask/onboarding';

import DMButton from './common/DMButton';
import { login, isAuth } from '../actions';
import UserIcon from './common/UserIcon';

function LoginButton(props) {
  const [addr, setaddrBool] = useState(null);
  const onboarding = useRef();
  const { address, eth_status } = props.session;

  useEffect(() => {
    props.isAuth();
  }, []);

  useEffect(() => {
    setaddrBool(address.length > 0);
  }, []);

  useEffect(() => {
    if (!onboarding.current) onboarding.current = new MetaMaskOnboarding();
  }, []);

  useEffect(() => {
    if (eth_status) {
      if (address.length > 0) {
        setaddrBool(true);
        onboarding.current.stopOnboarding();
      } else {
        setaddrBool(false);
      }
    }
  }, [address]);

  return !addr ? (
    <DMButton
      buttonStyle="btn-dark"
      onPress={() => {
        if (eth_status) {
          props.login();
        } else {
          onboarding.current.startOnboarding();
        }
      }}>
      Connect ETH Wallet
    </DMButton>
  ) : (
    <UserIcon id="nav-avatar" />
  );
}
const mapStateToProps = (state) => ({
  session: state.session,
});
export default connect(mapStateToProps, { login, isAuth })(LoginButton);
