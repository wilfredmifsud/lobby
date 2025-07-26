export const LobbyFooterBoxStyle = {
  position: "absolute" as const,
  left: 0,
  right: 0,
  bottom: 0,
  padding: 24,
  background: "var(--mantine-color-dark-7)",
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  zIndex: 2,
};

export const LobbyFooterControlsWrapperStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: 8,
};

export const LobbyFooterSwitchesStyle = {
  display: "flex",
  flexDirection: "row" as const,
  alignItems: "center",
  gap: 20,
};
