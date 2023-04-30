import { useState } from "react";
import { trpc } from "../trpc";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const { data, mutate } = trpc.register.useMutation();

  const submitHandler = (e: any): void => {
    e.preventDefault();
    console.log(email, password, name);
    mutate({ email, password, name });
  };

  return (
    <div>
      <h1>Register</h1>
      {JSON.stringify(data)}
      <form>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit" onClick={submitHandler}>
          {" "}
          Register{" "}
        </button>
      </form>
    </div>
  );
};

export default Register;
