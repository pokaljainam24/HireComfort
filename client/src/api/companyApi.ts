import api from "./axios";

export interface Company {
  _id: string;
  recruiterId?: string;
  companyName: string;
  address: string;
  contactNumber?: string;
  companyEmail?: string;
  numberOfEmployee?: string;
  companyType?: string;
  website?: string;
  companyLogo?: string;
  bannerImage?: string;
  aboutCompany?: string;
  city?: number;
  state?: number;
  country?: number;
  isActive?: boolean;
  isDisplay?: boolean;
  [key: string]: any;
}

export interface FetchCompaniesParams {
  page?: number;
  limit?: number;
  searchQuery?: string;
  category?: string;
  subCategory?: string;
  categories?: string[];
  subCategories?: string[];
  sortBy?: string;
}

export interface FetchCompaniesResponse {
  companies: Company[];
  totalCompanies: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export const fetchAllCompanies = async (
  params?: FetchCompaniesParams
): Promise<FetchCompaniesResponse> => {
  try {
    const queryParams: Record<string, any> = {};
    if (params) {
      if (params.page) queryParams.page = params.page;
      if (params.limit) queryParams.limit = params.limit;
      if (params.searchQuery) queryParams.searchQuery = params.searchQuery;
      if (params.category) queryParams.category = params.category;
      if (params.subCategory) queryParams.subCategory = params.subCategory;
      if (params.sortBy) queryParams.sortBy = params.sortBy;
      if (params.categories && params.categories.length > 0) {
        queryParams.categories = params.categories.join(",");
      }
      if (params.subCategories && params.subCategories.length > 0) {
        queryParams.subCategories = params.subCategories.join(",");
      }
    }

    const response = await api.get("/companies", { params: queryParams });
    const data = response.data;

    if (Array.isArray(data)) {
      return {
        companies: data,
        totalCompanies: data.length,
        totalPages: 1,
        currentPage: 1,
        limit: data.length,
      };
    }

    const companies = data.companies || data.data || [];
    const totalCompanies =
      data.totalCompanies ?? data.total ?? companies.length;
    const totalPages = data.totalPages ?? 1;
    const currentPage = data.currentPage ?? 1;
    const limit = data.limit ?? 12;

    return {
      companies,
      totalCompanies,
      totalPages,
      currentPage,
      limit,
    };
  } catch (error) {
    console.error("Error fetching companies:", error);
    return {
      companies: [],
      totalCompanies: 0,
      totalPages: 1,
      currentPage: 1,
      limit: 12,
    };
  }
};

export const fetchCompanyById = async (id: string): Promise<Company | null> => {
  try {
    const response = await api.get(`/companies/${id}`);
    return response.data.company || response.data;
  } catch (error) {
    console.error("Error fetching company details:", error);
    return null;
  }
};
