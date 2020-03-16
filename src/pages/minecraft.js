import { Layout } from '../components';
export default () => {
  return (
    <Layout isFluid classes="minecraft h-100 p-0 m-0 w-100">
      <div className="d-flex flex-column h-100">
        <div className="container p-3">
          <h4 className="text-capitalize"> welcome to moia</h4>
          <p className="lead">
            Server IP: <span>moia.ramshard.net</span>
          </p>
          <p>
            We host a MineCraft Server for our Community, and open to the public
            as well as ages so we ask all that play to follow a few rules to
            keep things as chill and as fun as possible.
          </p>
          <p>
            Server Rules:
            <ol>
              <li>Be Chill</li>
              <li>Don't Cheat</li>
              <li>Don't Grief</li>
              <li>Respect the Mods</li>
            </ol>
          </p>
          <a
            className="btn btn-outline-dark"
            href="http://moia.ramshard.net:8123/index.html?worldname=Moia&mapname=flat&zoom=5&x=-25&y=64&z=-526"
            target="_blank"
            rel="noopener noreferrer">
            World Map 🌎
          </a>
        </div>
      </div>
    </Layout>
  );
};
