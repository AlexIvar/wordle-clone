import { useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import createPersistedState from "use-persisted-state";

const useLanguageState = createPersistedState("language");

export function useLanguage(): {
  language: String;
  setLanguage: (value: String) => void;
} {
  //Icelandic is the default language
  const icelandicLanguage = "is";
  const [language, setLanguage] = useLanguageState();
  const value = useMemo(
    () => (language === undefined ? icelandicLanguage : language),
    [language, icelandicLanguage]
  );
  /*useEffect(() => {
    console.log(value);
  }, [value]);*/
  return {
    language: value,
    setLanguage,
  };
}
