import citiesModel from "../../models/admin/citiesModel.js";
import countriesModel from "../../models/admin/countriesModel.js";
import statesModel from "../../models/admin/statesModel.js";

export async function getAllCities() {
  try {
    const cities = await citiesModel.find({}).lean();
    return cities;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving cities: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while retrieving cities.");
    }
  }
}

export async function getAllStates() {
  try {
    const cities = await statesModel.find({}).lean();
    return cities;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving cities: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while retrieving cities.");
    }
  }
}

export async function getAllCountries() {
  try {
    const cities = await countriesModel.find({}).lean();
    return cities;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving cities: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while retrieving cities.");
    }
  }
}
