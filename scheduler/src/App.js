import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Scheduler from "./Scheduler";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/scheduler" element={<Scheduler />} />
    </Routes>
  );
}

export default App;
