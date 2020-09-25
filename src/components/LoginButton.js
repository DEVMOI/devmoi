import DMButton from './common/DM-Button';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import UserIcon from './common/UserIcon';

function LoginButton(props) {
  const [addr, setaddrBool] = useState(null);
  useEffect(() => {
    setaddrBool(props.authReducer.address !== null);
  }, [props.authReducer.address]);

  return !addr ? (
    <DMButton
      onPress={() => {
        props.login();
      }}>
      Login w/ MetaMask
    </DMButton>
  ) : (
    <UserIcon id="nav-avatar" />
  );
}
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, { login })(LoginButton);
