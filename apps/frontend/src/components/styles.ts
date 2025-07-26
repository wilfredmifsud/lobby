export const LobbyContainerStyle = {
  minHeight: "100vh",
  height: "100vh",
  display: "flex",
  flexDirection: "column" as const,
};

export const LobbyGroupStyle = {
  height: "100vh",
  flexDirection: "row" as const,
};

export const LobbyMainBoxStyle = (isMobile: boolean) => ({
  flex: 2,
  minHeight: 0,
  position: "relative" as const,
  display: "flex",
  flexDirection: "column" as const,
  height: "100%",
  paddingBottom: isMobile ? 120 : 0,
});

export const LobbyBurgerBoxStyle = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  zIndex: 10,
};

export const LobbyRoundBoxStyle = (isMobile: boolean) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column" as const,
  padding: isMobile ? 12 : 24,
  overflowY: "auto" as const,
  width: "100%",
});

export const LobbyDrawerPaperStyle = {
  flex: 1,
  minWidth: 280,
  minHeight: 0,
  height: "100%",
  overflow: "auto" as const,
  backgroundColor: "var(--mantine-color-dark-6)",
};

export const LobbyFooterBoxStyle = (isMobile: boolean) => ({
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

export const LobbyFooterControlsWrapperStyle = (isMobile: boolean) => ({
  display: "flex",
  flexDirection: isMobile ? "column" : "column",
  alignItems: "center",
  gap: 8,
  width: isMobile ? "100%" : "auto",
});

export const LobbyFooterSwitchesStyle = (isMobile: boolean) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 20,
  marginBottom: isMobile ? 8 : 0,
});

export const BetControlWrapperStyle = {
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

export const BetControlSelectedButtonStyle = {
  borderWidth: 3,
  borderColor: "#ccc",
};

export const WalletTextStyle = (isMobile: boolean) => ({
  fontSize: isMobile ? 16 : 50,
  color: "gold",
  animation: "walletChange 0.4s ease-in-out",
});
