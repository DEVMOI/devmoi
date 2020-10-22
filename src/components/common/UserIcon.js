import { useEffect } from 'react';
import { connect } from 'react-redux';
const blockies = require('blockies');

function UserIcon(props) {
  useEffect(() => {
    let addrIcon = document.body.querySelector('#' + props.id);
    if (addrIcon !== null && addrIcon.childNodes.length === 0) {
      let icon = blockies({
        seed: `${props.userAddress}`,
        size: 8,
        scale: props.scale || 3,
      });
      icon.classList.add('rounded-circle');
      icon.classList.add('border');
      icon.classList.add('border-dark');
      icon.title = props.userAddress;
      addrIcon.appendChild(icon);
    }
  }, []);

  return (
    <div
      id={props.id}
      className={
        props.userIconStyle !== undefined
          ? `mt-1 ${props.userIconStyle}`
          : 'mt-1'
      }
    />
  );
}
const mapStateToProps = (state) => ({
  userAddress: state.session.address,
});
export default connect(mapStateToProps, {})(UserIcon);
