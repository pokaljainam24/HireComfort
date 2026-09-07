import Country from "../../models/CountryModel/CountryModel.js";

// =====================================
// Get All Countries
// =====================================

export const getCountries = async () => {
  try {
    const countries = await Country.find().sort({
      name: 1,
    });

    return countries;
  } catch (error) {
    console.error("Country Get Service Error:", error);
    throw error;
  }
};

// =====================================
// Get Country By ID
// =====================================

export const getCountryById = async (id: number) => {
  try {
    const country = await Country.findOne({
      id,
    });

    return country;
  } catch (error) {
    console.error("Country Get By ID Service Error:", error);
    throw error;
  }
};