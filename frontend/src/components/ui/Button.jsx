const Button = ({ children, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`btn-primary ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
