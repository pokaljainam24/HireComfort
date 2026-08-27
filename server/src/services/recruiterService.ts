import Recruiter from "../models/RecruiterModel/Recruitermodel.js";

export type IRecruiter = InstanceType<typeof Recruiter>;

export async function createRecruiterService(
  recruiterData: Partial<IRecruiter>,
) {
  try {
    const recruiter = new Recruiter(recruiterData);

    return await recruiter.save();
  } catch (error) {
    console.error("Error creating recruiter:", error);
    throw error;
  }
}

export async function getRecruitersService() {
  try {
    return await Recruiter.find({
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error("Error getting recruiters:", error);
    throw error;
  }
}

export async function getRecruiterByIdService(id: string) {
  try {
    return await Recruiter.findOne({
      id,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(`Error getting recruiter with id ${id}:`, error);
    throw error;
  }
}

export async function updateRecruiterService(
  id: string,
  updateData: Partial<IRecruiter>,
) {
  try {
    return await Recruiter.findOneAndUpdate(
      {
        id,
        isActive: true,
        isDisplay: true,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );
  } catch (error) {
    console.error(`Error updating recruiter with id ${id}:`, error);
    throw error;
  }
}

export async function deleteRecruiterService(id: string, deleteBy: string) {
  try {
    return await Recruiter.findOneAndUpdate(
      {
        id,
        isActive: true,
      },
      {
        isActive: false,
        isDisplay: false,
        deleteAt: new Date(),
        deleteBy,
      },
      {
        new: true,
      },
    );
  } catch (error) {
    console.error(`Error deleting recruiter with id ${id}:`, error);
    throw error;
  }
}

// ADMIN ONLY
export async function getAllRecruitersForAdminService() {
  try {
    return await Recruiter.find();
  } catch (error) {
    console.error("Error getting recruiters for admin:", error);
    throw error;
  }
}
