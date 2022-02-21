import { useMemo } from "react";
import createPersistedState from "use-persisted-state";

const useDifficultyState = createPersistedState("difficulty");

export function useDifficulty(): {
  difficulty: String;
  setDifficulty: (value: String) => void;
} {
  //Easy is the default difficulty
  const easyDiffculty = "easy";
  const [difficulty, setDifficulty] = useDifficultyState();
  const value = useMemo(
    () => (difficulty === undefined ? easyDiffculty : difficulty),
    [difficulty, easyDiffculty]
  );

  return {
    difficulty: value,
    setDifficulty,
  };
}
