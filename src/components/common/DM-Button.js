function DMButton(props) {
  return (
    <button className={props.buttonStyle} onClick={props.onPress}>
      {props.children}
    </button>
  );
}
export default DMButton;
