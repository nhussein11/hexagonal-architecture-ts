type ButtonProps = {
  type?: "submit" | "button" | "reset";
  text: string;
  onClick?: () => void;
  className?: string;
};

const buttonDefaultClassName =
  "my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

const Button = ({ text, type, onClick, className }: ButtonProps) => {
  return (
    <button
      type={type}
      className={className ? className : buttonDefaultClassName}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
