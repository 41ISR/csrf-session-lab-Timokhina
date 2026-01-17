const Input = ({ value, onChange, className, ...rest }) => {
  const combinedClassName = `основной-класс-поля ${className || ""}`;
  return <input value={value} onChange={onChange} className={combinedClassName} {...rest} />;
}

export default Input