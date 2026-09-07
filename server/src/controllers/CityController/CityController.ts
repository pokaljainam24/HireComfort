import type { Request, Response } from "express";

import {
  getCityService,
  getCitiesByStateIdService,
  getCityByIdService,
} from "../../services/CityServices/CityServices.js";

// =====================================
// Get All Cities
// =====================================

export const getCities = async (
  req: Request,
  res: Response,
) => {
  try {
    const cities = await getCityService();

    return res.status(200).json({
      message: "Cities fetched successfully",
      cities,
    });
  } catch (error: any) {
    console.error(
      "Get Cities Controller Error:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to fetch cities",
    });
  }
};

// =====================================
// Get Cities By State ID
// =====================================

export const getCitiesByStateId = async (
  req: Request,
  res: Response,
) => {
  try {
    const { stateId } = req.params;

    if (
      !stateId ||
      typeof stateId !== "string"
    ) {
      return res.status(400).json({
        message: "State ID is required",
      });
    }

    const stateIdNumber = Number(stateId);

    if (isNaN(stateIdNumber)) {
      return res.status(400).json({
        message: "Invalid state ID",
      });
    }

    const cities =
      await getCitiesByStateIdService(
        stateIdNumber,
      );

    return res.status(200).json({
      message: "Cities fetched successfully",
      cities,
    });
  } catch (error: any) {
    console.error(
      "Get Cities By State ID Controller Error:",
      error,
    );

    if (
      error.message === "State not found"
    ) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message:
        error.message ||
        "Failed to fetch cities",
    });
  }
};

// =====================================
// Get City By ID
// =====================================

export const getCity = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "City ID is required",
      });
    }

    const cityId = Number(id);

    if (isNaN(cityId)) {
      return res.status(400).json({
        message: "Invalid city ID",
      });
    }

    const city =
      await getCityByIdService(cityId);

    if (!city) {
      return res.status(404).json({
        message: "City not found",
      });
    }

    return res.status(200).json({
      message: "City fetched successfully",
      city,
    });
  } catch (error: any) {
    console.error(
      "Get City Controller Error:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to fetch city",
    });
  }
};