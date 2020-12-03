import NavItem from './common/NavItem';
import { useRouter } from 'next/router';
import LoginButton from '@/components/LoginButton';
import { connect } from 'react-redux';
import { toggleSidebar } from '../actions';
function SvGButton(props) {
  let { onPress } = props;
  return (
    <svg
      onClick={onPress !== undefined ? onPress() : null}
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="svg-button bi bi-octagon ml-1 mr-5 fnt-24 rotate fnt-color-000"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <style jsx>
        {`
        svg,
          .svg-button {
            cursor: pointer;
            width:1.5rem;
          }
          .rotate {
            animation: rotation 8s infinite linear;
          }

          @keyframes rotation {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(359deg);
            }
          }
        `}
      </style>
      <path
        fillRule="evenodd"
        d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"
      />
    </svg>
  );
}
function Navbar(props) {
  const router = useRouter();
  const { toggleSidebar, session } = props;
  function handleSidebar() {
    toggleSidebar(!session.showSidebar);
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top border-top border-bottom border-dark px-4">
      <style jsx>
        {`
        .navbar{
          z-index:300;
        }
          .navbar-brand {
            cursor: pointer;
          }

          .rotate {
            animation: rotation 8s infinite linear;
          }

          @keyframes rotation {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(359deg);
            }
          }
        `}
      </style>
      <div className="nav-inner d-flex flex-row align-items-center">
        <SvGButton onPress={() => handleSidebar} />
        <a
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            router.push('/');
          }}>
          DEVMOI
        </a>
      </div>
      <div className="ml-auto">
        <LoginButton />
      </div>
    </nav>
  );
}
const mapStateToProps = (state) => ({
  session: state.session,
});
export default connect(mapStateToProps, { toggleSidebar })(Navbar);
