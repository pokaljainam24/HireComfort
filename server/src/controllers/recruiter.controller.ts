import type { Request, Response } from "express";
import Recruiter from "../models/Recruiter.model.js";

export const createRecruiter = async (req: Request, res: Response) => {
  try {
    const recruiter = new Recruiter(req.body);

    const savedRecruiter = await recruiter.save();

    return res.status(201).json({
      message: "Recruiter created successfully",
      recruiter: savedRecruiter,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating recruiter",
      error,
    });
  } finally {
    console.log("Create recruiter completed");
  }
};

export const getRecruiters = async (req: Request, res: Response) => {
  try {
    const recruiters = await Recruiter.find();

    return res.status(200).json({
      recruiters,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting recruiters",
      error,
    });
  } finally {
    console.log("Get recruiters completed");
  }
};

export const getRecruiter = async (req: Request, res: Response) => {
  try {
    const recruiterId = req.params.id;

    const recruiter = recruiterId
      ? await Recruiter.findOne({ id: recruiterId as string })
      : null;

    return recruiter
      ? res.status(200).json({ recruiter })
      : res.status(404).json({ message: "Recruiter not found" });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting recruiter",
      error,
    });
  } finally {
    console.log("Get recruiter completed");
  }
};

export const updateRecruiter = async (req: Request, res: Response) => {
  try {
    const recruiterId = req.params.id;

    const recruiter = recruiterId
      ? await Recruiter.findOneAndUpdate(
          { id: recruiterId as string },
          req.body,
          { new: true },
        )
      : null;

    return recruiter
      ? res.status(200).json({
          message: "Recruiter updated successfully",
          recruiter,
        })
      : res.status(404).json({
          message: "Recruiter not found",
        });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating recruiter",
      error,
    });
  } finally {
    console.log("Update recruiter completed");
  }
};

export const deleteRecruiter = async (req: Request, res: Response) => {
  try {
    const recruiterId = req.params.id;

    const recruiter = recruiterId
      ? await Recruiter.findOneAndDelete({ id: recruiterId as string })
      : null;

    return recruiter
      ? res.status(200).json({
          message: "Recruiter deleted successfully",
        })
      : res.status(404).json({
          message: "Recruiter not found",
        });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting recruiter",
      error,
    });
  } finally {
    console.log("Delete recruiter completed");
  }
};
