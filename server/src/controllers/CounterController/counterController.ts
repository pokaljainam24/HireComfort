import type { Request, Response } from "express";

import {
  createCounterService,
  getCounterService,
  getCounterByIdService,
  getCounterDetailsService,
  getCounterDetailsByIdService,
  getTodayCounterService,
} from "../../services/CounterServices/counterService.js";

// =====================================================
// CREATE COUNTER
// =====================================================

export const createCounter = async (req: Request, res: Response) => {
  try {
    const counter = await createCounterService({
      ...req.body,
    });

    return res.status(201).json({
      message: "Counter created successfully",
      counter,
    });
  } catch (error) {
    console.error("Error creating counter:", error);

    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error creating counter",
    });
  }
};

// =====================================================
// GET COUNTERS
// =====================================================

export const getCounters = async (req: Request, res: Response) => {
  try {
    const counters = await getCounterService();

    return res.status(200).json({
      counters,
    });
  } catch (error) {
    console.error("Error getting counters:", error);

    return res.status(500).json({
      message: "Error getting counters",
    });
  }
};

// =====================================================
// GET COUNTER BY ID
// =====================================================

export const getCounter = async (req: Request, res: Response) => {
  try {
    const counterId = req.params.id;

    if (typeof counterId !== "string") {
      return res.status(400).json({
        message: "Invalid counter ID",
      });
    }

    const counter = await getCounterByIdService(counterId);

    if (!counter) {
      return res.status(404).json({
        message: "Counter not found",
      });
    }

    return res.status(200).json({
      counter,
    });
  } catch (error) {
    console.error("Error getting counter:", error);

    return res.status(500).json({
      message: "Error getting counter",
    });
  }
};

// =====================================================
// GET COUNTER DETAILS
// =====================================================

export const getCounterDetails = async (req: Request, res: Response) => {
  try {
    const counterDetails = await getCounterDetailsService();

    return res.status(200).json({
      counterDetails,
    });
  } catch (error) {
    console.error("Error getting counter details:", error);

    return res.status(500).json({
      message: "Error getting counter details",
    });
  }
};

// =====================================================
// GET COUNTER DETAILS BY ID
// =====================================================

export const getCounterDetail = async (req: Request, res: Response) => {
  try {
    const counterId = req.params.id;

    if (typeof counterId !== "string") {
      return res.status(400).json({
        message: "Invalid counter detail ID",
      });
    }

    const counterDetails = await getCounterDetailsByIdService(counterId);

    if (!counterDetails) {
      return res.status(404).json({
        message: "Counter details not found",
      });
    }

    return res.status(200).json({
      counterDetails,
    });
  } catch (error) {
    console.error("Error getting counter details:", error);

    return res.status(500).json({
      message: "Error getting counter details",
    });
  }
};

// =====================================================
// GET TODAY COUNTER
// =====================================================

export const getTodayCounter = async (req: Request, res: Response) => {
  try {
    const counter = await getTodayCounterService();

    if (!counter) {
      return res.status(404).json({
        message: "Today's counter not found",
      });
    }

    return res.status(200).json({
      counter,
    });
  } catch (error) {
    console.error("Error getting today's counter:", error);

    return res.status(500).json({
      message: "Error getting today's counter",
    });
  }
};
