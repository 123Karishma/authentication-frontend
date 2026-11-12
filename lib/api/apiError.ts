import axios from "axios";

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    throw new ApiError(
      error.response?.data?.message || "Something went wrong",
      error.response?.status || 500,
      error.response?.data,
    );
  }

  throw new ApiError("Unexpected error", 500);
}
