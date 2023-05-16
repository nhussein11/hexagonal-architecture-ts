import { useNavigate } from "react-router-dom";
import { Button } from "./ui";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="body-font">
        <h2 className="font-mono font-bold text-3xl text-center">Home</h2>
        <div className="container py-8 px-5 m-auto flex flex-col">
          <Button
            text="Login"
            onClick={() => navigate("/login")}
            type="button"
          />
          <Button
            text="Register"
            onClick={() => navigate("/register")}
            type="button"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
