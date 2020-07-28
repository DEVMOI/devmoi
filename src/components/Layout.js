import { useEffect } from 'react';
export default ({ isFluid = false, classes, children }) => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    window !== undefined
      ? window.location.pathname == '/'
        ? document.querySelector('.navbar').classList.add('d-none')
        : null
      : null;
  });

  return (
    <div className='h-100'>
      <style global jsx>{`
        html {
          height: calc(100% - 3.5625rem);
        }
        body,
        #__next,
        main {
          height: 100%;
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top border-bottom border-dark">
        <div className="container-md px-0">
          <a className="navbar-brand" href="/">
            DEVMOI
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/home">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/projects">
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/minecraft">
                  Minecraft
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main
        className={`${isFluid ? 'container-fluid' : 'container'} ${
          classes !== undefined ? classes : null
        }`}>
        {children}
      </main>
    </div>
  );
};
export default Layout