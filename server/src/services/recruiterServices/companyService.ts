import mongoose from "mongoose";
import CompanyMaster from "../../models/RecruiterModel/Companymodel.js";

export type ICompanyMaster = InstanceType<typeof CompanyMaster>;

export async function createCompanyService(
  companyData: Partial<ICompanyMaster>,
) {
  try {
    // ==============================
    // Recruiter ID Validation
    // ==============================
    if (!companyData.recruiterId) {
      throw new Error("Recruiter ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(companyData.recruiterId)) {
      throw new Error("Invalid recruiter ID");
    }

    // ==============================
    // Company Name Validation
    // ==============================
    if (!companyData.companyName?.trim()) {
      throw new Error("Company name is required");
    }

    if (companyData.companyName.trim().length < 2) {
      throw new Error("Company name must contain at least 2 characters");
    }

    // ==============================
    // Address Validation
    // ==============================
    if (!companyData.address?.trim()) {
      throw new Error("Company address is required");
    }

    // ==============================
    // Contact Number Validation
    // ==============================
    if (!companyData.contactNumber?.trim()) {
      throw new Error("Contact number is required");
    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(companyData.contactNumber.trim())) {
      throw new Error("Invalid contact number. Enter a valid 10-digit number");
    }

    // ==============================
    // Email Validation
    // ==============================
    if (!companyData.companyEmail?.trim()) {
      throw new Error("Company email is required");
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(companyData.companyEmail.trim())) {
      throw new Error("Invalid company email");
    }

    // ==============================
    // Number Of Employee Validation
    // ==============================
    if (!companyData.numberOfEmployee?.trim()) {
      throw new Error("Number of employees is required");
    }

    // ==============================
    // Company Type Validation
    // ==============================
    if (!companyData.companyType?.trim()) {
      throw new Error("Company type is required");
    }

    // ==============================
    // Website Validation
    // ==============================
    if (companyData.website?.trim()) {
      try {
        new URL(companyData.website.trim());
      } catch {
        throw new Error("Invalid company website URL");
      }
    }

    // ==============================
    // GST Number Validation
    // ==============================
    if (!companyData.gstNumber?.trim()) {
      throw new Error("GST number is required");
    }

    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

    if (!gstRegex.test(companyData.gstNumber.trim().toUpperCase())) {
      throw new Error("Invalid GST number");
    }

    // ==============================
    // About Company Validation
    // ==============================
    if (!companyData.aboutCompany?.trim()) {
      throw new Error("About company is required");
    }

    // ==============================
    // Location Validation
    // ==============================
    if (!companyData.city?.trim()) {
      throw new Error("City is required");
    }

    if (!companyData.state?.trim()) {
      throw new Error("State is required");
    }

    if (!companyData.country?.trim()) {
      throw new Error("Country is required");
    }

    // ==============================
    // Social Media URL Validation
    // ==============================
    const validateSocialUrl = (
      value: string | undefined,
      fieldName: string,
    ) => {
      if (!value?.trim()) return;

      try {
        new URL(value.trim());
      } catch {
        throw new Error(`Invalid ${fieldName} URL`);
      }
    };

    validateSocialUrl(companyData.instagram, "Instagram");
    validateSocialUrl(companyData.twitter, "Twitter");
    validateSocialUrl(companyData.linkedin, "LinkedIn");
    validateSocialUrl(companyData.facebook, "Facebook");

    // ==============================
    // Create Company
    // ==============================
    const company = new CompanyMaster({
      ...companyData,

      // Store normalized values
      companyName: companyData.companyName.trim(),
      address: companyData.address.trim(),
      contactNumber: companyData.contactNumber.trim(),
      companyEmail: companyData.companyEmail.trim().toLowerCase(),
      numberOfEmployee: companyData.numberOfEmployee.trim(),
      companyType: companyData.companyType.trim(),
      gstNumber: companyData.gstNumber.trim().toUpperCase(),
      aboutCompany: companyData.aboutCompany.trim(),
      city: companyData.city.trim(),
      state: companyData.state.trim(),
      country: companyData.country.trim(),
    });

    return await company.save();
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
}

export async function getCompanyService() {
  try {
    return await CompanyMaster.find({
      isActive: true,
      isDisplay: true,
    }).populate("recruiterId");
  } catch (error) {
    console.error("Error getting companies:", error);
    throw error;
  }
}

export async function getCompanyByIdService(id: string) {
  try {
    return await CompanyMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    }).populate("recruiterId");
  } catch (error) {
    console.error(`Error getting company with id ${id}:`, error);
    throw error;
  }
}

export async function updateCompanyService(
  id: string,
  updateData: Partial<ICompanyMaster>,
) {
  try {
    return await CompanyMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    ).populate("recruiterId");
  } catch (error) {
    console.error(`Error updating company with id ${id}:`, error);
    throw error;
  }
}

export async function deleteCompanyService(id: string, deleteBy: string) {
  try {
    return await CompanyMaster.findOneAndUpdate(
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
    ).populate("recruiterId");
  } catch (error) {
    console.error(`Error deleting company with id ${id}:`, error);
    throw error;
  }
}

export async function getAllCompanyForAdminService() {
  try {
    return await CompanyMaster.find().populate("recruiterId");
  } catch (error) {
    console.error("Error getting companies for admin:", error);
    throw error;
  }
}
