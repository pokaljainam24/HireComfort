import FaqMaster from "../../models/FaqModel/Faqmodel.js";

export type IFaqMaster = InstanceType<typeof FaqMaster>;

// =====================================
// Create FAQ
// =====================================

export async function createFaqService(faqData: Partial<IFaqMaster>) {
  try {
    // ==============================
    // Question Validation
    // ==============================

    if (!faqData.que?.trim()) {
      throw new Error("Question is required");
    }

    if (faqData.que.trim().length < 5) {
      throw new Error("Question must contain at least 5 characters");
    }

    // ==============================
    // Answer Validation
    // ==============================

    if (!faqData.ans?.trim()) {
      throw new Error("Answer is required");
    }

    if (faqData.ans.trim().length < 2) {
      throw new Error("Answer must contain at least 2 characters");
    }

    // ==============================
    // Created By Validation
    // ==============================

    if (!faqData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // ==============================
    // Duplicate Question Validation
    // ==============================

    const existingFaq = await FaqMaster.findOne({
      que: faqData.que.trim(),
      isActive: true,
      isDisplay: true,
    });

    if (existingFaq) {
      throw new Error("FAQ with this question already exists");
    }

    // ==============================
    // Create FAQ
    // ==============================

    const faq = new FaqMaster({
      ...faqData,

      // Store normalized values
      que: faqData.que.trim(),
      ans: faqData.ans.trim(),
    });

    return await faq.save();
  } catch (error) {
    console.error("Error creating FAQ:", error);
    throw error;
  }
}

// =====================================
// Get Active FAQs
// =====================================

export async function getFaqService() {
  try {
    return await FaqMaster.find({
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error("Error getting FAQs:", error);
    throw error;
  }
}

// =====================================
// Get FAQ By ID
// =====================================

export async function getFaqByIdService(id: string) {
  try {
    return await FaqMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(`Error getting FAQ with id ${id}:`, error);

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
    // ==============================
    // Question Validation
    // ==============================

    if (!updateData.que?.trim()) {
      throw new Error("Question is required");
    }

    if (updateData.que.trim().length < 5) {
      throw new Error("Question must contain at least 5 characters");
    }

    // ==============================
    // Answer Validation
    // ==============================

    if (!updateData.ans?.trim()) {
      throw new Error("Answer is required");
    }

    if (updateData.ans.trim().length < 2) {
      throw new Error("Answer must contain at least 2 characters");
    }

    // ==============================
    // Duplicate Question Validation
    // ==============================

    const existingFaq = await FaqMaster.findOne({
      que: updateData.que.trim(),
      _id: { $ne: id },
      isActive: true,
      isDisplay: true,
    });

    if (existingFaq) {
      throw new Error("FAQ with this question already exists");
    }

    // ==============================
    // Update FAQ
    // ==============================

    return await FaqMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },
      {
        ...updateData,

        que: updateData.que.trim(),
        ans: updateData.ans.trim(),
      },
      {
        new: true,
        runValidators: true,
      },
    );
  } catch (error) {
    console.error(`Error updating FAQ with id ${id}:`, error);

    throw error;
  }
}

// =====================================
// Delete FAQ
// =====================================

export async function deleteFaqService(id: string, deleteBy: string) {
  try {
    return await FaqMaster.findOneAndUpdate(
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
    console.error(`Error deleting FAQ with id ${id}:`, error);

    throw error;
  }
}

// =====================================
// Get All FAQ For Admin
// =====================================

export async function getAllFaqForAdminService() {
  try {
    return await FaqMaster.find();
  } catch (error) {
    console.error("Error getting FAQs for admin:", error);

    throw error;
  }
}
