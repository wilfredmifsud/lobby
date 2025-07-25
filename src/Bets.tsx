import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Paper, Title, Divider, Table, Text } from '@mantine/core';
import React from 'react';

const Bets = React.memo(() => {
  const bets = useSelector((state: RootState) => state.bets.history);

  const rows = bets.map((bet) => (
    <Table.Tr key={bet.round}>
      <Table.Td><Text size="xs">{bet.round.toString().slice(-6)}</Text></Table.Td>
      <Table.Td>{bet.bet.toUpperCase()}</Table.Td>
      <Table.Td>{bet.dealerMove.toUpperCase()}</Table.Td>
      <Table.Td>${bet.amount}</Table.Td>
      <Table.Td>
        <Text
          fw={600}
          c={
            bet.result === 'win'
              ? 'green'
              : bet.result === 'lose'
              ? 'red'
              : 'yellow'
          }
        >
          {bet.result.toUpperCase()}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

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
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
});

export default Bets;
