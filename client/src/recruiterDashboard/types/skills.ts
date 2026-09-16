export interface Skills {
  _id: string;

  skillId: string;
  name: string;
  category: string;
  description: string;

  // Status
  isActive: boolean;
  isDisplay: boolean;

  // Audit
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string | null;

  // Soft Delete
  deleteAt: string | null;
  deleteBy: string | null;
}

// =====================================
// Create Skills
// =====================================

export interface CreateSkillsRequest {
  skillId: string;
  name: string;
  category: string;
  description?: string;
}

// =====================================
// Update Skills
// =====================================

export interface UpdateSkillsRequest {
  skillId?: string;
  name?: string;
  category?: string;
  description?: string;

  isActive?: boolean;
  isDisplay?: boolean;
}