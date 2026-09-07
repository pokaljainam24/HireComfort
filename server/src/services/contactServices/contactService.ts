import ContactMaster from "../../models/ContactModel/ContactModel.js";

export type IContactMaster = InstanceType<typeof ContactMaster>;

// =====================================
// Create Contact
// =====================================

export async function createContactService(
  contactData: Partial<IContactMaster>,
) {
  try {
    // Name
    if (!contactData.name?.trim()) {
      throw new Error("Name is required");
    }

    // Email
    if (!contactData.email?.trim()) {
      throw new Error("Email is required");
    }

    // Phone
    if (!contactData.phone?.trim()) {
      throw new Error("Phone is required");
    }

    // Message
    if (!contactData.message?.trim()) {
      throw new Error("Message is required");
    }

    // Created By
    if (!contactData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    const contact = new ContactMaster({
      name: contactData.name.trim(),

      company: contactData.company?.trim() || "",

      email: contactData.email.trim(),

      phone: contactData.phone.trim(),

      message: contactData.message.trim(),

      isActive: true,
      isDisplay: true,

      createdBy: contactData.createdBy.trim(),

      updatedBy: null,

      deleteAt: null,
      deleteBy: null,
    });

    return await contact.save();
  } catch (error) {
    console.error("Error creating Contact:", error);

    throw error;
  }
}

// =====================================
// Get Contact
// =====================================

export async function getContactService() {
  try {
    return await ContactMaster.find({
      isActive: true,
      isDisplay: true,
    }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error getting Contact:", error);

    throw error;
  }
}

// =====================================
// Get Contact By ID
// =====================================

export async function getContactByIdService(id: string) {
  try {
    return await ContactMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(`Error getting Contact with id ${id}:`, error);

    throw error;
  }
}

// =====================================
// Update Contact
// =====================================

export async function updateContactService(
  id: string,
  updateData: Partial<IContactMaster>,
) {
  try {
    // Name
    if (!updateData.name?.trim()) {
      throw new Error("Name is required");
    }

    // Email
    if (!updateData.email?.trim()) {
      throw new Error("Email is required");
    }

    // Phone
    if (!updateData.phone?.trim()) {
      throw new Error("Phone is required");
    }

    // Message
    if (!updateData.message?.trim()) {
      throw new Error("Message is required");
    }

    return await ContactMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },
      {
        name: updateData.name.trim(),

        company: updateData.company?.trim() || "",

        email: updateData.email.trim(),

        phone: updateData.phone.trim(),

        message: updateData.message.trim(),

        updatedBy: updateData.updatedBy,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  } catch (error) {
    console.error(`Error updating Contact with id ${id}:`, error);

    throw error;
  }
}

// =====================================
// Delete Contact
// =====================================

export async function deleteContactService(
  id: string,
  deleteBy: string,
) {
  try {
    return await ContactMaster.findOneAndUpdate(
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
    console.error(`Error deleting Contact with id ${id}:`, error);

    throw error;
  }
}

// =====================================
// Get All Contact For Admin
// =====================================

export async function getAllContactForAdminService() {
  try {
    return await ContactMaster.find().sort({
      createdAt: -1,
    });
  } catch (error) {
    console.error("Error getting Contact for admin:", error);

    throw error;
  }
}