import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
function Live(props) {
  const [twitchUser, setTwitchUser] = useState('moikapy');
  useEffect(() => {
    new Twitch.Embed('twitch-embed', {
      width: '100%',
      height: '100%',
      channel: twitchUser,
      parent: ['www.devmoi.com', 'devmoi.com'],
    });
  }, []);
  return (
    <Layout isFluid>
      <style jsx>
        {`
          #twitch-embed {
            height: 100%;
            max-height: 43.75rem;
          }
        `}
      </style>
      {/* <!-- Add a placeholder for the Twitch embed --> */}
      <div id="twitch-embed" className="mx-auto w-100" />

      {/* <!-- Load the Twitch embed script --> */}
      <script src="https://embed.twitch.tv/embed/v1.js"></script>
    </Layout>
  );
}
export default Live;
