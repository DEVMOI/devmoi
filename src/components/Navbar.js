function Navbar(props) {
  function NavItem(props) {
    return (
      <li className="nav-item active">
        <a className="nav-link" href={props.Route}>
          {props.Text}
        </a>
      </li>
    );
  }
  return (
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
            <NavItem Route={'/activity'} Text={'Activity'} />
            <NavItem Route={'/projects'} Text={'Projects'} />
            <NavItem Route={'/live'} Text={'Live'} />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
