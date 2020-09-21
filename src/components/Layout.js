import { useEffect } from 'react';

import Navbar from './Navbar';
const Layout = ({ isFluid = false, classes, children }) => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // window !== undefined
    //   ? window.location.pathname == '/'
    //     ? document.querySelector('.navbar').classList.add('d-none')
    //     : null
    //   : null;
  });

  return (
    <div className="layout">
      <style global jsx>{`
        html,
        body,
        #__next {
          height: 100%;
        }
        .layout,
        main {
          height: calc(100% - 3.5625rem);
        }
        .fnt-size-12 {
          font-size: 12px;
        }
        .fnt-color-000 {
          color: #000 !important;
        }
        .list-style-none {
          list-style: none !important;
        }
        .text-decoration-none {
          text-decoration: none !important;
        }
      `}</style>
      <Navbar />
      <main
        className={`${isFluid ? 'container-fluid' : 'container'} ${
          classes !== undefined ? classes : null
        }`}>
        {children}
      </main>
    </div>
  );
};
export default Layout;
