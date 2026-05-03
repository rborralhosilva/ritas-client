import handleFetchError from "./handleFetchError";

export const fetchData = async <T>(path: string): Promise<T> => {
  const baseApiUrl = import.meta.env.VITE_SERVER_API_URL;

  if (!baseApiUrl) {
    throw new Error("API is not configured.");
  }

  const response = await fetch(`${baseApiUrl}/${path}`);
  if (!response.ok) handleFetchError(response.status);
  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    throw new Error("API response was not JSON.");
  }

  const data: T = await response.json();
  return data;
};
