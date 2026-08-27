import CompanyMaster from "../../models/RecruiterModel/Companymodel.js";

export type ICompanyMaster = InstanceType<typeof CompanyMaster>;

export async function createCompanyService(
  companyData: Partial<ICompanyMaster>,
) {
  try {
    const company = new CompanyMaster(companyData);

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
