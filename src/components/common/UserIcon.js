import { connect } from 'react-redux';
import Blockies from './blockie';
const UserIcon = (props) => (
  <Blockies
    canvasStyle={props.userIconStyle !== undefined ? props.userIconStyle : ''}
    opts={{
      seed: props.seed || 'foo',
      size: props.size || 6,
      scale: props.scale || 3,
    }}
  />
);

const mapStateToProps = (state) => ({
  seed: state.session.address,
});
export default connect(mapStateToProps)(UserIcon);
