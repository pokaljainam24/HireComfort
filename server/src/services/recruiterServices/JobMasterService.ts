import mongoose from "mongoose";
import JobMaster from "../../models/RecruiterModel/JobMasterModel.js";
import CompanyMaster from "../../models/RecruiterModel/Companymodel.js";
import Recruiter from "../../models/RecruiterModel/Recruitermodel.js";

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
    // Location Validation
    // =====================================
    if (data.city === undefined || data.city === null) {
      throw new Error("Job city is required");
    }
    if (data.state === undefined || data.state === null) {
      throw new Error("Job state is required");
    }
    if (data.country === undefined || data.country === null) {
      throw new Error("Job country is required");
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
    if (!data.exp) {
      throw new Error("Experience is required");
    }

    // =====================================
    // Job Type Validation
    // =====================================
    if (!data.jobType?.trim()) {
      throw new Error("Job type is required");
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
    // Number of Rounds Validation
    // =====================================
    if (data.noOfRounds === undefined || data.noOfRounds === null) {
      throw new Error("Number of rounds is required");
    }

    if (
      typeof data.noOfRounds !== "number" ||
      isNaN(data.noOfRounds)
    ) {
      throw new Error("Number of rounds must be a number");
    }

    if (!Number.isInteger(data.noOfRounds)) {
      throw new Error("Number of rounds must be a whole number");
    }

    if (data.noOfRounds < 0) {
      throw new Error("Number of rounds cannot be negative");
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

      categoryId: data.categoryId ? new mongoose.Types.ObjectId(data.categoryId.toString()) : undefined,

      subCategoryId: data.subCategoryId ? new mongoose.Types.ObjectId(data.subCategoryId.toString()) : undefined,

      title: data.title.trim(),

      city: data.city,

      state: data.state,

      country: data.country,

      description: data.description.trim(),

      skills,

      exp: data.exp,

      jobType: data.jobType.trim(),

      interviewType: data.interviewType.trim(),

      qualification: data.qualification.trim(),

      icon: data.icon?.trim() || "",

      nop: data.nop,

      salaryRange: data.salaryRange,

      lastAppliedDate,

      noOfRounds: data.noOfRounds,
    });

    return job;
  } catch (error) {
    console.error("Error in createJobMasterService:", error);

    throw error;
  }
};

export interface GetJobMastersParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  jobType?: string;
  sort?: "newest" | "oldest";
}

// Get All Jobs
export const getJobMastersService = async (params: GetJobMastersParams = {}) => {
  try {
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.max(1, Number(params.limit) || 10);
    const skip = (page - 1) * limit;

    const matchStage: any = {
      isActive: true,
      isDisplay: true,
    };

    if (params.categoryId && mongoose.Types.ObjectId.isValid(params.categoryId)) {
      matchStage.categoryId = new mongoose.Types.ObjectId(params.categoryId);
    }

    if (params.jobType && params.jobType.trim() !== "") {
      matchStage.jobType = { $regex: params.jobType.trim(), $options: "i" };
    }

    if (params.search && params.search.trim() !== "") {
      const searchRegex = new RegExp(params.search.trim(), "i");
      matchStage.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { skills: { $elemMatch: { $regex: searchRegex } } },
      ];
    }

    const sortOrder = params.sort === "oldest" ? 1 : -1;
    const sortStage: any = {
      _id: sortOrder,
      createdAt: sortOrder,
    };

    const pipeline: any[] = [
      { $match: matchStage },
      { $sort: sortStage },
      {
        $lookup: {
          from: "companymasters",
          localField: "companyId",
          foreignField: "_id",
          as: "companyId",
        },
      },
      {
        $unwind: {
          path: "$companyId",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "city",
          localField: "city",
          foreignField: "id",
          as: "cityDetails",
        },
      },
      {
        $addFields: {
          city: {
            $ifNull: [
              { $arrayElemAt: ["$cityDetails.name", 0] },
              "$city",
            ],
          },
        },
      },
      {
        $project: {
          cityDetails: 0,
        },
      },
      {
        $facet: {
          jobs: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await JobMaster.aggregate(pipeline);
    const jobs = result[0]?.jobs || [];
    const totalJobs = result[0]?.totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalJobs / limit) || 1;

    return {
      jobs,
      totalJobs,
      totalPages,
      currentPage: page,
      limit,
    };
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
    }).populate("companyId").lean();

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

// Get Jobs By Recruiter ID
export async function getJobMastersByRecruiterService(
  recruiterId: string,
  params: GetJobMastersParams = {}
) {
  try {
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.max(1, Number(params.limit) || 10);
    const skip = (page - 1) * limit;

    const recruiterObjId = mongoose.Types.ObjectId.isValid(recruiterId)
      ? new mongoose.Types.ObjectId(recruiterId)
      : null;

    const company = recruiterObjId
      ? await CompanyMaster.findOne({ recruiterId: recruiterObjId }).lean()
      : null;
    const recruiter = recruiterObjId
      ? await Recruiter.findById(recruiterObjId).lean()
      : null;

    const matchStage: any = {
      isActive: true,
      isDisplay: true,
    };

    const $or: any[] = [{ createdBy: recruiterId }];
    if (recruiter?.userName) {
      $or.push({ createdBy: recruiter.userName });
    }
    if (company?._id) {
      $or.push({ companyId: company._id });
    }
    matchStage.$or = $or;

    if (params.categoryId && mongoose.Types.ObjectId.isValid(params.categoryId)) {
      matchStage.categoryId = new mongoose.Types.ObjectId(params.categoryId);
    }

    if (params.jobType && params.jobType.trim() !== "") {
      matchStage.jobType = { $regex: params.jobType.trim(), $options: "i" };
    }

    if (params.search && params.search.trim() !== "") {
      const searchRegex = new RegExp(params.search.trim(), "i");
      matchStage.$and = [
        {
          $or: [
            { title: searchRegex },
            { description: searchRegex },
            { skills: { $elemMatch: { $regex: searchRegex } } },
          ],
        },
      ];
    }

    const sortOrder = params.sort === "oldest" ? 1 : -1;
    const sortStage: any = {
      _id: sortOrder,
      createdAt: sortOrder,
    };

    const pipeline: any[] = [
      { $match: matchStage },
      { $sort: sortStage },
      {
        $lookup: {
          from: "companymasters",
          localField: "companyId",
          foreignField: "_id",
          as: "companyId",
        },
      },
      {
        $unwind: {
          path: "$companyId",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "city",
          localField: "city",
          foreignField: "id",
          as: "cityDetails",
        },
      },
      {
        $addFields: {
          city: {
            $ifNull: [
              { $arrayElemAt: ["$cityDetails.name", 0] },
              "$city",
            ],
          },
        },
      },
      {
        $project: {
          cityDetails: 0,
        },
      },
      {
        $facet: {
          jobs: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await JobMaster.aggregate(pipeline);
    const jobs = result[0]?.jobs || [];
    const totalJobs = result[0]?.totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalJobs / limit) || 1;

    return {
      jobs,
      totalJobs,
      totalPages,
      currentPage: page,
      limit,
    };
  } catch (error) {
    console.error("Error in getJobMastersByRecruiterService:", error);
    throw error;
  }
}
