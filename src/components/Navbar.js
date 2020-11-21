import NavItem from './common/NavItem';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const LoginButton = dynamic(() => import('./LoginButton'), {
  ssr: false,
});
function Navbar(props) {
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top border-bottom border-dark px-4">
      <style jsx>
        {`
          .navbar-brand {
            cursor: pointer;
          }
        `}
      </style>
      <div className="nav-inner d-flex flex-row">
        <a
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            router.push('/');
          }}>
          DEVMOI
        </a>

        <ul className="navbar-nav mr-auto flex-row ">
          <NavItem Route={'/swap'} Text={'Swap'} />
          <NavItem Route={'/wallet'} Text={'Wallet'} />
          <NavItem Route={'/about'} Text={'About'} />
        </ul>
      </div>
      <div className="ml-auto">
        <LoginButton />
      </div>
    </nav>
  );
}

export default Navbar;
