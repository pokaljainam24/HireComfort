
import axios from "axios";

import type {
  InterviewRound,
  CreateInterviewRoundData,
  UpdateInterviewRoundData,
  InterviewRoundResponse,
  InterviewRoundsResponse,
} from "../../recruiterDashboard/types/interview.ts";

// =====================================
// Base URL
// =====================================

const API_URL = "http://localhost:5000/api/interview-rounds";

// =====================================
// Create
// =====================================

export async function createInterviewRoundApi(
  data: CreateInterviewRoundData,
): Promise<InterviewRound> {
  const response =
    await axios.post<InterviewRoundResponse>(
      API_URL,
      data,
    );

  return response.data.data;
}

// =====================================
// Get All
// =====================================

export async function getInterviewRoundsApi(): Promise<
  InterviewRound[]
> {
  const response =
    await axios.get<InterviewRoundsResponse>(
      API_URL,
    );

  return response.data.data;
}

// =====================================
// Get By ID
// =====================================

export async function getInterviewRoundByIdApi(
  id: string,
): Promise<InterviewRound> {
  const response =
    await axios.get<InterviewRoundResponse>(
      `${API_URL}/${id}`,
    );

  return response.data.data;
}

// =====================================
// Get By Applicant
// =====================================

export async function getInterviewRoundsByApplicantApi(
  applicantId: string,
): Promise<InterviewRound[]> {
  const response =
    await axios.get<InterviewRoundsResponse>(
      `${API_URL}/applicant/${applicantId}`,
    );

  return response.data.data;
}

// =====================================
// Get By Job
// =====================================

export async function getInterviewRoundsByJobApi(
  jobMasterId: string,
): Promise<InterviewRound[]> {
  const response =
    await axios.get<InterviewRoundsResponse>(
      `${API_URL}/job/${jobMasterId}`,
    );

  return response.data.data;
}

// =====================================
// Get By Company
// =====================================

export async function getInterviewRoundsByCompanyApi(
  companyId: string,
): Promise<InterviewRound[]> {
  const response =
    await axios.get<InterviewRoundsResponse>(
      `${API_URL}/company/${companyId}`,
    );

  return response.data.data;
}

// =====================================
// Update
// =====================================

export async function updateInterviewRoundApi(
  id: string,
  data: UpdateInterviewRoundData,
): Promise<InterviewRound> {
  const response =
    await axios.put<InterviewRoundResponse>(
      `${API_URL}/${id}`,
      data,
    );

  return response.data.data;
}

// =====================================
// Delete
// =====================================

export async function deleteInterviewRoundApi(
  id: string,
): Promise<InterviewRound> {
  const response =
    await axios.delete<InterviewRoundResponse>(
      `${API_URL}/${id}`,
    );

  return response.data.data;
}



