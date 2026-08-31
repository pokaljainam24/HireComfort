import InterviewMaster from "../../models/RecruiterModel/InterviewMasterModel.js";

export type IInterviewMaster = InstanceType<typeof InterviewMaster>;

// Create Interview
export const createInterviewMasterService = async (
  data: Partial<IInterviewMaster>,
) => {
  try {
    const interview = await InterviewMaster.create(data);

    return interview;
  } catch (error) {
    console.error("Error in createInterviewMasterService:", error);

    throw error;
  }
};

// Get All Interviews
export const getInterviewMastersService = async () => {
  try {
    const interviews = await InterviewMaster.find({
      isActive: true,
      isDisplay: true,
    })
      .populate("applicationId")
      .populate("recruiterId");

    return interviews;
  } catch (error) {
    console.error("Error in getInterviewMastersService:", error);

    throw error;
  }
};

// Get Interview By ID
export const getInterviewMasterByIdService = async (id: string) => {
  try {
    const interview = await InterviewMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    })
      .populate("applicationId")
      .populate("recruiterId");

    return interview;
  } catch (error) {
    console.error("Error in getInterviewMasterByIdService:", error);

    throw error;
  }
};

// Update Interview
export const updateInterviewMasterService = async (
  id: string,
  data: Partial<IInterviewMaster>,
) => {
  try {
    const interview = await InterviewMaster.findOneAndUpdate(
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

    return interview;
  } catch (error) {
    console.error("Error in updateInterviewMasterService:", error);

    throw error;
  }
};

// Soft Delete Interview
export const deleteInterviewMasterService = async (
  id: string,
  deleteBy: string,
) => {
  try {
    const interview = await InterviewMaster.findOneAndUpdate(
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

    return interview;
  } catch (error) {
    console.error("Error in deleteInterviewMasterService:", error);

    throw error;
  }
};

// Get All Interviews For Admin
export async function getAllInterviewMasterForAdminService() {
  try {
    return await InterviewMaster.find()
      .populate("applicationId")
      .populate("recruiterId");
  } catch (error) {
    console.error("Error getting interviews for admin:", error);

    throw error;
  }
}
