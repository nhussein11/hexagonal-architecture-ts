import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Login, Register } from "./components";

const App = () => {
  return (
    <>
      <div>
        <div className="flex justify-center m-5 gap-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
