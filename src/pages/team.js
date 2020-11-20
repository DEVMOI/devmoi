
import EthWalletCard from '@/components/EthWalletCard';
const teamMembers = [
  {
    seed: '0xa8d145dd3003817da1dc83f838ee5088b65acf2e',
    role: 'Lead Developer',
  },
];
function Team(props) {
  return (
    <div className={'h-100'}>
      {teamMembers.map(({ seed, role }, key) => (
        <EthWalletCard seed={seed} role={role} key={key} />
      ))}
    </div>
  );
}
export default Team;
