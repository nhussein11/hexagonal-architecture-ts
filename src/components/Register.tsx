import { useForm } from "react-hook-form";
import { trpc } from "../trpc";
import { Button, Input } from "./ui";

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
        <Input<RegisterForm>
          type="text"
          placeholder="Email: "
          registerItem="email"
          register={register}
        />
        <Input<RegisterForm>
          type="password"
          placeholder="Password: "
          registerItem="password"
          register={register}
        />
        <Input<RegisterForm>
          type="text"
          placeholder="Name: "
          registerItem="name"
          register={register}
        />
        <Button text="Register" type="submit" />
      </form>
    </>
  );
};

export default Register;
