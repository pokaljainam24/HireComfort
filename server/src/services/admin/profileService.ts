import AdminProfile from "../../models/admin/profileModel.js";

export const getProfileService = async () => {
    return await AdminProfile.findOne();
};

export const updateProfileService = async (data: any) => {
    return await AdminProfile.findOneAndUpdate({}, data, { new: true });
};
