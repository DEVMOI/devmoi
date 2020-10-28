import { useEffect } from 'react';
import { connect } from 'react-redux';
import Blockies from './blockie';
import { Blockie } from 'rimble-ui';
function UserIcon(props) {
  // useEffect(() => {
  //   let addrIcon = document.body.querySelector('#' + props.id);
  //   console.log(addrIcon);

  //   let icon = blockies.create({
  //     // All options are optional
  //     seed: `${props.address}`, // seed used to generate icon data, default: random
  //     // color: '#dfe', // to manually specify the icon color, default: random
  //     // bgcolor: '#aaa', // choose a different background color, default: random
  //     size: 8, // width/height of the icon in blocks, default: 8
  //     scale: props.scale || 3, // width/height of each block in pixels, default: 4
  //     // spotcolor: '#000', // each pixel has a 13% chance of being of a third color,
  //     // default: random. Set to -1 to disable it. These "spots" create structures
  //     // that look like eyes, mouths and noses.
  //   });
  //   icon.classList.add('rounded-circle');
  //   icon.classList.add('border');
  //   icon.classList.add('border-dark');
  //   icon.title = props.address;
  //   addrIcon.appendChild(icon);
  //   console.log(icon);
  // }, [props.address]);

  return (
    <Blockies
      opts={{
        seed: '0xa8D145Dd3003817dA1DC83F838Ee5088B65Acf2e' || props.address,
        size: 8,
        scale: props.scale || 3,
      }}
    />
  );
  // return (
  //   <div
  //     id={props.id}
  //     className={`w-100 ${
  //       props.userIconStyle !== undefined ? `${props.userIconStyle}` : null
  //     }`}
  //   />
  // );
}
const mapStateToProps = (state) => ({
  address: state.session.address,
});
export default connect(mapStateToProps)(UserIcon);
