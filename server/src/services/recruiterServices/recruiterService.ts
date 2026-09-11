import bcrypt from "bcrypt";
import Recruiter from "../../models/RecruiterModel/Recruitermodel.js";
import JobMaster from "../../models/RecruiterModel/JobMasterModel.js";
import JobApplicationMaster from "../../models/RecruiterModel/JobapplicationMasterModel.js";

export type IRecruiter = InstanceType<typeof Recruiter>;


export async function createRecruiterService(
  recruiterData: Partial<IRecruiter>,
) {
  try {
    // =====================================
    // First Name Validation
    // =====================================
    if (!recruiterData.firstName?.trim()) {
      throw new Error("First name is required");
    }

    if (recruiterData.firstName.trim().length < 2) {
      throw new Error("First name must contain at least 2 characters");
    }

    // =====================================
    // Last Name Validation
    // =====================================
    if (!recruiterData.lastName?.trim()) {
      throw new Error("Last name is required");
    }

    if (recruiterData.lastName.trim().length < 2) {
      throw new Error("Last name must contain at least 2 characters");
    }

    // =====================================
    // Email Validation
    // =====================================
    if (!recruiterData.email?.trim()) {
      throw new Error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(recruiterData.email.trim())) {
      throw new Error("Invalid email address");
    }

    // Check duplicate email
    const existingEmail = await Recruiter.findOne({
      email: recruiterData.email.trim().toLowerCase(),
    });

    if (existingEmail) {
      throw new Error("Recruiter with this email already exists");
    }

    // =====================================
    // Mobile Number Validation
    // =====================================
    if (!recruiterData.mobileNumber?.trim()) {
      throw new Error("Mobile number is required");
    }

    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobileRegex.test(recruiterData.mobileNumber.trim())) {
      throw new Error(
        "Invalid mobile number. Enter a valid 10-digit mobile number",
      );
    }

    // =====================================
    // Username Validation
    // =====================================
    if (!recruiterData.userName?.trim()) {
      throw new Error("Username is required");
    }

    if (
      recruiterData.userName.trim().length < 3 ||
      recruiterData.userName.trim().length > 30
    ) {
      throw new Error("Username must be between 3 and 30 characters");
    }

    const usernameRegex = /^[a-zA-Z0-9_.]+$/;

    if (!usernameRegex.test(recruiterData.userName.trim())) {
      throw new Error(
        "Username can only contain letters, numbers, underscore and dot",
      );
    }

    // Check duplicate username
    const existingUsername = await Recruiter.findOne({
      userName: recruiterData.userName.trim(),
    });

    if (existingUsername) {
      throw new Error("This username is already taken");
    }

    // =====================================
    // Password Validation
    // =====================================
    if (!recruiterData.password) {
      throw new Error("Password is required");
    }

    if (recruiterData.password.length < 8) {
      throw new Error("Password must contain at least 8 characters");
    }

    // =====================================
    // Hash Password
    // =====================================
    const hashedPassword = await bcrypt.hash(recruiterData.password, 10);

    // =====================================
    // Department Validation
    // =====================================
    if (!recruiterData.department?.trim()) {
      throw new Error("Department is required");
    }

    // =====================================
    // Remark Validation
    // =====================================
    const remark = recruiterData.remark?.trim() || "";

    // =====================================
    // Joining Date Validation
    // =====================================
    if (!recruiterData.joiningDate) {
      throw new Error("Joining date is required");
    }

    const joiningDate = new Date(recruiterData.joiningDate);

    if (isNaN(joiningDate.getTime())) {
      throw new Error("Invalid joining date");
    }

    // =====================================
    // Designation Validation
    // =====================================
    if (!recruiterData.designation?.trim()) {
      throw new Error("Designation is required");
    }

    // =====================================
    // Create Recruiter
    // =====================================
    const recruiter = new Recruiter({
      ...recruiterData,

      firstName: recruiterData.firstName.trim(),

      lastName: recruiterData.lastName.trim(),

      email: recruiterData.email.trim().toLowerCase(),

      mobileNumber: recruiterData.mobileNumber.trim(),

      address: recruiterData.address?.trim(),

      userName: recruiterData.userName.trim(),

      // Store hashed password, NOT plain password
      password: hashedPassword,

      department: recruiterData.department.trim(),

      remark,

      joiningDate,

      designation: recruiterData.designation.trim(),
    });

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
      _id: id,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(`Error getting recruiter with id ${id}:`, error);
    throw error;
  }
}

export async function getRecruiterByUsernameService(username: string) {
  try {
    return await Recruiter.findOne({
      username,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(`Error getting recruiter with username ${username}:`, error);
    throw error;
  }
}

export async function updateRecruiterService(
  id: string,
  updateData: Partial<IRecruiter>,
  updatedBy: string,
) {
  try {
    return await Recruiter.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },
      {
        ...updateData,
        updatedBy: updatedBy,
      },
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
        _id: id,
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

export async function getRecruiterAnalyticsService() {
  try {
    const totalJobs = await JobMaster.countDocuments({
      isActive: true,
      isDisplay: true,
    });

    const totalApplications = await JobApplicationMaster.countDocuments({
      isActive: true,
      isDisplay: true,
    });

    return {
      totalJobs,
      totalApplications,
    };
  } catch (error) {
    console.error("Error fetching recruiter analytics:", error);
    throw error;
  }
}



export async function updatePasswordService(
  recruiterId: string,
  newPassword: string,
  currentPassword: string,
  updatedBy: string = "admin",
) {
  try {
    const recruiter = await Recruiter.findOne({
      _id: recruiterId,
      isActive: true,
      isDisplay: true,
    });

    if (!recruiter) {
      throw new Error("Recruiter not found");
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      recruiter.password,
    );

    if (!isCurrentPasswordValid) {
      throw new Error("Invalid current password");
    }

    const isSamePassword = await bcrypt.compare(newPassword, recruiter.password);
    if (isSamePassword) {
      throw new Error("New password cannot be the same as current password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    recruiter.password = hashedPassword;
    recruiter.updatedBy = updatedBy;
    recruiter.updatedAt = new Date();

    return await recruiter.save();
  } catch (error) {
    console.error("Error updating password service:", error);
    throw error;
  }
}