import { trpc } from "../trpc";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const { data, mutate } = trpc.login.useMutation();
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = handleSubmit((data) => {
    const { email, password } = data;
    mutate({ email, password });
  });

  return (
    <form onSubmit={onSubmit}>
      {JSON.stringify(data)}
      <label>Email:</label> <br />
      <input {...register("email")} />
      <label>Password:</label> <br />
      <input {...register("password")} />
      <button type="button" onClick={() => onSubmit()}>
        Login
      </button>
    </form>
  );
};

export default Login;
