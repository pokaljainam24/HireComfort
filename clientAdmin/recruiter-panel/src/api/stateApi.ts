import { createCrudApi } from "./crudApi";
import { StateItem } from "@/types/state";

export const stateApi = createCrudApi<StateItem>("/states");
