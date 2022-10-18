export interface ICustomError extends Error {
  message: string;
  error: object;
}
