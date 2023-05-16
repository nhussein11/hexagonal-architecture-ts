import { useForm } from "react-hook-form";
import useModal from "../hooks/useModal";
import { trpc } from "../trpc";
import { Button, Input, Modal } from "./ui";
import { useState } from "react";

type RegisterForm = {
  email: string;
  password: string;
  name: string;
};

const Register = () => {
  const { data, mutate } = trpc.register.useMutation();
  const { register, handleSubmit, reset } = useForm<RegisterForm>();
  const { open, handleModal } = useModal();
  const [showError, setShowError] = useState<boolean>(false);

  const onSubmit = ({ email, password, name }: RegisterForm) => {
    if (!email || !password || !name) {
      setShowError(true);
      return;
    }

    mutate({ email, password, name });
    handleModal();
    reset();
  };

  return (
    <>
      <section className="body-font">
        <h2 className="font-mono font-bold text-3xl text-center">Register</h2>

        <Modal
          open={open}
          onClose={handleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="h-screen flex flex justify-center align-center">
            <div className="flex flex-col items-center justify-center ">
              <div className="mx-5 my-5 px-5 py-5 bg-zinc-600 rounded-lg shadow-xl">
                <h2 className="font-mono font-bold text-3xl text-center ">
                  Register Successful!
                </h2>
                <div className="flex flex-col items-center justify-center">
                  <p className="font-mono font-bold text-3xl text-center ">
                    {data?.name}
                  </p>
                  <p className="font-mono font-bold text-3xl text-center ">
                    {data?.email}
                  </p>
                </div>
                <Button
                  text="Close"
                  onClick={handleModal}
                  className="my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                />
              </div>
            </div>
          </div>
        </Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          {showError && (
            <p className="text-red-500">Please fill out all fields</p>
          )}
          <Button text="Register" type="submit" />
        </form>
      </section>
    </>
  );
};

export default Register;
