import { GoHome } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div style={{ cursor: "pointer", width: "min-content" }}>
          <GoHome size={30} onClick={() => navigate("/")} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
