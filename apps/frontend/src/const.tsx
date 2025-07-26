import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

export const MOVE_OPTIONS = ["rock", "paper", "scissors"] as const;

export const MOVE_COLORS: Record<string, string> = {
  rock: "teal",
  paper: "blue",
  scissors: "red",
};

export const moveIconMap = {
  rock: {
    smallIcon: <FaHandRock size={28} />,
    largeIcon: <FaHandRock size={100} />,
  },
  paper: {
    smallIcon: <FaHandPaper  size={28} />,
    largeIcon: <FaHandPaper size={100} />,
  },
  scissors: {
    smallIcon: <FaHandScissors  size={28} />,
    largeIcon: <FaHandScissors size={100} />,
  },
};


export const getMoveIcon = (move: string, size: "small" | "large") => {
  const icon = moveIconMap[move as keyof typeof moveIconMap];
  return size === "small" ? icon.smallIcon : icon.largeIcon;
} 

export const PRESET_BET_AMOUNTS = [1, 5, 10, 20, 50, 100];
