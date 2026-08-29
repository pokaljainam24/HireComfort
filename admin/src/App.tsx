import { Route, Routes } from "react-router";
import Location from "./pages/Location.tsx";
import Home from "./pages/Home.tsx";
import JobCategories from "./pages/JobCategories.tsx";

import JobCategoryDetails from "./pages/JobCategoryDetails.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/location" element={<Location />} />
      <Route path="/job-categories" element={<JobCategories />} />
      <Route path="/job-categories/:id" element={<JobCategoryDetails />} />
    </Routes>
  );
}

export default App;
