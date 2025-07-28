import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export default function ConnectionErrorOverlay() {
  const wsError = useSelector((state: RootState) => state.bets.connectionError);

  if (!wsError) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999999] bg-red-600 text-white px-4 py-3 text-center shadow-lg">
      <p className="text-lg font-bold">Connection Error</p>
      <p className="text-sm font-medium">{wsError}</p>
    </div>
  );
}
