const { useEffect, useState } = require('react');
import dynamic from 'next/dynamic';
import moifetch from 'moifetch';
function TwitchVideo(props) {
  const [isLoading, setIsLoading] = useState(true);
  async function getTwitchEmbed() {
    try {
      let livePage = await document.body;
      let script = await document.createElement('script');
      script.src = 'https://embed.twitch.tv/embed/v1.js';
      await livePage.appendChild(script);
    } catch (error) {}
  }
  useEffect(() => {
    getTwitchEmbed();
    setIsLoading(false);
  }, []);
  useEffect(() => {
    // if (isDev) {
    setTimeout(() => {
      if (typeof Twitch !== 'undefined' && isLoading === false) {
        new Twitch.Embed('twitch-embed', {
          width: '100%',
          height: '100%',
          channel: props.user,
          parent: ['www.devmoi.com', 'devmoi.com'],
        });
      }
    }, 500);
    // }
  }, [isLoading]);
  return (
    <div id="twitch-embed" className="mx-auto w-100 border border-dark">
      <style jsx>
        {`
          #twitch-embed {
            height: 100%;
            // max-height: 43.75rem;
          }
        `}
      </style>
      {/* <!-- Load the Twitch embed script --> */}
      {/* <script src="https://embed.twitch.tv/embed/v1.js"></script> */}
    </div>
  );
}
const _TwitchVideo = dynamic(() => Promise.resolve(TwitchVideo), {
  ssr: false,
});
export default _TwitchVideo;
