import mongoose from "mongoose";
import InterviewMaster from "../../models/RecruiterModel/InterviewMasterModel.js";

export type IInterviewMaster = InstanceType<typeof InterviewMaster>;


// Create Interview
export const createInterviewMasterService = async (
  data: Partial<IInterviewMaster>,
) => {
  try {
    // ==============================
    // Application ID Validation
    // ==============================
    if (!data.applicationId) {
      throw new Error("Application ID is required");
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        data.applicationId.toString(),
      )
    ) {
      throw new Error("Invalid application ID");
    }

    // ==============================
    // Recruiter ID Validation
    // ==============================
    if (!data.recruiterId) {
      throw new Error("Recruiter ID is required");
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        data.recruiterId.toString(),
      )
    ) {
      throw new Error("Invalid recruiter ID");
    }

    // ==============================
    // Interview Type Validation
    // ==============================
    if (!data.interviewType?.trim()) {
      throw new Error("Interview type is required");
    }

    const allowedInterviewTypes = [
      "online",
      "offline",
    ];

    const interviewType = data.interviewType
      .trim()
      .toLowerCase();

    if (!allowedInterviewTypes.includes(interviewType)) {
      throw new Error(
        "Interview type must be either online or offline",
      );
    }

    // ==============================
    // Interview Date Validation
    // ==============================
    if (!data.interviewDate) {
      throw new Error("Interview date is required");
    }

    const interviewDate = new Date(data.interviewDate);

    if (isNaN(interviewDate.getTime())) {
      throw new Error("Invalid interview date");
    }

    // ==============================
    // Interview Time Validation
    // ==============================
    if (!data.interviewTime) {
      throw new Error("Interview time is required");
    }

    const interviewTime = new Date(data.interviewTime);

    if (isNaN(interviewTime.getTime())) {
      throw new Error("Invalid interview time");
    }

    // ==============================
    // Online / Offline Validation
    // ==============================

    if (interviewType === "offline") {
      if (!data.interviewLocation?.trim()) {
        throw new Error(
          "Interview location is required for offline interview",
        );
      }
    }

    if (interviewType === "online") {
      if (!data.meetingLink?.trim()) {
        throw new Error(
          "Meeting link is required for online interview",
        );
      }

      try {
        new URL(data.meetingLink.trim());
      } catch {
        throw new Error("Invalid meeting link");
      }
    }

    // ==============================
    // Create Interview
    // ==============================
    const interview = await InterviewMaster.create({
      ...data,

      applicationId: new mongoose.Types.ObjectId(
        data.applicationId.toString(),
      ),

      recruiterId: new mongoose.Types.ObjectId(
        data.recruiterId.toString(),
      ),

      interviewType,

      interviewDate,

      interviewTime,

      interviewLocation:
        data.interviewLocation?.trim() || "",

      meetingLink:
        data.meetingLink?.trim() || "",

      report: data.report?.trim() || "",

      feedback: data.feedback?.trim() || "",
    });

    return interview;
  } catch (error) {
    console.error(
      "Error in createInterviewMasterService:",
      error,
    );

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
