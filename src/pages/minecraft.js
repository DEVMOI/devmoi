import { Layout } from '../components';
import { copyToClipboard } from '../utils';
export default () => {
  return (
    <Layout classes="minecraft h-100 pt-5 px-0 w-100">
      <style>
        {`
          .minecraft{
            color:#000;
            text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
          }
          .minecraft-background{
            background:url('/moia.png') center no-repeat;
            background-size:fit;
          }
        `}
      </style>
      <div className="minecraft-background w-100 p-5 mb-5">
        <h4 className="text-capitalize display-4 text-center text-monospace">
          welcome to moia
        </h4>
      </div>
      <div className="p-5 d-flex flex-column justify-content-center ">
        <p className="lead pt-3">
          Server IP:{` `}
          <span
            title="Click to Copy"
            className="minecraft-ip text-monospace"
            onClick={() => {
              copyToClipboard('moia.ramshard.net');
            }}>
            <u>moia.ramshard.net</u>
          </span>
        </p>
        <p>
          We host a Minecraft Server for our Community, and open to the public
          as well as all ages, so we ask that you follow a few rules to keep
          things as chill and as fun as possible.
        </p>
        <div className="d-flex flex-column align-content-center pt-3">
          <p className="lead mb-0">Server Rules:</p>
          <ol>
            <li>Be Chill</li>
            <li>Don't Cheat</li>
            <li>Don't Grief</li>
            <li>Respect the Mods</li>
          </ol>
        </div>
        <div className="pt-4 w-100">
          <a
            className="btn w-100 btn-outline-dark"
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
