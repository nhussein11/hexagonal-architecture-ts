type InputProps<T> = {
  register: any;
  type: string;
  placeholder: string;
  registerItem: keyof T;
};

const Input = <T,>({
  register,
  type,
  placeholder,
  registerItem,
}: InputProps<T>) => {
  return (
    <div className="relative z-0 w-full mb-6 group">
      <input
        className="block py-2.5 px-0 w-full text-sm text-center text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        type={type}
        placeholder={placeholder}
        {...register(registerItem)}
      />
    </div>
  );
};

export default Input;
