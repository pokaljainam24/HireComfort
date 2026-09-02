import { Country } from "@/types/country";
import { StateItem } from "@/types/state";
import { JobCategory } from "@/types/jobCategory";
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

export const seedJobCategories: JobCategory[] = [
  { id: "jc_it", name: "Information Technology", description: "Software & IT roles", icon: "💻" },
  { id: "jc_hr", name: "Human Resources", description: "HR & recruitment roles", icon: "🧑\u200d💼" },
  { id: "jc_mk", name: "Marketing", description: "Marketing & growth roles", icon: "📣" },
];

export { genId };
