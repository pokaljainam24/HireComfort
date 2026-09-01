import mongoose from "mongoose";
import JobApplicationMaster from "../../models/RecruiterModel/JobapplicationMasterModel.js";

export type IJobApplicationMaster = InstanceType<typeof JobApplicationMaster>;

// Create Job Application
export const createJobApplicationService = async (
  data: Partial<IJobApplicationMaster>,
) => {
  try {
    // =====================================
    // Job ID Validation
    // =====================================
    if (!data.jobId) {
      throw new Error("Job ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(data.jobId.toString())) {
      throw new Error("Invalid job ID");
    }

    // =====================================
    // Applicant ID Validation
    // =====================================
    if (!data.applicantId) {
      throw new Error("Applicant ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(data.applicantId.toString())) {
      throw new Error("Invalid applicant ID");
    }

    // =====================================
    // Recruiter ID Validation
    // =====================================
    if (!data.recruiterId) {
      throw new Error("Recruiter ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(data.recruiterId.toString())) {
      throw new Error("Invalid recruiter ID");
    }

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
    // Rating Validation
    // =====================================
    if (data.rating === undefined || data.rating === null) {
      throw new Error("Rating is required");
    }

    if (typeof data.rating !== "number" || isNaN(data.rating)) {
      throw new Error("Rating must be a number");
    }

    if (data.rating < 0 || data.rating > 5) {
      throw new Error("Rating must be between 0 and 5");
    }

    // =====================================
    // Notes Validation
    // =====================================
    if (!data.notes?.trim()) {
      throw new Error("Notes are required");
    }

    // =====================================
    // Status Validation
    // =====================================
    if (!data.status?.trim()) {
      throw new Error("Status is required");
    }

    const allowedStatus = [
      "Active",
      "Inactive",
    ];

    if (!allowedStatus.includes(data.status.trim())) {
      throw new Error(
        "Status must be either Active or Inactive",
      );
    }

    // =====================================
    // Application Status Validation
    // =====================================
    if (!data.applicationStatus?.trim()) {
      throw new Error("Application status is required");
    }

    const allowedApplicationStatus = [
      "Applied",
      "Shortlisted",
      "Rejected",
      "Interview",
      "Selected",
      "Hired",
    ];

    if (
      !allowedApplicationStatus.includes(
        data.applicationStatus.trim(),
      )
    ) {
      throw new Error(
        `Application status must be one of: ${allowedApplicationStatus.join(
          ", ",
        )}`,
      );
    }

    // =====================================
    // Application Date Validation
    // =====================================
    if (!data.applicationDate) {
      throw new Error("Application date is required");
    }

    const applicationDate = new Date(data.applicationDate);

    if (isNaN(applicationDate.getTime())) {
      throw new Error("Invalid application date");
    }

    // =====================================
    // Applied At Validation
    // =====================================
    if (!data.appliedAt) {
      throw new Error("Applied date is required");
    }

    const appliedAt = new Date(data.appliedAt);

    if (isNaN(appliedAt.getTime())) {
      throw new Error("Invalid applied date");
    }

    // =====================================
    // Expected Salary Validation
    // =====================================
    if (
      data.expectedsalary === undefined ||
      data.expectedsalary === null
    ) {
      throw new Error("Expected salary is required");
    }

    if (
      typeof data.expectedsalary !== "number" ||
      isNaN(data.expectedsalary)
    ) {
      throw new Error("Expected salary must be a number");
    }

    if (data.expectedsalary < 0) {
      throw new Error("Expected salary cannot be negative");
    }

    // =====================================
    // Notice Period Validation
    // =====================================
    if (!data.noticeperiod?.trim()) {
      throw new Error("Notice period is required");
    }

    // =====================================
    // Resume Validation
    // =====================================
    if (!data.resume?.trim()) {
      throw new Error("Resume is required");
    }

    // =====================================
    // Check Duplicate Application
    // =====================================
    const existingApplication =
      await JobApplicationMaster.findOne({
        jobId: new mongoose.Types.ObjectId(
          data.jobId.toString(),
        ),
        applicantId: new mongoose.Types.ObjectId(
          data.applicantId.toString(),
        ),
      });

    if (existingApplication) {
      throw new Error(
        "You have already applied for this job",
      );
    }

    // =====================================
    // Create Job Application
    // =====================================
    const jobApplication =
      await JobApplicationMaster.create({
        ...data,

        jobId: new mongoose.Types.ObjectId(
          data.jobId.toString(),
        ),

        applicantId: new mongoose.Types.ObjectId(
          data.applicantId.toString(),
        ),

        recruiterId: new mongoose.Types.ObjectId(
          data.recruiterId.toString(),
        ),

        companyId: new mongoose.Types.ObjectId(
          data.companyId.toString(),
        ),

        notes: data.notes.trim(),

        status: data.status.trim(),

        applicationStatus:
          data.applicationStatus.trim(),

        noticeperiod: data.noticeperiod.trim(),

        resume: data.resume.trim(),

        applicationDate,

        appliedAt,
      });

    return jobApplication;
  } catch (error) {
    console.error(
      "Error in createJobApplicationService:",
      error,
    );

    throw error;
  }
};

// Get All Job Applications
export const getJobApplicationsService = async () => {
  try {
    const jobApplications = await JobApplicationMaster.find({
      isActive: true,
      isDisplay: true,
    })
      .populate("applicantId")
      .populate("recruiterId")
      .populate("jobId")
      .populate("companyId");

    return jobApplications;
  } catch (error) {
    console.error("Error in getJobApplicationsService:", error);

    throw error;
  }
};

// Get Job Application By ID
export const getJobApplicationByIdService = async (id: string) => {
  try {
    const jobApplication = await JobApplicationMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    })
      .populate("applicantId")
      .populate("recruiterId")
      .populate("jobId")
      .populate("companyId");

    return jobApplication;
  } catch (error) {
    console.error("Error in getJobApplicationByIdService:", error);

    throw error;
  }
};

// Update Job Application
export const updateJobApplicationService = async (
  id: string,
  data: Partial<IJobApplicationMaster>,
) => {
  try {
    const jobApplication = await JobApplicationMaster.findOneAndUpdate(
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

    return jobApplication;
  } catch (error) {
    console.error("Error in updateJobApplicationService:", error);

    throw error;
  }
};

// Soft Delete Job Application
export const deleteJobApplicationService = async (
  id: string,
  deleteBy: string,
) => {
  try {
    const jobApplication = await JobApplicationMaster.findOneAndUpdate(
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

    return jobApplication;
  } catch (error) {
    console.error("Error in deleteJobApplicationService:", error);

    throw error;
  }
};

export async function getAllJobApplicationForAdminService() {
  try {
    return await JobApplicationMaster.find()
      .populate("jobId")
      .populate("applicantId")
      .populate("recruiterId")
      .populate("companyId");
  } catch (error) {
    console.error("Error getting job applications for admin:", error);

    throw error;
  }
}
