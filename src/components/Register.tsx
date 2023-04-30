import { trpc } from "../trpc";
import { useForm } from "react-hook-form";

type RegisterForm = {
  email: string;
  password: string;
  name: string;
};

const Register = () => {
  const { data, mutate } = trpc.register.useMutation();
  const { register, handleSubmit } = useForm<RegisterForm>();

  const onSubmit = handleSubmit((data) => {
    const { email, password, name } = data;
    mutate({ email, password, name });
  });

  return (
    <form onSubmit={onSubmit}>
      {JSON.stringify(data)}
      <label>Email:</label> <br />
      <input {...register("email")} />
      <label>Password:</label> <br />
      <input {...register("password")} />
      <label>Name:</label> <br />
      <input {...register("name")} />
      <button type="button" onClick={() => onSubmit()}>
        Register
      </button>
    </form>
  );
};

export default Register;
