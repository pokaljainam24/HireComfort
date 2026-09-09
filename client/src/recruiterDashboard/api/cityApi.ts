import type { City } from "../types/city.ts";
import { createCrudApi } from "./crudApi";

export const cityApi = createCrudApi<City>("/cities");
