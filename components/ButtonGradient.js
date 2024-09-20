const ButtonGradient = ({ title, onClick, extraStyle = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow-md transition-transform transform hover:scale-105 ${extraStyle}`}
    >
      {title}
    </button>
  );
};

export default ButtonGradient;
