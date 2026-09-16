
import { InterviewRound } from "../../models/InterviewModel/InterviewModel.js";

export type IInterviewRound =
  InstanceType<typeof InterviewRound>;

// =====================================
// Create
// =====================================

export async function createInterviewRoundService(
  interviewRoundData: Partial<IInterviewRound>,
) {
  try {
    // =====================================
    // Applicant ID validation
    // =====================================

    if (!interviewRoundData.applicantId) {
      throw new Error(
        "Applicant ID is required",
      );
    }

    // =====================================
    // Job Master ID validation
    // =====================================

    if (!interviewRoundData.jobMasterId) {
      throw new Error(
        "Job master ID is required",
      );
    }

    // =====================================
    // Company ID validation
    // =====================================

    if (!interviewRoundData.companyId) {
      throw new Error(
        "Company ID is required",
      );
    }

    // =====================================
    // Status validation
    // =====================================

    if (!interviewRoundData.status?.trim()) {
      throw new Error(
        "Status is required",
      );
    }

    // =====================================
    // Round validation
    // =====================================

    if (
      interviewRoundData.round === undefined ||
      interviewRoundData.round === null
    ) {
      throw new Error(
        "Round is required",
      );
    }

    if (interviewRoundData.round < 1) {
      throw new Error(
        "Round must be at least 1",
      );
    }

    // =====================================
    // Check duplicate round
    // =====================================

    const existingRound =
      await InterviewRound.findOne({
        applicantId:
          interviewRoundData.applicantId,

        jobMasterId:
          interviewRoundData.jobMasterId,

        round:
          interviewRoundData.round,
      });

    if (existingRound) {
      throw new Error(
        "This interview round already exists for this applicant",
      );
    }

    // =====================================
    // Create Interview Round
    // =====================================

    const interviewRound =
      new InterviewRound({
        applicantId:
          interviewRoundData.applicantId,

        jobMasterId:
          interviewRoundData.jobMasterId,

        companyId:
          interviewRoundData.companyId,

        remark:
          interviewRoundData.remark?.trim(),

        status:
          interviewRoundData.status.trim(),

        round:
          interviewRoundData.round,
      });

    return await interviewRound.save();

  } catch (error) {
    console.error(
      "Error creating interview round:",
      error,
    );

    throw error;
  }
}

// =====================================
// Get All
// =====================================

export async function getInterviewRoundsService() {
  try {
    return await InterviewRound.find()
      .populate("applicantId")
      .populate("jobMasterId")
      .populate("companyId")
      .sort({
        createdAt: -1,
      });

  } catch (error) {
    console.error(
      "Error getting interview rounds:",
      error,
    );

    throw error;
  }
}

// =====================================
// Get By ID
// =====================================

export async function getInterviewRoundByIdService(
  id: string,
) {
  try {
    if (!id?.trim()) {
      throw new Error(
        "Interview round ID is required",
      );
    }

    const interviewRound =
      await InterviewRound.findById(id)
        .populate("applicantId")
        .populate("jobMasterId")
        .populate("companyId");

    return interviewRound;

  } catch (error) {
    console.error(
      `Error getting interview round with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Get By Applicant
// =====================================

export async function getInterviewRoundsByApplicantService(
  applicantId: string,
) {
  try {
    if (!applicantId?.trim()) {
      throw new Error(
        "Applicant ID is required",
      );
    }

    return await InterviewRound.find({
      applicantId,
    })
      .populate("applicantId")
      .populate("jobMasterId")
      .populate("companyId")
      .sort({
        round: 1,
      });

  } catch (error) {
    console.error(
      `Error getting interview rounds for applicant ${applicantId}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Get By Job Master
// =====================================

export async function getInterviewRoundsByJobService(
  jobMasterId: string,
) {
  try {
    if (!jobMasterId?.trim()) {
      throw new Error(
        "Job master ID is required",
      );
    }

    return await InterviewRound.find({
      jobMasterId,
    })
      .populate("applicantId")
      .populate("jobMasterId")
      .populate("companyId")
      .sort({
        round: 1,
      });

  } catch (error) {
    console.error(
      `Error getting interview rounds for job ${jobMasterId}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Update
// =====================================

export async function updateInterviewRoundService(
  id: string,
  updateData: Partial<IInterviewRound>,
) {
  try {
    // =====================================
    // ID validation
    // =====================================

    if (!id?.trim()) {
      throw new Error(
        "Interview round ID is required",
      );
    }

    // =====================================
    // Status validation
    // =====================================

    if (
      updateData.status !== undefined &&
      !updateData.status.trim()
    ) {
      throw new Error(
        "Status is required",
      );
    }

    // =====================================
    // Round validation
    // =====================================

    if (
      updateData.round !== undefined &&
      updateData.round < 1
    ) {
      throw new Error(
        "Round must be at least 1",
      );
    }

    // =====================================
    // Check Current Interview Round
    // =====================================

    const currentInterviewRound =
      await InterviewRound.findById(id);

    if (!currentInterviewRound) {
      return null;
    }

    // =====================================
    // Prepare Update Data
    // =====================================

    const data: Partial<IInterviewRound> = {
      ...updateData,
    };

    // Do not allow _id to be changed
    delete (data as Partial<IInterviewRound> & {
      _id?: unknown;
    })._id;

    if (data.status !== undefined) {
      data.status = data.status.trim();
    }

    if (data.remark !== undefined) {
      data.remark = data.remark.trim();
    }

    // =====================================
    // Update
    // =====================================

    return await InterviewRound.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      },
    )
      .populate("applicantId")
      .populate("jobMasterId")
      .populate("companyId");

  } catch (error) {
    console.error(
      `Error updating interview round with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Delete
// =====================================

export async function deleteInterviewRoundService(
  id: string,
) {
  try {
    // =====================================
    // ID validation
    // =====================================

    if (!id?.trim()) {
      throw new Error(
        "Interview round ID is required",
      );
    }

    // =====================================
    // Delete
    // =====================================

    return await InterviewRound.findByIdAndDelete(
      id,
    );

  } catch (error) {
    console.error(
      `Error deleting interview round with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Get All By Company
// =====================================

export async function getInterviewRoundsByCompanyService(
  companyId: string,
) {
  try {
    if (!companyId?.trim()) {
      throw new Error(
        "Company ID is required",
      );
    }

    return await InterviewRound.find({
      companyId,
    })
      .populate("applicantId")
      .populate("jobMasterId")
      .populate("companyId")
      .sort({
        createdAt: -1,
      });

  } catch (error) {
    console.error(
      `Error getting interview rounds for company ${companyId}:`,
      error,
    );

    throw error;
  }
}











