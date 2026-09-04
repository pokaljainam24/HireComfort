import { useState } from "react";

import { createApplicant } from "../ApplicantApi/applicantApis";

const ApplicantRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    userName: "",
    password: "",
    higherQualification: "",
    experience: "",
    skills: [] as string[],
    preferredLocation: [] as string[],
    address: "",
    state: "",
    dob: "",
    gender: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await createApplicant(formData);

      console.log("Applicant created:", response);

      alert("Registration successful!");

    } catch (error: any) {
      console.error("Registration error:", error);

      alert(error.message || "Registration failed");
    }
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />

      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
      />

      <input
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        placeholder="Username"
      />

      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
      />

      <button type="submit">
        Register
      </button>
    </form>
  );
};

export default ApplicantRegistration;

