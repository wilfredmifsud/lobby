export interface LobbyFooterProps {
  choice: string | null;
  loading: boolean;
  betAmount: number;
  autoplay: boolean;
  autoplayChecked: boolean;
  shuffle: boolean;
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
