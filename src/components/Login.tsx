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
    <form onSubmit={handleSubmit(onSubmit)}>
      {JSON.stringify(data)}
      <label>Email:</label> <br />
      <input {...register("email")} />
      <label>Password:</label> <br />
      <input {...register("password")} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
