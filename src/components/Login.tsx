import { useForm } from "react-hook-form";
import { trpc } from "../trpc";
import { Button, Input } from "./ui";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const { data, mutate } = trpc.login.useMutation();
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = ({ email, password }: LoginForm) => {
    console.log(email, password);
    mutate({ email, password });
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <h2 className="text-2xl text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {JSON.stringify(data)}
          <Input<LoginForm>
            type="text"
            placeholder="Email: "
            registerItem="email"
            register={register}
          />
          <Input<LoginForm>
            type="password"
            placeholder="Password: "
            registerItem="password"
            register={register}
          />
          <Button text="Login" type="submit" />
        </form>
      </section>
    </>
  );
};

export default Login;
