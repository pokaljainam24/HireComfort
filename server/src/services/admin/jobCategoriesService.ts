import jobCategoriesModel from "../../models/admin/jobCategoriesModel.js";

export const getJobCategories = async () => {
  return await jobCategoriesModel
    .find({
      deleteAt: null,
    })
    .sort({ createdAt: -1 });
};

export const getJobCategoryById = async (id: string) => {
  return await jobCategoriesModel.findOne({
    _id: id,
    deleteAt: null,
  });
};

export const getJobCategoryByName = async (name: string) => {
  return await jobCategoriesModel.findOne({
    name,
    deleteAt: null,
  });
};

export const createJobCategory = async (data: {
  name: string;
  description: string;
  icon: string;
  createdBy: string;
}) => {
  return await jobCategoriesModel.create({
    name: data.name,
    description: data.description,
    icon: data.icon,
    createdBy: data.createdBy,
  });
};

export const updateJobCategory = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    icon?: string;
    isActive?: boolean;
    isDisplay?: boolean;
    updatedBy?: string;
  },
) => {
  return await jobCategoriesModel.findOneAndUpdate(
    {
      _id: id,
      deleteAt: null,
    },
    {
      $set: {
        ...data,
        updatedAt: new Date(),
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

export const deleteJobCategory = async (id: string, deletedBy: string) => {
  return await jobCategoriesModel.findOneAndUpdate(
    {
      _id: id,
      deleteAt: null,
    },
    {
      $set: {
        deleteAt: new Date(),
        deleteBy: deletedBy,
        isActive: false,
        isDisplay: false,
      },
    },
    {
      new: true,
    },
  );
};
