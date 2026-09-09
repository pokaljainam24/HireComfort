import http from "./http";

export function createCrudApi<T>(resourcePath: string) {
  return {
    getAll: async (): Promise<T[]> => {
      const { data } = await http.get<T[]>(resourcePath);
      return data;
    },
    getOne: async (id: string): Promise<T> => {
      const { data } = await http.get<T>(`${resourcePath}/${id}`);
      return data;
    },
    create: async (payload: Partial<T>): Promise<T> => {
      const { data } = await http.post<T>(resourcePath, payload);
      return data;
    },
    update: async (id: string, payload: Partial<T>): Promise<T> => {
      const { data } = await http.put<T>(`${resourcePath}/${id}`, payload);
      return data;
    },
    remove: async (id: string): Promise<void> => {
      await http.delete(`${resourcePath}/${id}`);
    },
  };
}
