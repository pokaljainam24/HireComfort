import { Router } from "express";
import {
  createCity,
  createCountry,
  createState,
  deleteCity,
  deleteCountry,
  deleteState,
  getCities,
  getCountries,
  getStates,
  updateCity,
  updateCountry,
  updateState,
} from "../controllers/admin/locationController.js";

const router = Router();

// router.get("/recruiters");
// router.get("/recruiters/:id");
// router.post("/recruiters");
// router.patch("/recruiters/:id");
// router.delete("/recruiters/:id");

// router.get("/applicants");
// router.get("/applicants/:id");
// router.delete("/applicants/:id");

// router.get("/jobs");
// router.get("/jobs/:id");
// router.delete("/jobs/:id");

// router.get("/applications");
// router.get("/applications/:id");

// router.get("/interviews");
// router.get("/interviews/:id");

// router.get("/companies");
// router.get("/companies/:id");

// Location management routes
router.get("/countries", getCountries);
router.get("/states", getStates);
router.get("/cities", getCities);
router.post("/countries", createCountry);
router.post("/states", createState);
router.post("/cities", createCity);
router.patch("/countries/:id", updateCountry);
router.patch("/states/:id", updateState);
router.patch("/cities/:id", updateCity);
router.delete("/countries/:id", deleteCountry);
router.delete("/states/:id", deleteState);
router.delete("/cities/:id", deleteCity);

// router.get("job-categories");
// router.get("job-categories/:id");
// router.post("job-categories");
// router.patch("job-categories/:id");
// router.delete("job-categories/:id");
// router.get("job-subcategories");
// router.get("job-subcategories/:id");
// router.post("job-subcategories");
// router.patch("job-subcategories/:id");
// router.delete("job-subcategories/:id");

export default router;
