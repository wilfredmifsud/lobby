export interface LobbyFooterProps {
  choice: string | null;
  loading: boolean;
  betAmount: number;
  autoplay: boolean;
  autoplayChecked: boolean;
  shuffle: boolean;
  wallet: number;
  handleChoice: (move: string) => void;
  handlePlay: (manual: boolean) => void;
  onToggleAutoplay: (checked: boolean) => void;
  onToggleShuffle: (checked: boolean) => void;
}

export interface LobbyFooterControlsProps {
  choice: string | null;
  loading: boolean;
  betAmount: number;
  wallet: number;
  handleChoice: (move: string) => void;
}

export type GameResult = "win" | "lose" | "draw";

export interface Bet {
  user: string;
  amount: number;
  bet: string;
  dealerMove: string;
  result: GameResult;
  wallet: number;
  round: number;
};

export interface LastRound {
  playerMove: string;
  dealerMove: string;
  result: GameResult
}

export interface BetsState {
  wallet: number;
  betAmount: number;
  choice: string | null;
  loading: boolean;
  lastRound: LastRound | null;
  history: Bet[];
}


export interface IBetsProps {
  lastRound: LastRound | null;
}

export interface GameState {
  autoplay: boolean;
  autoplayChecked: boolean;
  shuffle: boolean;
  connectionError: string | null;
}
