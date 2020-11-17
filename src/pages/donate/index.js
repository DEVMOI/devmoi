import dynamic from 'next/dynamic';
const teamMembers = [
  {
    seed: '0xa8d145dd3003817da1dc83f838ee5088b65acf2e',
    role: 'Lead Developer',
  },
];
const TeamCard = dynamic(() => import('@/components/TeamCard'), {
  ssr: false,
});
function Donate() {
  return (
    <div className={'h-100'}>
      <TeamCard seed={teamMembers[0].seed} role={teamMembers[0].role} />
    </div>
  );
}
export default Donate;
