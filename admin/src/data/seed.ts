import { Country } from "@/types/country";
import { StateItem } from "@/types/state";
import { genId } from "@/utils/id";

export const seedCountries: Country[] = [
  { id: "cty_in", name: "India", code: "IN" },
  { id: "cty_us", name: "United States", code: "US" },
  { id: "cty_gb", name: "United Kingdom", code: "GB" },
];

export const seedStates: StateItem[] = [
  { id: "st_gj", countryId: "cty_in", name: "Gujarat", code: "GJ" },
  { id: "st_mh", countryId: "cty_in", name: "Maharashtra", code: "MH" },
  { id: "st_ca", countryId: "cty_us", name: "California", code: "CA" },
];


export { genId };
