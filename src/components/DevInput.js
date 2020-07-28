export default function DevInput({
  id,
  type,
  label,
  placeholder,
  onChange,
  labelStyle,
  containerStyle,
}) {
  return (
    <div
      className={`${
        typeof containerStyle !== undefined ? containerStyle : ''
      }`}>
      <label
        htmlFor={id}
        className={`${typeof labelStyle !== undefined ? labelStyle : ''}`}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
