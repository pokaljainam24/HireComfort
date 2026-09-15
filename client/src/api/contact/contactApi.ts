import api from "../axios.ts";

// =====================================
// Contact Create Payload
// =====================================

export interface CreateContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  verificationToken: string;
}

// =====================================
// Send Contact OTP
// =====================================

export const sendContactOtpApi =
  async (
    email: string,
  ) => {
    const response =
      await api.post(
        "/contacts/send-otp",
        {
          email,
        },
      );

    return response.data;
  };

// =====================================
// Verify Contact OTP
// =====================================

export const verifyContactOtpApi =
  async (
    email: string,
    otp: string,
  ) => {
    const response =
      await api.post(
        "/contacts/verify-otp",
        {
          email,
          otp,
        },
      );

    return response.data;
  };

// =====================================
// Create Contact
// =====================================

export const createContactApi =
  async (
    data: CreateContactPayload,
  ) => {
    const response =
      await api.post(
        "/contacts",
        data,
      );

    return response.data;
  };

// =====================================
// Get All Contacts
// =====================================

export const getContactsApi =
  async () => {
    const response =
      await api.get(
        "/contacts",
      );

    return response.data;
  };

// =====================================
// Get Contact By ID
// =====================================

export const getContactByIdApi =
  async (
    id: string,
  ) => {
    const response =
      await api.get(
        `/contacts/${id}`,
      );

    return response.data;
  };

// =====================================
// Update Contact
// =====================================

export const updateContactApi =
  async (
    id: string,
    data: any,
  ) => {
    const response =
      await api.put(
        `/contacts/${id}`,
        data,
      );

    return response.data;
  };

// =====================================
// Delete Contact
// =====================================

export const deleteContactApi =
  async (
    id: string,
  ) => {
    const response =
      await api.delete(
        `/contacts/${id}`,
      );

    return response.data;
  };