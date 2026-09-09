import axios from "axios";

const API_URL = "http://localhost:5000/api/contacts";

// =====================================
// CREATE CONTACT
// =====================================

export const createContactApi = async (data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
}) => {
  const response = await axios.post(API_URL, data);

  return response.data;
};

// =====================================
// GET CONTACTS
// =====================================

export const getContactsApi = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// =====================================
// GET CONTACT BY ID
// =====================================

export const getContactByIdApi = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
};

// =====================================
// UPDATE CONTACT
// =====================================

export const updateContactApi = async (
  id: string,
  data: {
    name: string;
    company: string;
    email: string;
    phone: string;
    subject: string;
  },
) => {
  const response = await axios.put(`${API_URL}/${id}`, data);

  return response.data;
};

// =====================================
// DELETE CONTACT
// =====================================

export const deleteContactApi = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
};
