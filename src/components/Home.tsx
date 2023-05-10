import { Button } from "./ui";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center m-5 gap-3">
        <div className="flex flex-col gap-3">
          <Button
            text="Login"
            type="button"
            onClick={() => navigate("/login")}
          />
          <Button
            text="Register"
            type="button"
            onClick={() => navigate("/register")}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
