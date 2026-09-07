import axios from "axios";

import type { Contact, ContactForm } from "@/types/contact";

const API_URL = "http://localhost:5000/api/contacts";

// =====================================
// Get Contacts
// =====================================

export const getContacts = async (): Promise<Contact[]> => {
  const response = await axios.get(API_URL);

  console.log("GET CONTACT API RESPONSE:", response.data);

  return (
    response.data.contact || response.data.contacts || response.data.data || []
  );
};

// =====================================
// Get Contact By ID
// =====================================

export const getContactById = async (id: string): Promise<Contact> => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data.contact;
};

// =====================================
// Create Contact
// =====================================

export const createContact = async (form: ContactForm): Promise<Contact> => {
  const response = await axios.post(API_URL, form);

  return response.data.contact;
};

// =====================================
// Update Contact
// =====================================

export const updateContact = async (
  id: string,
  form: ContactForm,
): Promise<Contact> => {
  const response = await axios.put(`${API_URL}/${id}`, form);

  return response.data.contact;
};

// =====================================
// Delete Contact
// =====================================

export const deleteContact = async (id: string): Promise<Contact> => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data.contact;
};
