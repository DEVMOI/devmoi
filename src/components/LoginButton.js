import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { login, init } from '../actions';
import UserIcon from './common/UserIcon';
import { MetaMaskButton } from 'rimble-ui';
import MetaMaskOnboarding from '@metamask/onboarding';
import dynamic from 'next/dynamic';
function LoginButton(props) {
  let { session, login } = props;
  let { address } = session;
  const onboarding = useRef();
  const [addr, setaddrBool] = useState(null);
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);
  useEffect(() => {
    setaddrBool(address.length > 0);
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (address) {
        if (address.length > 0) {
          setaddrBool(true);
          onboarding.current.stopOnboarding();
        } else {
          setaddrBool(false);
        }
      }
    }
  }, [address]);

  return !addr ? (
    <MetaMaskButton
      size="small"
      onClick={() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
          login();
        } else {
          onboarding.current.startOnboarding();
        }
      }}>
      Connect
    </MetaMaskButton>
  ) : (
    <UserIcon
      id="nav-avatar"
      seed={Array.isArray(address) ? address[0] : address}
      userIconStyle={'rounded-circle border border-dark'}
    />
  );
}

const _LoginButton = dynamic(() => Promise.resolve(LoginButton), {
  ssr: false,
});
const mapStateToProps = (state) => ({
  session: state.session,
});
export default connect(mapStateToProps, { login, init })(_LoginButton);
