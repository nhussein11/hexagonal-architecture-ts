import { trpc } from "../trpc";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const { data, mutate } = trpc.login.useMutation();
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = ({ email, password }: LoginForm) => {
    mutate({ email, password });
  };

  return (
    <>
      <h2 className="text-xl text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {JSON.stringify(data)}
        <div className="relative z-0 w-full mb-6 group">
          <input
            className="block py-2.5 px-0 w-full text-sm text-center text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            {...register("email")}
            placeholder="Email: "
          />
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            className="block py-2.5 px-0 w-full text-sm text-center text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
