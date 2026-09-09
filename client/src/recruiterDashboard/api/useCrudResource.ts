import { useCallback, useEffect, useState } from "react";

interface CrudApi<T> {
  getAll: () => Promise<T[]>;
  create: (payload: Partial<T>) => Promise<T>;
  update: (id: string, payload: Partial<T>) => Promise<T>;
  remove: (id: string) => Promise<void>;
}

export function useCrudResource<T extends { _id: string }>(api: CrudApi<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getAll();
      setRows(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load records");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const create = async (payload: Partial<T>) => {
    const created = await api.create(payload);
    setRows((r) => [created, ...r]);
    return created;
  };

  const update = async (id: string, payload: Partial<T>) => {
    const updated = await api.update(id, payload);
    setRows((r) => r.map((row) => (row._id === id ? updated : row)));
    return updated;
  };

  const remove = async (id: string) => {
    await api.remove(id);
    setRows((r) => r.filter((row) => row._id !== id));
  };

  return { rows, loading, error, reload: load, create, update, remove };
}
