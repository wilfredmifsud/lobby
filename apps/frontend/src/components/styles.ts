import type { CSSProperties } from "react";

export const LobbyContainerStyle: CSSProperties = {
  minHeight: "100vh",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
};

export const LobbyGroupStyle: CSSProperties = {
  height: "100vh",
  display: "flex",
  flexDirection: "row",
};

export const LobbyMainBoxStyle = (isMobile: boolean): CSSProperties => ({
  flex: 2,
  minHeight: 0,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  paddingBottom: isMobile ? 120 : 0,
});

export const LobbyBurgerBoxStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 10,
};

export const LobbyRoundBoxStyle = (isMobile: boolean): CSSProperties => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: isMobile ? 12 : 24,
  overflowY: "auto",
  width: "100%",
});

export const LobbyDrawerPaperStyle: CSSProperties = {
  flex: 1,
  minWidth: 280,
  minHeight: 0,
  height: "100%",
  overflow: "auto",
  backgroundColor: "var(--mantine-color-dark-6)",
};

export const LobbyFooterBoxStyle = (isMobile: boolean): CSSProperties => ({
  position: isMobile ? "fixed" : "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  padding: isMobile ? 16 : 24,
  background: "var(--mantine-color-dark-7)",
  borderTopLeftRadius: isMobile ? 12 : 0,
  borderTopRightRadius: isMobile ? 12 : 0,
  borderBottomLeftRadius: isMobile ? 0 : 12,
  borderBottomRightRadius: isMobile ? 0 : 12,
  zIndex: 999,
});

export const LobbyFooterControlsWrapperStyle = (isMobile: boolean): CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  width: isMobile ? "100%" : "auto",
});

export const LobbyFooterSwitchesStyle = (isMobile: boolean): CSSProperties => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 20,
  marginBottom: isMobile ? 8 : 0,
});

export const BetControlWrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
};

export const BetControlNumberInputStyles = {
  input: {
    width: 140,
    height: 50,
    fontSize: 20,
    fontWeight: 700,
    textAlign: "center" as const,
  },
  label: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
  },
};

export const BetControlSelectedButtonStyle: CSSProperties = {
  borderWidth: 3,
  borderColor: "#ccc",
};

export const WalletTextStyle = (isMobile: boolean): CSSProperties => ({
  fontSize: isMobile ? 16 : 50,
  color: "gold",
});
