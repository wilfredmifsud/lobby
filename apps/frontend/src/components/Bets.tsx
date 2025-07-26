// components/BetsPanel.tsx

import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import {
  Paper,
  Title,
  Divider,
  Table,
  Box,
  Card,
  Text,
  Stack,
} from "@mantine/core";
import WalletDisplay from "./Wallet";
import { useMediaQuery } from "@mantine/hooks";

export default function BetsPanel() {
  const { history, wallet } = useSelector((state: RootState) => state.bets);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <WalletDisplay isMobile={isMobile} wallet={wallet} />

      <Paper shadow="md" radius="md" style={{ overflowX: "auto" }}>
        <Title order={2} mb="md">
          Your Bets
        </Title>
        <Divider my="sm" />

        {isMobile ? (
          <Stack>
            {history.length ? (
              history.map((bet) => (
                <Card key={bet.round} withBorder padding="md" radius="md">
                  <Text size="sm" fw={700}>
                    Round #{String(bet.round).slice(-6)}
                  </Text>
                  <Text size="sm">Move: {bet.bet.toUpperCase()}</Text>
                  <Text size="sm">Dealer: {bet.dealerMove.toUpperCase()}</Text>
                  <Text size="sm">Amount: ${bet.amount}</Text>
                  <Text
                    size="sm"
                    fw={600}
                    c={
                      bet.result === "win"
                        ? "green"
                        : bet.result === "lose"
                          ? "red"
                          : "yellow"
                    }
                  >
                    Result: {bet.result.toUpperCase()}
                  </Text>
                  <Text size="sm">Wallet: ${bet.wallet}</Text>
                </Card>
              ))
            ) : (
              <Text align="center">No Rounds Played</Text>
            )}
          </Stack>
        ) : (
          <Table striped highlightOnHover withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Round</Table.Th>
                <Table.Th>Move</Table.Th>
                <Table.Th>Dealer</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Result</Table.Th>
                <Table.Th>Wallet</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {history.length ? (
                history.map((bet) => (
                  <Table.Tr key={bet.round}>
                    <Table.Td>{String(bet.round).slice(-6)}</Table.Td>
                    <Table.Td>{bet.bet.toUpperCase()}</Table.Td>
                    <Table.Td>{bet.dealerMove.toUpperCase()}</Table.Td>
                    <Table.Td>${bet.amount}</Table.Td>
                    <Table.Td
                      style={{
                        color:
                          bet.result === "win"
                            ? "lime"
                            : bet.result === "lose"
                              ? "red"
                              : "yellow",
                      }}
                    >
                      {bet.result.toUpperCase()}
                    </Table.Td>
                    <Table.Td>${bet.wallet}</Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={6} style={{ textAlign: "center" }}>
                    No Rounds Played
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}
