import { ReactNode, useState, useMemo, useEffect } from "react";
import LoadingPage from "../../pages/Loading";
import { GeneralContext, Preferences } from "../GeneralContext";
import { SITE_OWNER_NAME, STATIC_PREFERENCES } from "../../config/staticSite";

interface GeneralProviderProps {
  children: ReactNode;
}

export const GeneralProvider: React.FC<GeneralProviderProps> = ({
  children,
}) => {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiConnected, setApiConnected] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);

  const fetchPreferences = useMemo(() => {
    const fetchPreferencesFromServer = async () => {
      const endpoint = "/preferences";
      const baseApiUrl = import.meta.env.VITE_SERVER_API_URL;

      if (!baseApiUrl) {
        setPreferences(STATIC_PREFERENCES);
        setApiConnected(false);
        setStatus(null);
        setLoading(false);
        return;
      }

      const apiUrl = `${baseApiUrl}${endpoint}`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          if (response.status === 429) {
            setStatus(429);
          } else {
            throw new Error(
              `Error fetching preferences: ${response.statusText}`
            );
          }
        } else {
          const contentType = response.headers.get("content-type");
          if (!contentType?.includes("application/json")) {
            throw new Error("Preferences response was not JSON.");
          }

          const data = await response.json();
          setPreferences({
            ...data,
            artists_name: SITE_OWNER_NAME,
          });
          setApiConnected(true);
          setStatus(null);
        }
      } catch (error: unknown) {
        console.warn(
          "Using static site data because the API is unavailable.",
          error
        );
        setPreferences(STATIC_PREFERENCES);
        setApiConnected(false);
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };

    return fetchPreferencesFromServer;
  }, []);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  return (
    <GeneralContext.Provider
      value={{
        preferences,
        setPreferences,
        loading,
        setLoading,
        apiConnected,
      }}
    >
      {loading ? (
        <LoadingPage />
      ) : status === 429 ? (
        <p className="font-monospace">
          You have been timed-out. Please try again later.
        </p>
      ) : (
        children
      )}
    </GeneralContext.Provider>
  );
};
