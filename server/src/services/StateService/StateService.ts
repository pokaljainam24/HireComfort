import State from "../../models/StateModel/StateModel.js";
import Country from "../../models/CountryModel/CountryModel.js";

// =====================================
// Get All States
// =====================================

export const getStateService = async () => {
  try {
    return await State.find().sort({
      name: 1,
    });
  } catch (error) {
    console.error(
      "Get State Service Error:",
      error,
    );

    throw error;
  }
};

// =====================================
// Get States By Country ID
// =====================================

export const getStatesByCountryIdService = async (
  countryId: number,
) => {
  try {
    if (isNaN(Number(countryId))) {
      throw new Error(
        "Valid country ID is required",
      );
    }

    const country = await Country.findOne({
      _id: Number(countryId),
    });

    if (!country) {
      throw new Error("Country not found");
    }

    return await State.find({
      country_id: Number(countryId),
    }).sort({
      name: 1,
    });
  } catch (error) {
    console.error(
      "Get States By Country ID Service Error:",
      error,
    );

    throw error;
  }
};

// =====================================
// Get State By ID
// =====================================

export const getStateByIdService = async (
  stateId: number,
) => {
  try {
    if (isNaN(Number(stateId))) {
      throw new Error(
        "Valid state ID is required",
      );
    }

    return await State.findOne({
      _id: Number(stateId),
    });
  } catch (error) {
    console.error(
      "Get State By ID Service Error:",
      error,
    );

    throw error;
  }
};