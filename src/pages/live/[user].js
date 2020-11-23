import { useRouter } from 'next/router';
import TwitchVideo from '@/components/TwitchVideo';
function Live(props) {
  const router = useRouter();
  const user = router.query.user || '';
  return (
    <div className={`h-100`}>
      {/* <!-- Twitch Video */}
      {user.length!==0?<TwitchVideo user={user} />:<div/>}
    </div>
  );
}
export default Live;
