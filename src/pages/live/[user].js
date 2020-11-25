import { useRouter } from 'next/router';
import _Live from './index';
function Live(props) {
  const router = useRouter();
  const user = router.query.user || '';
  return user.length !== 0 ? <_Live user={user} /> : <div />;
}
export default Live;
