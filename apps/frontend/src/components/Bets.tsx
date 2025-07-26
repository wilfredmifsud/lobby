import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import {
  Paper,
  Title,
  Card,
  Text,
  Box,
  Stack,
  Group,
} from "@mantine/core";
import WalletDisplay from "./Wallet";
import { useMediaQuery } from "@mantine/hooks";

export default function BetsPanel() {
  const { history, wallet } = useSelector((state: RootState) => state.bets);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <WalletDisplay isMobile={isMobile} wallet={wallet} />

      <Paper shadow="md" radius="md" >
        <Title order={5} mb="md" p={10}>
          Your Bets (Last {history.length} Rounds)
        </Title>
        <Stack gap="xs" px="sm">
          {history.length ? (
            history.map((bet) => {
              const walletAfter = bet.wallet;
              const delta =
                bet.result === "win"
                  ? `+ $${bet.amount}`
                  : bet.result === "lose"
                    ? `- $${bet.amount}`
                    : "+ $0";

              const resultColor =
                bet.result === "win"
                  ? "green"
                  : bet.result === "lose"
                    ? "red"
                    : "yellow";

              const borderLeftColor =
                bet.result === "win"
                  ? "5px solid green"
                  : bet.result === "lose"
                    ? "5px solid red"
                    : "5px solid yellow";

              return (
                <Card
                  key={bet.round}
                  withBorder
                  radius="md"
                  padding="xs"
                  style={{ borderLeft: borderLeftColor }}
                >
                  <Group align="center" justify="space-between" dir="row">
                    <Group gap="xs">
                      <Text size="xs" fw={600}>
                        {new Date(bet.round).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          fractionalSecondDigits: 2,
                          hour12: false,
                        })}
                      </Text>
                      <Group gap="xs">
                        <Text size="xs" fw={600} c={resultColor}>
                          (YOU) {bet.bet.toUpperCase()} vs {bet.dealerMove.toUpperCase()} (DEALER)
                        </Text>
                      </Group>
                    </Group>

                    <Group>
                      <Stack gap={0} style={{ minWidth: 120 }}>
                        <Text size="xs">
                          <strong>
                            {bet.result === "draw"
                              ? "No change:"
                              : bet.result === "win"
                                ? "Amount won:"
                                : "Amount lost:"}
                          </strong>
                        </Text>
                        <Text size="xs">
                          <strong>Balance:</strong>
                        </Text>
                      </Stack>

                      <Stack gap={0} align="flex-end" style={{ minWidth: 70 }}>
                        <Text size="xs" c={resultColor} fw={700}>
                          {delta}
                        </Text>
                        <Text size="xs">${walletAfter}</Text>
                      </Stack>
                    </Group>
                  </Group>
                </Card>
              );
            })
          ) : (
            <Text ta="center" py="sm">
              No Rounds Played
            </Text>
          )}
        </Stack>

      </Paper>
    </Box>
  );
}
