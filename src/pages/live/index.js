import TwitchVideo from '@/components/TwitchVideo';
function Live(props) {
  return (
    <div className={`h-100`}>
      {/* <!-- Twitch Video */}
      {<TwitchVideo user={props.user||'moikapy'}/>}
    </div>
  );
}
export default Live;
