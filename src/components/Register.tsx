import { useForm } from "react-hook-form";
import { trpc } from "../trpc";
import Button from "./ui/Button";

type RegisterForm = {
  email: string;
  password: string;
  name: string;
};

const Register = () => {
  const { data, mutate } = trpc.register.useMutation();
  const { register, handleSubmit } = useForm<RegisterForm>();

  const onSubmit = ({ email, password, name }: RegisterForm) => {
    mutate({ email, password, name });
  };

  return (
    <>
      <h2 className="text-2xl text-center">Register</h2>
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
            {...register("password")}
            placeholder="Password"
          />
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-center text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            {...register("name")}
            placeholder="Name"
          />
        </div>
        <Button text="Register" type="submit" />
      </form>
    </>
  );
};

export default Register;
