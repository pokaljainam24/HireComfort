import { createCrudApi } from "./crudApi";
import { City } from "@/types/city";

export const cityApi = createCrudApi<City>("/cities");
