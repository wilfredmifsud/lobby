import { GameResult } from "./model";

export const getResultText = (
  win: boolean | null,
  playerMove: string,
  dealerMove: string,
): GameResult => {
  if (playerMove === dealerMove) return "draw";
  return win ? "win" : "lose";
};
