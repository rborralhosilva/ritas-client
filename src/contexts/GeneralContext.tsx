import { PreferencesSchema, UrlSchema } from "@jakubkanna/labguy-front-schema";
import { createContext } from "react";
import { MediaRef } from "../utils/helpers";

export interface Preferences extends PreferencesSchema {
  homepage_media: MediaRef;
  homepage_urls: UrlSchema[];
}

interface GeneralContextType {
  preferences: Preferences | null;
  setPreferences: React.Dispatch<React.SetStateAction<Preferences | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GeneralContext = createContext<GeneralContextType>({
  preferences: null,
  setPreferences: () => {},
  loading: true,
  setLoading: () => {},
});
