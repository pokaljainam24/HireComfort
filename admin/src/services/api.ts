export const API_ROOT = "http://localhost:5000/api/admin";

export function getItems<T>(payload: unknown, key: string): T[] {
  if (Array.isArray(payload)) return payload;
  if (
    payload &&
    typeof payload === "object" &&
    key in payload &&
    Array.isArray((payload as any)[key])
  ) {
    return (payload as any)[key] as T[];
  }
  return [];
}
