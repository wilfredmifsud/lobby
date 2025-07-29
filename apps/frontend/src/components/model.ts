export interface LobbyFooterProps {
  choices: string[];
  loading: boolean;
  handleChoice: (move: string) => void;
  handleClear: () => void;
  handlePlay: () => void;
}

export interface HeaderProps {
  wallet: number;
  bet: number;
  win: number;
}

export interface LobbyFooterControlsProps {
  choices: string[];
  bets: { move: string; amount: number }[];
  loading: boolean;
  wallet: number;
  handleChoice: (move: string) => void;
  handleClear: () => void;
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
}

export interface BetResult {
  move: string;
  amount: number;
  result: 'win' | 'lose' | 'tie';
  returned: number;
}

export interface LastRound {
  dealerMove: string;
  bets: BetResult[];
}

export interface BetsState {
  wallet: number;
  betAmount: number;
  choices: string[]; 
  bets: { move: string; amount: number }[];
  loading: boolean;
  lastRound: LastRound | null;
  connectionError: string | null;
  totalWon: number
}

export interface IBetsProps {
  lastRound: LastRound | null;
  totalWon: number
}

export interface ChoiceCardProps {
  move: string;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}