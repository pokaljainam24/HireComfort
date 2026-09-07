import type { Request, Response } from "express";

import {
  getCountries,
  getCountryById,
} from "../../services/CountryServices/countryServices.js";

// =====================================
// Get All Countries
// =====================================

export const getCountriesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const countries = await getCountries();

    return res.status(200).json({
      message: "Countries fetched successfully",
      countries,
    });
  } catch (error: any) {
    console.error(
      "Get Countries Controller Error:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to fetch countries",
    });
  }
};

// =====================================
// Get Country By ID
// =====================================

export const getCountry = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "Country ID is required",
      });
    }

    const countryId = Number(id);

    if (isNaN(countryId)) {
      return res.status(400).json({
        message: "Invalid country ID",
      });
    }

    const country = await getCountryById(countryId);

    if (!country) {
      return res.status(404).json({
        message: "Country not found",
      });
    }

    return res.status(200).json({
      message: "Country fetched successfully",
      country,
    });
  } catch (error: any) {
    console.error(
      "Get Country Controller Error:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to fetch country",
    });
  }
};