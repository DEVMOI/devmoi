import { connect } from 'react-redux';
import { login } from '../actions';
import NavItem from './common/NavItem';
import LoginButton from './LoginButton';
import { useRouter } from 'next/router';

function Navbar(props) {
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top border-bottom border-dark">
      <style jsx>
        {`
          .navbar-brand {
            cursor: pointer;
          }
        `}
      </style>
      <div className="container-md px-0">
        <a
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            router.push('/');
          }}>
          DEVMOI
        </a>

        <ul className="navbar-nav mr-auto flex-row ">
          {/* <NavItem Route={'/activity'} Text={'Activity'} />
          <NavItem Route={'/projects'} Text={'Projects'} />
          <NavItem Route={'/live'} Text={'Live'} /> */}
          <NavItem Route={'/about'} Text={'About'} />
        </ul>
        <div className="ml-auto">
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
