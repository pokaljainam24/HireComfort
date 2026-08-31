import JobApplicationMaster from "../../models/RecruiterModel/JobapplicationMasterModel.js";

export type IJobApplicationMaster = InstanceType<typeof JobApplicationMaster>;

// Create Job Application
export const createJobApplicationService = async (
  data: Partial<IJobApplicationMaster>,
) => {
  try {
    const jobApplication = await JobApplicationMaster.create(data);

    return jobApplication;
  } catch (error) {
    console.error("Error in createJobApplicationService:", error);

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
