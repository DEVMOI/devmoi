import { useState } from 'react';
import DMButton from './common/DMButton';
import DevInput from './DevInput';
function LoginSection(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="d-flex flex-column p-4 pb-5 border border-dark">
      <p className="m-0">Login</p>
      <DevInput
        id="email"
        type="email"
        label={'Email: '}
        value={email}
        placeholder="email@email.com"
        containerStyle="d-flex flex-column"
        labelStyle="py-3"
        onChange={(e) => {
          e.preventDefault();
          setEmail(e.target.value);
        }}
      />
      <DevInput
        id="password"
        type="password"
        label={'Password: '}
        value={password}
        placeholder="password"
        containerStyle="d-flex flex-column"
        labelStyle="py-3"
        onChange={(e) => {
          e.preventDefault();
          setPassword(e.target.value);
        }}
      />
      <DMButton
        buttonStyle={'mt-5'}
        onPress={() => {
          console.log('logged in');
        }}>
        Login
      </DMButton>
    </div>
  );
}
export default LoginSection;
