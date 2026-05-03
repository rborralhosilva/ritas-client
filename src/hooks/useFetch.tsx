import { useState, useEffect } from "react";
import handleFetchError from "../utils/handleFetchError";

export const useFetchData = <T,>(path: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const baseApiUrl = import.meta.env.VITE_SERVER_API_URL;

      if (!baseApiUrl) {
        setData(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseApiUrl}/${path}`);
        if (!response.ok) {
          throw new Error(handleFetchError(response.status));
        }
        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          throw new Error("API response was not JSON.");
        }

        const result: T = await response.json();
        setData(result);
      } catch (err) {
        setError(
          (err as Error).message || "An error occurred while fetching data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { data, loading, error };
};
