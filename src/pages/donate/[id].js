import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const TeamCard = dynamic(() => import('@/components/TeamCard'), {
  ssr: false,
});
function Donate(props) {
  const router = useRouter();
  const id = router.query.id || '';
  return (
    <div className={'h-100'}>
      <TeamCard showIcon={false} seed={id} role={'ETH User'} />
    </div>
  );
}
export default Donate;
