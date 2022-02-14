import { useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import createPersistedState from "use-persisted-state";

const useLanguageState = createPersistedState("language");

export function useLanguage(): {
  language: String;
  setLanguage: (value: String) => void;
} {
  const systemPrefersIcelandic = useMediaQuery(
    {
      query: "(prefers-language: is)",
    },
    undefined
  );
  const [language, setLanguage] = useLanguageState();
  const value = useMemo(
    () => (language === undefined ? !!systemPrefersIcelandic : language),
    [language, systemPrefersIcelandic]
  );
  return {
    language: value,
    setLanguage,
  };
}
