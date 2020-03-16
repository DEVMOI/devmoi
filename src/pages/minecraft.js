import { Layout } from '../components';
export default () => {
  return (
    <Layout isFluid classes="minecraft h-100 p-0 m-0 w-100">
      <div className="d-flex flex-column h-100">
        <ul className="nav nav-tabs" id="mctabs" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true">
              Server Info
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false">
              Map
            </a>
          </li>
        </ul>
        <div className="tab-content h-100" id="mctabconteny">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab">
            <div className="container mx-2 p-3">
              <h4 className="text-capitalize"> welcome to moia</h4>
              <p className="lead">
                Server IP: <span>moia.ramshard.net</span>
              </p>
              <p>
                We host a MineCraft Server for our Community, but allow it to be
                open to the public and to all ages so we ask all that play to
                follow a few rules to keep things as chill and as fun as
                possible.
              </p>
              <p>
                Server Rules:
                <ol>
                  <li>Be Chill</li>
                  <li>Respect the Mods</li>
                  <li>Don't Cheat</li>
                </ol>
              </p>
            </div>
          </div>
          <div
            className="tab-pane fade h-100"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab">
            <iframe
              className="p-0 w-100 h-100"
              src="https://tinyurl.com/wvduqbf"
              frameBorder="0"></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};
