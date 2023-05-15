type ButtonProps = {
  type?: "submit" | "button" | "reset";
  text: string;
  onClick?: () => void;
};

const Button = ({ text, type, onClick }: ButtonProps) => {
  const buttonClassName =
    "my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  return (
    <button type={type} className={buttonClassName} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
