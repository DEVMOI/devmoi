function DMButton(props) {
  return (
    <button
      className={`btn  ${
        props.buttonStyle !== undefined ? props.buttonStyle : null
      }`}
      onClick={props.onPress}>
      {props.children}
    </button>
  );
}
export default DMButton;
