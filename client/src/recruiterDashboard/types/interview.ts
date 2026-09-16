
export interface InterviewRound {
  _id: string;

  applicantId: string;
  jobMasterId: string;
  companyId: string;

  remark?: string;

  status: string;

  round: number;

  createdAt: string;
  updatedAt: string;
}

export interface CreateInterviewRoundData {
  applicantId: string;
  jobMasterId: string;
  companyId: string;

  remark?: string;

  status: string;

  round: number;
}

export interface UpdateInterviewRoundData {
  applicantId?: string;
  jobMasterId?: string;
  companyId?: string;

  remark?: string;

  status?: string;

  round?: number;
}

export interface InterviewRoundResponse {
  success: boolean;
  message: string;
  data: InterviewRound;
}

export interface InterviewRoundsResponse {
  success: boolean;
  message: string;
  data: InterviewRound[];
}

