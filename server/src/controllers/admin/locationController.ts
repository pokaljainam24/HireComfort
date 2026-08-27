import type { Request, Response } from "express";
import { Types } from "mongoose";
import citiesModel from "../../models/admin/citiesModel.js";
import countriesModel from "../../models/admin/countriesModel.js";
import statesModel from "../../models/admin/statesModel.js";

const sendError = (
  res: Response,
  message: string,
  error: unknown,
  status = 500,
) => res.status(status).json({ message, error });

const isDuplicateKeyError = (error: unknown) =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  error.code === 11000;

const getId = (req: Request) => {
  const id = req.params.id;
  return typeof id === "string" && Types.ObjectId.isValid(id)
    ? new Types.ObjectId(id)
    : null;
};

const getQueryId = (value: unknown) =>
  typeof value === "string" && Types.ObjectId.isValid(value)
    ? new Types.ObjectId(value)
    : null;

export const getCountries = async (_req: Request, res: Response) => {
  try {
    const countries = await countriesModel.find().sort({ name: 1 }).lean();
    return res.status(200).json({ countries });
  } catch (error) {
    return sendError(res, "Error retrieving countries", error);
  }
};

export const getStates = async (req: Request, res: Response) => {
  try {
    const countryId = getQueryId(req.query.countryId);
    if (req.query.countryId && !countryId)
      return res.status(400).json({ message: "Invalid countryId" });
    // TODO: Reeveluate to send all the states if the countryId is empty.
    const filter = countryId ? { countryId } : {};
    const states = await statesModel.find(filter).sort({ name: 1 }).lean();
    return res.status(200).json({ states });
  } catch (error) {
    return sendError(res, "Error retrieving states", error);
  }
};

export const getCities = async (req: Request, res: Response) => {
  try {
    const stateId = getQueryId(req.query.stateId);
    if (req.query.stateId && !stateId)
      return res.status(400).json({ message: "Invalid stateId" });
    const filter = stateId ? { stateId } : {};
    const cities = await citiesModel.find(filter).sort({ name: 1 }).lean();
    return res.status(200).json({ cities });
  } catch (error) {
    return sendError(res, "Error retrieving cities", error);
  }
};

export const createCountry = async (req: Request, res: Response) => {
  try {
    const country = await countriesModel.create(req.body);
    return res
      .status(201)
      .json({ message: "Country created successfully", country });
  } catch (error) {
    return sendError(
      res,
      isDuplicateKeyError(error)
        ? "Country code already exists"
        : "Error creating country",
      error,
      isDuplicateKeyError(error) ? 409 : 400,
    );
  }
};

export const createState = async (req: Request, res: Response) => {
  try {
    const countryExists = await countriesModel.exists({
      _id: req.body.countryId,
    });
    if (!countryExists)
      return res.status(400).json({ message: "Country not found" });

    const state = await statesModel.create(req.body);
    return res
      .status(201)
      .json({ message: "State created successfully", state });
  } catch (error) {
    return sendError(
      res,
      isDuplicateKeyError(error)
        ? "State code already exists"
        : "Error creating state",
      error,
      isDuplicateKeyError(error) ? 409 : 400,
    );
  }
};

export const createCity = async (req: Request, res: Response) => {
  try {
    const stateExists = await statesModel.exists({ _id: req.body.stateId });
    if (!stateExists)
      return res.status(400).json({ message: "State not found" });

    const city = await citiesModel.create(req.body);
    return res.status(201).json({ message: "City created successfully", city });
  } catch (error) {
    return sendError(
      res,
      isDuplicateKeyError(error)
        ? "City code already exists"
        : "Error creating city",
      error,
      isDuplicateKeyError(error) ? 409 : 400,
    );
  }
};

export const updateCountry = async (req: Request, res: Response) => {
  try {
    const id = getId(req);
    if (!id) return res.status(400).json({ message: "Invalid country id" });
    const country = await countriesModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return country
      ? res
          .status(200)
          .json({ message: "Country updated successfully", country })
      : res.status(404).json({ message: "Country not found" });
  } catch (error) {
    return sendError(
      res,
      "Error updating country",
      error,
      isDuplicateKeyError(error) ? 409 : 400,
    );
  }
};

export const updateState = async (req: Request, res: Response) => {
  try {
    const id = getId(req);
    if (!id) return res.status(400).json({ message: "Invalid state id" });
    const countryId = req.body.countryId
      ? getQueryId(req.body.countryId)
      : null;
    if (
      req.body.countryId &&
      (!countryId || !(await countriesModel.exists({ _id: countryId })))
    ) {
      return res.status(400).json({ message: "Country not found" });
    }
    const state = await statesModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return state
      ? res.status(200).json({ message: "State updated successfully", state })
      : res.status(404).json({ message: "State not found" });
  } catch (error) {
    return sendError(
      res,
      "Error updating state",
      error,
      isDuplicateKeyError(error) ? 409 : 400,
    );
  }
};

export const updateCity = async (req: Request, res: Response) => {
  try {
    const id = getId(req);
    if (!id) return res.status(400).json({ message: "Invalid city id" });
    const stateId = req.body.stateId ? getQueryId(req.body.stateId) : null;
    if (
      req.body.stateId &&
      (!stateId || !(await statesModel.exists({ _id: stateId })))
    ) {
      return res.status(400).json({ message: "State not found" });
    }
    const city = await citiesModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return city
      ? res.status(200).json({ message: "City updated successfully", city })
      : res.status(404).json({ message: "City not found" });
  } catch (error) {
    return sendError(
      res,
      "Error updating city",
      error,
      isDuplicateKeyError(error) ? 409 : 400,
    );
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  try {
    const id = getId(req);
    if (!id) return res.status(400).json({ message: "Invalid country id" });
    if (await statesModel.exists({ countryId: id })) {
      return res
        .status(409)
        .json({ message: "Delete the country's states first" });
    }
    const country = await countriesModel.findByIdAndDelete(id);
    return country
      ? res.status(200).json({ message: "Country deleted successfully" })
      : res.status(404).json({ message: "Country not found" });
  } catch (error) {
    return sendError(res, "Error deleting country", error, 400);
  }
};

export const deleteState = async (req: Request, res: Response) => {
  try {
    const id = getId(req);
    if (!id) return res.status(400).json({ message: "Invalid state id" });
    if (await citiesModel.exists({ stateId: id })) {
      return res
        .status(409)
        .json({ message: "Delete the state's cities first" });
    }
    const state = await statesModel.findByIdAndDelete(id);
    return state
      ? res.status(200).json({ message: "State deleted successfully" })
      : res.status(404).json({ message: "State not found" });
  } catch (error) {
    return sendError(res, "Error deleting state", error, 400);
  }
};

export const deleteCity = async (req: Request, res: Response) => {
  try {
    const id = getId(req);
    if (!id) return res.status(400).json({ message: "Invalid city id" });
    const city = await citiesModel.findByIdAndDelete(id);
    return city
      ? res.status(200).json({ message: "City deleted successfully" })
      : res.status(404).json({ message: "City not found" });
  } catch (error) {
    return sendError(res, "Error deleting city", error, 400);
  }
};
