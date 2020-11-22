import { useRouter } from 'next/router';
import _Live from'./index'
function Live(props) {
  const router = useRouter();
  const user = router.query.user;
  console.log(router.query.user);
  return <_Live user={user}/>
}
export default Live;
