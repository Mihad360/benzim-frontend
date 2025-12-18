/* eslint-disable @typescript-eslint/no-explicit-any */
export type IMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse = {
  data: any;
  meta?: IMeta;
};

export interface JwtPayload {
  userId: string;
  email: string;
  role: "user" | "admin" | string;
  exp: number; // expiration time (unix)
  iat: number; // issued at
}
