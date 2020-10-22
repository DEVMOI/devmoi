export default function MoiText(props) {
  const {
    placeholder,
    maxLength,
    containerStyle,
    textAreaStyle,
    onKeyPress,
    onChange,
    value,
  } = props;

  return (
    <div className={`${containerStyle !== undefined ? containerStyle : ''}`}>
      <style jsx>
        {`
          textarea {
            resize: none;
            border: none;
            outline: none;
          }
        `}
      </style>
      <textarea
        className={`w-100 h-100 ${
          textAreaStyle !== undefined ? textAreaStyle : ''
        }`}
        onChange={onChange}
        onKeyPress={onKeyPress !== undefined ? onKeyPress : null}
        value={value}
        placeholder={placeholder || '❤'}
        maxLength={maxLength !== undefined ? maxLength : null}
      />
    </div>
  );
}
