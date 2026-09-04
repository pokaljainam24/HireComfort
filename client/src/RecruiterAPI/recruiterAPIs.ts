const API_URL = "http://localhost:5000/api";

/* =====================================================
   RECRUITER APIs
===================================================== */

/* CREATE RECRUITER */

export const createRecruiter = async (recruiterData: any) => {
  try {
    const response = await fetch(`${API_URL}/recruiters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recruiterData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to create recruiter"
      );
    }

    return data;
  } catch (error) {
    console.error("Create recruiter API error:", error);
    throw error;
  }
};


/* GET ALL RECRUITERS */

export const getRecruiters = async () => {
  try {
    const response = await fetch(`${API_URL}/recruiters`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to get recruiters"
      );
    }

    return data;
  } catch (error) {
    console.error("Get recruiters API error:", error);
    throw error;
  }
};


/* GET RECRUITER BY ID */

export const getRecruiterById = async (id: string) => {
  try {
    const response = await fetch(
      `${API_URL}/recruiters/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to get recruiter"
      );
    }

    return data;
  } catch (error) {
    console.error("Get recruiter API error:", error);
    throw error;
  }
};


/* UPDATE RECRUITER */

export const updateRecruiter = async (
  id: string,
  recruiterData: any
) => {
  try {
    const response = await fetch(
      `${API_URL}/recruiters/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recruiterData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update recruiter"
      );
    }

    return data;
  } catch (error) {
    console.error("Update recruiter API error:", error);
    throw error;
  }
};


/* DELETE RECRUITER */

export const deleteRecruiter = async (id: string) => {
  try {
    const response = await fetch(
      `${API_URL}/recruiters/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete recruiter"
      );
    }

    return data;
  } catch (error) {
    console.error("Delete recruiter API error:", error);
    throw error;
  }
};


/* =====================================================
   COMPANY APIs
===================================================== */

/* CREATE COMPANY */

export const createCompany = async (companyData: any) => {
  try {
    const response = await fetch(`${API_URL}/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to create company"
      );
    }

    return data;
  } catch (error) {
    console.error("Create company API error:", error);
    throw error;
  }
};


/* GET ALL COMPANIES */

export const getCompanies = async () => {
  try {
    const response = await fetch(`${API_URL}/companies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to get companies"
      );
    }

    return data;
  } catch (error) {
    console.error("Get companies API error:", error);
    throw error;
  }
};


/* GET COMPANY BY ID */

export const getCompanyById = async (id: string) => {
  try {
    const response = await fetch(
      `${API_URL}/companies/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to get company"
      );
    }

    return data;
  } catch (error) {
    console.error("Get company API error:", error);
    throw error;
  }
};


/* UPDATE COMPANY */

export const updateCompany = async (
  id: string,
  companyData: any
) => {
  try {
    const response = await fetch(
      `${API_URL}/companies/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update company"
      );
    }

    return data;
  } catch (error) {
    console.error("Update company API error:", error);
    throw error;
  }
};


/* DELETE COMPANY */

export const deleteCompany = async (id: string) => {
  try {
    const response = await fetch(
      `${API_URL}/companies/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete company"
      );
    }

    return data;
  } catch (error) {
    console.error("Delete company API error:", error);
    throw error;
  }
};


/* =====================================================
   JOB APIs
===================================================== */

/* CREATE JOB */

export const createJob = async (jobData: any) => {
  try {
    const response = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to create job"
      );
    }

    return data;
  } catch (error) {
    console.error("Create job API error:", error);
    throw error;
  }
};


/* GET ALL JOBS */

export const getJobs = async () => {
  try {
    const response = await fetch(`${API_URL}/jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to get jobs"
      );
    }

    return data;
  } catch (error) {
    console.error("Get jobs API error:", error);
    throw error;
  }
};


/* GET JOB BY ID */

export const getJobById = async (id: string) => {
  try {
    const response = await fetch(
      `${API_URL}/jobs/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to get job"
      );
    }

    return data;
  } catch (error) {
    console.error("Get job API error:", error);
    throw error;
  }
};


/* UPDATE JOB */

export const updateJob = async (
  id: string,
  jobData: any
) => {
  try {
    const response = await fetch(
      `${API_URL}/jobs/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update job"
      );
    }

    return data;
  } catch (error) {
    console.error("Update job API error:", error);
    throw error;
  }
};


/* DELETE JOB */

export const deleteJob = async (id: string) => {
  try {
    const response = await fetch(
      `${API_URL}/jobs/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete job"
      );
    }

    return data;
  } catch (error) {
    console.error("Delete job API error:", error);
    throw error;
  }
}; 