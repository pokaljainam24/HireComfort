import { CompanyTypeMaster } from "../../models/CompanyModel/CompanyModel.js";

export async function createCompanyTypeService(data: {
  companyTypeId: string;
  code: string;
  name: string;
  description?: string;
}) {
  try {
    const companyType = await CompanyTypeMaster.create({
      companyTypeId: data.companyTypeId,
      code: data.code,
      name: data.name,
      description: data.description || "",
      isActive: true,
      isDisplay: true,
    });

    return companyType;
  } catch (error) {
    console.error("Error creating company type:", error);
    throw error;
  }
}

// GET ALL
export async function getCompanyTypesService() {
  try {
    const companyTypes = await CompanyTypeMaster.find().sort({
      name: 1,
    });

    return companyTypes;
  } catch (error) {
    console.error("Error getting company types:", error);
    throw error;
  }
}


export async function getCompanyTypeByIdService(id: string) {
  try {
    return await CompanyTypeMaster.findById(id);
  } catch (error) {
    console.error("Error getting company type:", error);
    throw error;
  }
}

export async function updateCompanyTypeService(
  id: string,
  data: {
    companyTypeId?: string;
    code?: string;
    name?: string;
    description?: string;
    isActive?: boolean;
    isDisplay?: boolean;
  }
) {
  try {
    return await CompanyTypeMaster.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error) {
    console.error("Error updating company type:", error);
    throw error;
  }
}

export async function deleteCompanyTypeService(id: string) {
  try {
    return await CompanyTypeMaster.findByIdAndUpdate(
      id,
      {
        $set: {
          deleteAt: new Date(),
          isActive: false,
          isDisplay: false,
        },
      },
      {
        new: true,
      }
    );
  } catch (error) {
    console.error("Error deleting company type:", error);
    throw error;
  }
}