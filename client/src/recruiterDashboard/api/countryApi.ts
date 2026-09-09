import type { Country } from "../types/country.ts";
import { createCrudApi } from "./crudApi";

export const countryApi = createCrudApi<Country>("/countries");
