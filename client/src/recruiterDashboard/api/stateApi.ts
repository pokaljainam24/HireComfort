import type { StateItem } from "../types/state.ts";
import { createCrudApi } from "./crudApi";

export const stateApi = createCrudApi<StateItem>("/states");
