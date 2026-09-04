import express from "express";

import {
  createCounter,
  getCounters,
  getCounter,
  getCounterDetails,
  getCounterDetail,
  getTodayCounter,
} from "../../controllers/CounterController/counterController.js";

const counterRoutes = express.Router();

// Create visitor + update counter
counterRoutes.post("/", createCounter);

// Get all daily counters
counterRoutes.get("/", getCounters);

// Get today's counter
counterRoutes.get("/today", getTodayCounter);

// Get all visitor details
counterRoutes.get("/details", getCounterDetails);

// Get visitor detail by ID
counterRoutes.get("/details/:id", getCounterDetail);

// Get daily counter by ID
counterRoutes.get("/:id", getCounter);

export default counterRoutes;
