import mongoose from "mongoose";
import JobApplicationMaster from "../../models/RecruiterModel/JobapplicationMasterModel.js";

export type IJobApplicationMaster = InstanceType<
  typeof JobApplicationMaster
>;

// =====================================================
// Create Job Application
// =====================================================
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


        applicationStatus:
          data.applicationStatus || "Viewed",

        noticeperiod:
          data.noticeperiod?.trim() || "",

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

// =====================================================
// Get All Job Applications
// =====================================================
export const getJobApplicationsService = async () => {
  try {
    const jobApplications =
      await JobApplicationMaster.find({
        isActive: true,
        isDisplay: true,
      })
        .populate("applicantId")
        .populate("recruiterId")
        .populate({
          path: "jobId",
          select: "_id title noOfRounds",
        })
        .populate("companyId")
        .lean();

    console.log(
      "========== APPLICATIONS =========="
    );

    console.log(
      JSON.stringify(jobApplications, null, 2)
    );

    return jobApplications;
  } catch (error) {
    console.error(
      "Error in getJobApplicationsService:",
      error,
    );

    throw error;
  }
};

// =====================================================
// Get Job Application By ID
// =====================================================
export const getJobApplicationByIdService = async (
  id: string,
) => {
  try {
    const jobApplication =
      await JobApplicationMaster.findOne({
        _id: id,
        isActive: true,
        isDisplay: true,
      })
        .populate("applicantId")
        .populate("recruiterId")
        .populate({
          path: "jobId",
          select: "_id title noOfRounds",
        })
        .populate("companyId")
        .lean();

    return jobApplication;
  } catch (error) {
    console.error(
      "Error in getJobApplicationByIdService:",
      error,
    );

    throw error;
  }
};

// =====================================================
// Update Job Application
// =====================================================
export const updateJobApplicationService = async (
  id: string,
  data: Partial<IJobApplicationMaster>,
) => {
  try {
    const jobApplication =
      await JobApplicationMaster.findOneAndUpdate(
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
      )
        .populate({
          path: "jobId",
          select: "_id title noOfRounds",
        })
        .populate("applicantId")
        .populate("recruiterId")
        .populate("companyId");

    return jobApplication;
  } catch (error) {
    console.error(
      "Error in updateJobApplicationService:",
      error,
    );

    throw error;
  }
};

// =====================================================
// Soft Delete Job Application
// =====================================================
export const deleteJobApplicationService = async (
  id: string,
  deleteBy: string,
) => {
  try {
    const jobApplication =
      await JobApplicationMaster.findOneAndUpdate(
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
    console.error(
      "Error in deleteJobApplicationService:",
      error,
    );

    throw error;
  }
};

// =====================================================
// Get All Job Applications For Admin
// =====================================================
export async function getAllJobApplicationForAdminService() {
  try {
    const applications =
      await JobApplicationMaster.find()
        .populate({
          path: "jobId",
          select: "_id title noOfRounds",
        })
        .populate("applicantId")
        .populate("recruiterId")
        .populate("companyId")
        .lean();

    console.log(
      "========== ADMIN APPLICATIONS =========="
    );

    console.log(
      JSON.stringify(applications, null, 2)
    );

    return applications;
  } catch (error) {
    console.error(
      "Error getting job applications for admin:",
      error,
    );

    throw error;
  }
}
