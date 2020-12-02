import { useState } from 'react';
import { connect } from 'react-redux';
import {NavItem} from './common/';
function SideBar(props) {
  const [showMenuState, setShowMenuState] = useState(true);
  const { session } = props;
  return (
    <div
      className={` ${
        !session.showSidebar ? 'hide' : 'sidebar'
      } d-flex flex-row flex-sm-column border-right border-dark`}>
      <style global jsx>
        {`
          .hide {
            width: 5.5rem;
          }
          .sidebar {
            width: 14rem;
          }
          .sidebar-nav a {
            color: #000;
          }
          .sidebar-menu {
          }
          .sidebar-menu-text {
            cursor: pointer;
          }

          @media screen and (max-width: 576px) {
            .hide {
              width: 5.5rem;
            }
            .sidebar {
              width: 100%;
            }
            .border-right {
              border-right: none !important;
            }
          }

          @media and (min-width: 575px) {
          }
        `}
      </style>
      {session.showSidebar ? (
        <div className={`sidebar-menu d-flex flex-row flex-sm-column`}>
          <p
            title={`Click Me ❤`}
            className={`sidebar-menu-text ml-4 mt-5 border-bottom border-dark`}
            onClick={() => {
              setShowMenuState(!showMenuState);
            }}>
            Menu:
          </p>

          <ul
            className={`${
              !showMenuState ? 'd-none' : ''
            } navbar-nav sidebar-nav mx-auto flex-row flex-sm-column`}>
            <NavItem
              navItemStyle={`border-bottom border-dark w-100`}
              Route={`/wallet/${session.address}`}
              Text={'My Wallet'}
            />
            <NavItem
              navItemStyle={`border-bottom border-dark w-100`}
              Route={'/live'}
              Text={'Live'}
            />
            <NavItem
              navItemStyle={`border-bottom border-dark w-100`}
              Route={'/minecraft'}
              Text={'Minecraft'}
            />
            {/* <NavItem Route={'/swap'} Text={'Swap'} /> */}
            {/* <NavItem Route={'/wallet'} Text={'Wallet'} /> */}
          </ul>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  session: state.session,
});
export default connect(mapStateToProps)(SideBar);
