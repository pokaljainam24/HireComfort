import { createCrudApi } from "./crudApi";
import { Country } from "@/types/country";

export const countryApi = createCrudApi<Country>("/countries");
