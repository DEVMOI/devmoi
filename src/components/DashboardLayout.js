import SideNav from './SideNav';

export default ({ isFluid = false, classes, children }) => {
  return (
    <main>
      <style global jsx>{`
        html,
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
      <div
        className={`d-flex flex-row ${
          isFluid ? 'container-fluid pl-0' : 'container'
        } ${classes !== undefined ? classes : ''}`}>
        <SideNav />
        {children}
      </div>
    </main>
  );
};
