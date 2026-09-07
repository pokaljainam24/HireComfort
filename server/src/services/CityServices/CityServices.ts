import City from "../../models/CityModel/CityModel.js";
import State from "../../models/StateModel/StateModel.js";

// =====================================
// Get All Cities
// =====================================

export const getCityService = async () => {
  try {
    return await City.find().sort({
      name: 1,
    });
  } catch (error) {
    console.error(
      "Get City Service Error:",
      error,
    );

    throw error;
  }
};

// =====================================
// Get Cities By State ID
// =====================================

export const getCitiesByStateIdService = async (
  stateId: number,
) => {
  try {
    if (isNaN(Number(stateId))) {
      throw new Error(
        "Valid state ID is required",
      );
    }

    const state = await State.findOne({
      _id: Number(stateId),
    });

    if (!state) {
      throw new Error("State not found");
    }

    return await City.find({
      state_id: Number(stateId),
    }).sort({
      name: 1,
    });
  } catch (error) {
    console.error(
      "Get Cities By State ID Service Error:",
      error,
    );

    throw error;
  }
};

// =====================================
// Get City By ID
// =====================================

export const getCityByIdService = async (
  cityId: number,
) => {
  try {
    if (isNaN(Number(cityId))) {
      throw new Error(
        "Valid city ID is required",
      );
    }

    return await City.findOne({
      _id: Number(cityId),
    });
  } catch (error) {
    console.error(
      "Get City By ID Service Error:",
      error,
    );

    throw error;
  }
};