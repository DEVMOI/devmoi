import { copyToClipboard } from 'moihelp';
const Minecraft = () => {
  return (
    <div className="minecraft">
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
          .minecraft-ip{
            cursor:pointer;
          }
        `}
      </style>

      <div className="minecraft-background w-100 p-5 mb-5">
        <h4 className="text-capitalize display-4 text-center text-monospace">
          welcome to moia craft
        </h4>
      </div>
      <div className="p-5 d-flex flex-column justify-content-center ">
        <p
          className="lead pt-3 text-center"
          onClick={() => {
            copyToClipboard('minecraft.devmoi.com:25642');
          }}>
          Server IP:{` `}
          <span title="Click to Copy" className="minecraft-ip text-monospace">
            <u>minecraft.devmoi.com:25642</u>
          </span>
        </p>
        <p className="w-75 mx-auto text-justify">
          We host a Minecraft Server for our Community, and open to the public
          as well as all ages, so we ask that you follow a few rules to keep
          things as chill and as fun as possible.
        </p>
        <div className="d-flex flex-column align-content-center mx-auto pt-3">
          <p className="lead mb-0">Server Rules:</p>
          <ol>
            <li>Be Chill</li>
            <li>Don't Cheat</li>
            <li>Don't Grief</li>
            <li>Respect the Mods</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
export default Minecraft;
