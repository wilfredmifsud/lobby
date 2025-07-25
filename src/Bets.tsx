import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Paper, Title, Divider, Table, Text } from '@mantine/core';
import React from 'react';

const Bets = React.memo(() => {
  const bets = useSelector((state: RootState) => state.bets.history);

  return (
    <Paper shadow="md" radius="md" p="xl" style={{ flex: 1, minWidth: 280, overflowX: 'auto' }}>
      <Title order={4} mb="md">Live Bets</Title>
      <Divider my="sm" />
      <Table striped highlightOnHover withColumnBorders>
  <Table.Thead>
    <Table.Tr>
      <Table.Th>Round</Table.Th>
      <Table.Th>Move</Table.Th>
      <Table.Th>Dealer</Table.Th>
      <Table.Th>Amount</Table.Th>
      <Table.Th>Result</Table.Th>
      <Table.Th>Wallet</Table.Th> {/* ✅ new */}
    </Table.Tr>
  </Table.Thead>
  <Table.Tbody>
    {bets.map((bet) => (
      <Table.Tr key={bet.round}>
        <Table.Td>{String(bet.round).slice(-6)}</Table.Td>
        <Table.Td>{bet.bet.toUpperCase()}</Table.Td>
        <Table.Td>{bet.dealerMove.toUpperCase()}</Table.Td>
        <Table.Td>${bet.amount}</Table.Td>
        <Table.Td
          style={{ color: bet.result === "win" ? "lime" : bet.result === "lose" ? "red" : "yellow" }}
        >
          {bet.result.toUpperCase()}
        </Table.Td>
        <Table.Td>${bet.wallet}</Table.Td> {/* ✅ new */}
      </Table.Tr>
    ))}
  </Table.Tbody>
</Table>
    </Paper>
  );
});

export default Bets;
