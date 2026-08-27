import { Route, Routes } from "react-router";
import Location from "./pages/Location.tsx";
import Home from "./pages/Home.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/location" element={<Location />} />
    </Routes>
  );
}

export default App;
