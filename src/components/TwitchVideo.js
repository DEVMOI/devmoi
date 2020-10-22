const { useEffect, useState } = require('react');
import moifetch from 'moifetch';
function TwitchVideo(props) {
  const isDev = process.env.NODE_ENV === 'development';

  const [twitchUser, setTwitchUser] = useState('moikapy');
  async function getTwitchEmbed() {
    try {
      let livePage = await document.body.querySelector('.js-live');
      let script = await document.createElement('script');
      script.src = 'https://embed.twitch.tv/embed/v1.js';
      await livePage.appendChild(script);
    } catch (error) {}
  }
  useEffect(() => {
    if (isDev) {
      getTwitchEmbed()
        .then(async () => {
          if (typeof Twitch !== undefined) {
            await new Twitch.Embed('twitch-embed', {
              width: '100%',
              height: '100%',
              channel: twitchUser,
              parent: ['www.devmoi.com', 'devmoi.com'],
            });
            console.log('meep');
          }
        })
        .catch(async (error) => {
          console.log('twitch', error);
  
        });
    }
  }, []);
  return (
    <div id="twitch-embed" className="mx-auto w-100 border border-dark">
      <style jsx>
        {`
          #twitch-embed {
            height: 100%;
            max-height: 43.75rem;
          }
        `}
      </style>
      {/* <!-- Load the Twitch embed script --> */}
      {/* <script src="https://embed.twitch.tv/embed/v1.js"></script> */}
    </div>
  );
}

export default TwitchVideo;
