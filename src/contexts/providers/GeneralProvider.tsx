import { ReactNode, useState, useMemo, useEffect } from "react";
import LoadingPage from "../../pages/Loading";
import { GeneralContext, Preferences } from "../GeneralContext";

interface GeneralProviderProps {
  children: ReactNode;
}

export const GeneralProvider: React.FC<GeneralProviderProps> = ({
  children,
}) => {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPreferences = useMemo(() => {
    const fetchPreferencesFromServer = async () => {
      const endpoint = "/preferences";
      const apiUrl = import.meta.env.VITE_SERVER_API_URL + endpoint;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          if (response.status === 429) {
            setStatus(429);
            setError(null); // Clear previous errors
          } else {
            throw new Error(
              `Error fetching preferences: ${response.statusText}`
            );
          }
        } else {
          const data = await response.json();
          setPreferences(data);
          setStatus(null); // Clear any previous error status
        }
      } catch (error: unknown) {
        // If an error occurs, display an appropriate message
        console.error(error);
        setError((error as Error).message || "An unexpected error occurred.");
      } finally {
        setLoading(false); // Set loading to false after trying to fetch
      }
    };

    return fetchPreferencesFromServer;
  }, []);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  return (
    <GeneralContext.Provider
      value={{ preferences, setPreferences, loading, setLoading }}
    >
      {loading ? (
        <LoadingPage />
      ) : status === 429 ? (
        <p className="font-monospace">
          You have been timed-out. Please try again later.
        </p>
      ) : error ? (
        <p className="font-monospace">Error: {error}</p>
      ) : (
        children
      )}
    </GeneralContext.Provider>
  );
};
