import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const TeamCard = dynamic(() => import('@/components/TeamCard'), {
  ssr: false,
});
function Wallet(props) {
  const router = useRouter();
  const id = router.query.id || '';
  return (
    <div className={'h-100'}>
      <style jsx>
        {`
          .error-msg {
            left: 0;
            right: 0;
          }
        `}
      </style>
      {id.substring(0,2)==='0x' && id.length === 42 ? (
        <TeamCard showIcon={false} seed={id} role={'ETH WALLET'} />
      ) : (
        <p
          className={`error-msg position-absolute mx-auto text-uppercase text-center`}>
          Wallet Doesn't Exist
        </p>
      )}
    </div>
  );
}
export default Wallet;
