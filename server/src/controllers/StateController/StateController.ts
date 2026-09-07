import type { Request, Response } from "express";

import {
  getStateService,
  getStatesByCountryIdService,
  getStateByIdService,
} from "../../services/StateService/StateService.js";

// =====================================
// Get All States
// =====================================

export const getStates = async (
  req: Request,
  res: Response,
) => {
  try {
    const states = await getStateService();

    return res.status(200).json({
      message: "States fetched successfully",
      states,
    });
  } catch (error: any) {
    console.error(
      "Get States Controller Error:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to fetch states",
    });
  }
};

// =====================================
// Get States By Country ID
// =====================================

export const getStatesByCountryId = async (
  req: Request,
  res: Response,
) => {
  try {
    const { countryId } = req.params;

    if (
      !countryId ||
      typeof countryId !== "string"
    ) {
      return res.status(400).json({
        message: "Country ID is required",
      });
    }

    const countryIdNumber = Number(countryId);

    if (isNaN(countryIdNumber)) {
      return res.status(400).json({
        message: "Invalid country ID",
      });
    }

    const states =
      await getStatesByCountryIdService(
        countryIdNumber,
      );

    return res.status(200).json({
      message: "States fetched successfully",
      states,
    });
  } catch (error: any) {
    console.error(
      "Get States By Country ID Controller Error:",
      error,
    );

    if (
      error.message === "Country not found"
    ) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message:
        error.message ||
        "Failed to fetch states",
    });
  }
};

// =====================================
// Get State By ID
// =====================================

export const getState = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "State ID is required",
      });
    }

    const stateId = Number(id);

    if (isNaN(stateId)) {
      return res.status(400).json({
        message: "Invalid state ID",
      });
    }

    const state =
      await getStateByIdService(stateId);

    if (!state) {
      return res.status(404).json({
        message: "State not found",
      });
    }

    return res.status(200).json({
      message: "State fetched successfully",
      state,
    });
  } catch (error: any) {
    console.error(
      "Get State Controller Error:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to fetch state",
    });
  }
};