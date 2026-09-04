export interface Skills {
  _id: string;

  skillsTest: string;

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

export interface SkillsForm {
  skillsTest: string;
}
