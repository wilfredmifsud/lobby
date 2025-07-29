export interface LobbyFooterProps {
  betPositions: string[];
  loading: boolean;
  lastRound: LastRound | null;
  onChoice: (move: string) => void;
  onClear: () => void;
  onPlay: () => void;
}

export interface HeaderProps {
  wallet: number;
  bet: number;
  win: number;
}

export interface LobbyFooterControlsProps {
  choices: string[];
  bets: { move: string }[];
  loading: boolean;
  wallet: number;
  handleChoice: (move: string) => void;
  handleClear: () => void;
}

export type GameResult = "win" | "lose" | "draw";

export interface Bet {
  user: string;
  bet: string;
  dealerMove: string;
  result: GameResult;
  wallet: number;
  round: number;
}

export interface BetResult {
  move: string;
  result: 'win' | 'lose' | 'tie';
  returned: number;
}

export interface LastRound {
  dealerMove: string;
  bets: BetResult[];
  payout: number;
}

export interface BetsState {
  wallet: number;
  betPositions: string[]; 
  loading: boolean;
  lastRound: LastRound | null;
  connectionError: string | null;
}

export interface IBetsProps {
  lastRound: LastRound | null;
}

export interface ChoiceCardProps {
  move: string;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}