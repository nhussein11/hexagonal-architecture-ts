import { useState } from "react";
import { trpc } from "../trpc";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate } = trpc.login.useMutation();

  const submitHandler = (e: any): void => {
    e.preventDefault();
    console.log(email, password);
    mutate({ email, password });
  };

  return (
    <div>
      <h1>Login</h1>
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

        <button type="submit" onClick={submitHandler}>
          {" "}
          Login{" "}
        </button>
      </form>
    </div>
  );
};

export default Login;
