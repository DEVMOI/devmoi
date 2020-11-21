import { connect } from 'react-redux';
import Blockies from './blockie';
const UserIcon = (props) => {
  return (
    <Blockies
      canvasStyle={props.userIconStyle !== undefined ? props.userIconStyle : ''}
      opts={{
        seed: props.seed || 'foo',
        size: props.size || 5,
        scale: props.scale || 5,
      }}
    />
  );
};

export default UserIcon;
