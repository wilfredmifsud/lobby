// components/BetsPanel.tsx

import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Paper, Title, Divider, Table, Box } from "@mantine/core";
import WalletDisplay from "./Wallet";

export default function BetsPanel() {
  const { history, wallet } = useSelector((state: RootState) => state.bets);

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <WalletDisplay wallet={wallet} />

      <Paper
        shadow="md"
        radius="md"
        p="xl"
        style={{ flex: 1, minWidth: 280, overflowX: "auto" }}
      >
        <Title order={2} mb="md">
          Your Bets
        </Title>
        <Divider my="sm" />

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
      </Paper>
    </Box>
  );
}
