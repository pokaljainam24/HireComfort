import { Route, Routes } from "react-router";
import Location from "./pages/Location.tsx";
import Home from "./pages/Home.tsx";
import JobCategories from "./pages/JobCategories.tsx";

import JobCategoryDetails from "./pages/JobCategoryDetails.tsx";
import Recruiters from "./pages/Recruiters.tsx";
import RecruiterDetails from "./pages/RecruiterDetails.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/location" element={<Location />} />
      <Route path="/job-categories" element={<JobCategories />} />
      <Route path="/job-categories/:id" element={<JobCategoryDetails />} />
      <Route path="/recruiters" element={<Recruiters />} />
      <Route path="/recruiters/:id" element={<RecruiterDetails />} />
    </Routes>
  );
}

export default App;
