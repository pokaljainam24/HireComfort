import JobMaster from "../../models/RecruiterModel/JobMasterModel.js";

export type IJobMaster = InstanceType<typeof JobMaster>;

// Create Job
export const createJobMasterService = async (data: Partial<IJobMaster>) => {
  try {
    const job = await JobMaster.create(data);

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
