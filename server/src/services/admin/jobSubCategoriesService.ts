import JobSubCategory from "../../models/admin/jobSubCategoriesModel.js";

export const getJobSubCategories = async () => {
  return await JobSubCategory.find({
    deleteAt: null,
  })
    .populate("categoryId")
    .sort({ createdAt: -1 });
};

export const getJobSubCategoryById = async (id: string) => {
  return await JobSubCategory.findOne({
    _id: id,
    deleteAt: null,
  }).populate("categoryId");
};

export const getJobSubCategoryByNameAndCategoryId = async (
  name: string,
  categoryId: string,
) => {
  return await JobSubCategory.findOne({
    name,
    categoryId,
    deleteAt: null,
  });
};

export const createJobSubCategory = async (data: {
  name: string;
  description: string;
  icon: string;
  categoryId: string;
  createdBy: string;
}) => {
  return await JobSubCategory.create({
    name: data.name,
    description: data.description,
    icon: data.icon,
    categoryId: data.categoryId,
    createdBy: data.createdBy,
  });
};

export const updateJobSubCategory = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    icon?: string;
    categoryId?: string;
    isActive?: boolean;
    isDisplay?: boolean;
    updatedBy?: string;
  },
) => {
  return await JobSubCategory.findOneAndUpdate(
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

export const deleteJobSubCategory = async (id: string, deletedBy: string) => {
  return await JobSubCategory.findOneAndUpdate(
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
