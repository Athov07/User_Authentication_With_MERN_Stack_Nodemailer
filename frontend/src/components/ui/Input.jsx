const Input = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-600">
        {label}
      </label>
      <input className="input-field" {...props} />
    </div>
  );
};

export default Input;
