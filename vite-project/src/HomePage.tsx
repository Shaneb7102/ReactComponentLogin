import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
    <h2>Think-Thank Research Centre</h2>
    <form>
      
      <button type="submit">Login</button>
      <button type="submit">Register</button>

    </form>
  </div>

    </>
  );
}

export default App;
