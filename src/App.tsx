import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
      <h1>App</h1>
      <div className="App">
        <Register />
        <Login />
      </div>
    </>
  );
}

export default App;
