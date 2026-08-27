import { Route, Routes } from "react-router";
import Location from "./pages/Location.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/location" element={<Location />} />
    </Routes>
  );
}

export default App;
