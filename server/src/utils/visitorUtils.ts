import crypto from "crypto";
import type { Request } from "express";

export const generateSessionId = (): string => {
  return crypto.randomUUID();
};

export const getClientIp = (req: Request): string => {
  return req.ip || "unknown";
};

export const hashIp = (ip: string): string => {
  const secret = process.env.IP_HASH_KEY;

  if (!secret) {
    throw new Error("IP_HASH_SECRET is not configured");
  }

  return crypto
    .createHmac("sha256", secret)
    .update(ip)
    .digest("hex");
};