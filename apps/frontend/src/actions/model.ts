export interface WSInitMessage {
  type: "INIT";
  wallet: number;
}

export interface WSBetResultMessage {
  type: "BET_RESULT";
  dealerMove: string;
  bets: Array<{
    move: string;
    amount: number;
    result: 'win' | 'lose' | 'tie';
    returned: number;
  }>;
  wallet: number;
  round: number;
}

export interface WSNoCreditsMessage {
  type: "NO_CREDITS";
}

export interface WSErrorMessage {
  type: "ERROR";
  message: string;
}

export type WSMessage =
  | WSInitMessage
  | WSBetResultMessage
  | WSNoCreditsMessage
  | WSErrorMessage;

export type GameResult = "win" | "lose" | "draw";
