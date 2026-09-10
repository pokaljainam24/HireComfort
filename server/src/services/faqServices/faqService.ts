import FaqMaster from "../../models/FaqModel/Faqmodel.js";

export type IFaqMaster = InstanceType<typeof FaqMaster>;

// =====================================
// Create FAQ
// =====================================

export async function createFaqService(
  faqData: Partial<IFaqMaster>,
) {
  try {
    // Question
    if (!faqData.que?.trim()) {
      throw new Error("FAQ question is required");
    }

    if (faqData.que.trim().length < 5) {
      throw new Error(
        "FAQ question must contain at least 5 characters",
      );
    }

    // Answer
    if (!faqData.ans?.trim()) {
      throw new Error("FAQ answer is required");
    }

    if (faqData.ans.trim().length < 2) {
      throw new Error(
        "FAQ answer must contain at least 2 characters",
      );
    }

    // Duplicate Question
    const existingFaq = await FaqMaster.findOne({
      que: faqData.que.trim(),

      isActive: true,
      isDisplay: true,
    });

    if (existingFaq) {
      throw new Error(
        "FAQ with this question already exists",
      );
    }

    // Created By
    if (!faqData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    const faq = new FaqMaster({
      que: faqData.que.trim(),

      ans: faqData.ans.trim(),

      isActive: true,
      isDisplay: true,

      createdBy: faqData.createdBy.trim(),

      updatedBy: null,

      deleteAt: null,
      deleteBy: null,
    });

    return await faq.save();
  } catch (error) {
    console.error("Error creating FAQ:", error);

    throw error;
  }
}

// =====================================
// Get FAQs
// =====================================

export async function getFaqService() {
  try {
    return await FaqMaster.find({
      isActive: true,
      isDisplay: true,
    }).sort({
      createdAt: -1,
    });
  } catch (error) {
    console.error("Error getting FAQs:", error);

    throw error;
  }
}

// =====================================
// Get FAQ By ID
// =====================================

export async function getFaqByIdService(
  id: string,
) {
  try {
    return await FaqMaster.findOne({
      _id: id,

      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(
      `Error getting FAQ with id ${id}: `,
      error,
    );

    throw error;
  }
}

// =====================================
// Update FAQ
// =====================================

export async function updateFaqService(
  id: string,
  updateData: Partial<IFaqMaster>,
) {
  try {
    // Question
    if (!updateData.que?.trim()) {
      throw new Error("FAQ question is required");
    }

    if (updateData.que.trim().length < 5) {
      throw new Error(
        "FAQ question must contain at least 5 characters",
      );
    }

    // Answer
    if (!updateData.ans?.trim()) {
      throw new Error("FAQ answer is required");
    }

    if (updateData.ans.trim().length < 2) {
      throw new Error(
        "FAQ answer must contain at least 2 characters",
      );
    }

    // Updated By
    if (!updateData.updatedBy?.trim()) {
      throw new Error("Updated by is required");
    }

    // Duplicate Question
    const existingFaq = await FaqMaster.findOne({
      _id: { $ne: id },

      que: updateData.que.trim(),

      isActive: true,
      isDisplay: true,
    });

    if (existingFaq) {
      throw new Error(
        "FAQ with this question already exists",
      );
    }

    const updatePayload: Partial<IFaqMaster> = {
      que: updateData.que.trim(),

      ans: updateData.ans.trim(),

      updatedBy: updateData.updatedBy.trim(),
    };

    return await FaqMaster.findOneAndUpdate(
      {
        _id: id,

        isActive: true,
        isDisplay: true,
      },

      updatePayload,

      {
        new: true,

        runValidators: true,
      },
    );
  } catch (error) {
    console.error(
      `Error updating FAQ with id ${id}: `,
      error,
    );

    throw error;
  }
}

// =====================================
// Delete FAQ
// =====================================

export async function deleteFaqService(
  id: string,
  deleteBy: string,
) {
  try {
    if (!deleteBy?.trim()) {
      throw new Error("Delete by is required");
    }

    return await FaqMaster.findOneAndUpdate(
      {
        _id: id,

        isActive: true,
      },

      {
        isActive: false,

        isDisplay: false,

        deleteAt: new Date(),

        deleteBy: deleteBy.trim(),
      },

      {
        new: true,
      },
    );
  } catch (error) {
    console.error(
      `Error deleting FAQ with id ${id}: `,
      error,
    );

    throw error;
  }
}

// =====================================
// Get All FAQs For Admin
// =====================================

export async function getAllFaqForAdminService() {
  try {
    return await FaqMaster.find().sort({
      createdAt: -1,
    });
  } catch (error) {
    console.error(
      "Error getting FAQs for admin:",
      error,
    );

    throw error;
  }
}