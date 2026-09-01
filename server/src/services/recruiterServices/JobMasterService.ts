import mongoose from "mongoose";
import JobMaster from "../../models/RecruiterModel/JobMasterModel.js";

export type IJobMaster = InstanceType<typeof JobMaster>;

// Create Job
export const createJobMasterService = async (data: Partial<IJobMaster>) => {
  try {
    // =====================================
    // Company ID Validation
    // =====================================
    if (!data.companyId) {
      throw new Error("Company ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(data.companyId.toString())) {
      throw new Error("Invalid company ID");
    }

    // =====================================
    // Job Title Validation
    // =====================================
    if (!data.title?.trim()) {
      throw new Error("Job title is required");
    }

    if (data.title.trim().length < 2) {
      throw new Error("Job title must contain at least 2 characters");
    }

    // =====================================
    // Description Validation
    // =====================================
    if (!data.description?.trim()) {
      throw new Error("Job description is required");
    }

    if (data.description.trim().length < 10) {
      throw new Error("Job description must contain at least 10 characters");
    }

    // =====================================
    // Skills Validation
    // =====================================
    if (!data.skills) {
      throw new Error("Skills are required");
    }

    if (!Array.isArray(data.skills)) {
      throw new Error("Skills must be an array");
    }

    if (data.skills.length === 0) {
      throw new Error("At least one skill is required");
    }

    const skills = data.skills
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    if (skills.length === 0) {
      throw new Error("At least one valid skill is required");
    }

    // =====================================
    // Experience Validation
    // =====================================
    if (!data.exp?.trim()) {
      throw new Error("Experience is required");
    }

    // =====================================
    // Job Type Validation
    // =====================================
    if (!data.jobType?.trim()) {
      throw new Error("Job type is required");
    }

    const allowedJobTypes = [
      "Full Time",
      "Part Time",
      "Contract",
      "Internship",
      "Freelance",
    ];

    if (!allowedJobTypes.includes(data.jobType.trim())) {
      throw new Error(`Job type must be one of: ${allowedJobTypes.join(", ")}`);
    }

    // =====================================
    // Number of Positions Validation
    // =====================================
    if (data.nop === undefined || data.nop === null) {
      throw new Error("Number of positions is required");
    }

    if (typeof data.nop !== "number" || isNaN(data.nop)) {
      throw new Error("Number of positions must be a number");
    }

    if (!Number.isInteger(data.nop)) {
      throw new Error("Number of positions must be a whole number");
    }

    if (data.nop <= 0) {
      throw new Error("Number of positions must be greater than 0");
    }

    // =====================================
    // Location Validation
    // =====================================
    if (!data.location?.trim()) {
      throw new Error("Job location is required");
    }

    // =====================================
    // Salary Validation
    // =====================================
    if (data.salaryRange === undefined || data.salaryRange === null) {
      throw new Error("Salary range is required");
    }

    if (typeof data.salaryRange !== "number" || isNaN(data.salaryRange)) {
      throw new Error("Salary range must be a number");
    }

    if (data.salaryRange < 0) {
      throw new Error("Salary range cannot be negative");
    }

    // =====================================
    // Interview Type Validation
    // =====================================
    if (!data.interviewType?.trim()) {
      throw new Error("Interview type is required");
    }

    const allowedInterviewTypes = ["Online", "Offline"];

    if (!allowedInterviewTypes.includes(data.interviewType.trim())) {
      throw new Error("Interview type must be either Online or Offline");
    }

    // =====================================
    // Last Applied Date Validation
    // =====================================
    if (!data.lastAppliedDate) {
      throw new Error("Last applied date is required");
    }

    const lastAppliedDate = new Date(data.lastAppliedDate);

    if (isNaN(lastAppliedDate.getTime())) {
      throw new Error("Invalid last applied date");
    }

    if (lastAppliedDate <= new Date()) {
      throw new Error("Last applied date must be a future date");
    }

    // =====================================
    // Qualification Validation
    // =====================================
    if (!data.qualification?.trim()) {
      throw new Error("Qualification is required");
    }

    // =====================================
    // Icon Validation
    // =====================================
    if (data.icon?.trim()) {
      try {
        new URL(data.icon.trim());
      } catch {
        throw new Error("Invalid icon URL");
      }
    }

    // =====================================
    // Create Job
    // =====================================
    const job = await JobMaster.create({
      ...data,

      companyId: new mongoose.Types.ObjectId(data.companyId.toString()),

      title: data.title.trim(),

      description: data.description.trim(),

      skills,

      exp: data.exp.trim(),

      jobType: data.jobType.trim(),

      location: data.location.trim(),

      interviewType: data.interviewType.trim(),

      qualification: data.qualification.trim(),

      icon: data.icon?.trim() || "",

      nop: data.nop,

      salaryRange: data.salaryRange,

      lastAppliedDate,
    });

    return job;
  } catch (error) {
    console.error("Error in createJobMasterService:", error);

    throw error;
  }
};

// Get All Jobs
export const getJobMastersService = async () => {
  try {
    const jobs = await JobMaster.find({
      isActive: true,
      isDisplay: true,
    }).populate("companyId");

    return jobs;
  } catch (error) {
    console.error("Error in getJobMastersService:", error);

    throw error;
  }
};

// Get Job By ID
export const getJobMasterByIdService = async (id: string) => {
  try {
    const job = await JobMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    }).populate("companyId");

    return job;
  } catch (error) {
    console.error("Error in getJobMasterByIdService:", error);

    throw error;
  }
};

// Update Job
export const updateJobMasterService = async (
  id: string,
  data: Partial<IJobMaster>,
) => {
  try {
    const job = await JobMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },
      {
        ...data,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return job;
  } catch (error) {
    console.error("Error in updateJobMasterService:", error);

    throw error;
  }
};

// Soft Delete Job
export const deleteJobMasterService = async (id: string, deleteBy: string) => {
  try {
    const job = await JobMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },
      {
        isActive: false,
        isDisplay: false,
        deleteAt: new Date(),
        deleteBy: deleteBy,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return job;
  } catch (error) {
    console.error("Error in deleteJobMasterService:", error);

    throw error;
  }
};

// Get All Jobs For Admin
export async function getAllJobMasterForAdminService() {
  try {
    return await JobMaster.find().populate("companyId");
  } catch (error) {
    console.error("Error getting jobs for admin:", error);

    throw error;
  }
}
