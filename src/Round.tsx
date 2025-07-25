import {
    Box,
    Group,
    Title,
    Text,
    Avatar,
    Center,
    Image
  } from "@mantine/core";
  import { LastRound } from "./betSlice";
import { moveIconMap } from "./const";
  
  interface IBetsProps {
    lastRound: LastRound | null;
  }
  
  const Round = ({ lastRound }: IBetsProps) => {
    if (!lastRound) {
      return (
        <Center
          style={{
            minHeight: 300,
            minWidth: 600,
            background: "var(--mantine-color-dark-5)",
            borderRadius: 12,
            padding: 24,
            animation: "fadeSlideIn 0.4s ease-out",
          }}
        >
          <Title order={2} c="gray">
            SELECT ONE AND START YOUR FIRST BET!!
          </Title>
        </Center>
      );
    }
  
    return (
      <Box
        className="last-round-container"
        style={{
          minWidth: '100%',
          height: '100%',
          textAlign: "center",
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
          borderRadius: 12,
          background: "var(--mantine-color-dark-5)",
          animation: "fadeSlideIn 0.4s ease-out",
        }}
      >
        <Title
          fw={900}
          size={36}
          style={{
            color:
              lastRound.result === "win"
                ? "var(--mantine-color-green-5)"
                : lastRound.result === "lose"
                ? "var(--mantine-color-red-5)"
                : "var(--mantine-color-yellow-5)",
            animation: "fadeSlideIn 0.3s ease-in",
          }}
        >
          {lastRound.result.toUpperCase()}!
        </Title>
  
        <Group justify="center" mt="xl" align="flex-start" style={{ gap: 64 }}>
          {/* Player Side */}
          <Box style={{ flex: 1, textAlign: "center" }}>
              <Image
                src="https://cdn4.iconfinder.com/data/icons/gambling-39/340/gambler_gambling_casino_player_poker_man-512.png"
                alt="Player"
                height={128}
                width={128}
                fit="contain"
              />
            <Title fw={600} mt="md">
              YOU
            </Title>
            <Box mt="md">{moveIconMap[lastRound.playerMove].largeIcon}</Box>
            <Text mt="sm" c="dimmed">
              {lastRound.playerMove.toUpperCase()}
            </Text>
          </Box>
  
          {/* Dealer Side */}
          <Box style={{ flex: 1, textAlign: "center" }}>
              <Image
                src="https://static.thenounproject.com/png/casino-dealer-icon-1454025-512.png"
                alt="Dealer"
                height={128}
                width={128}
                fit="contain"
              />
            <Title fw={600} mt="md">
              DEALER
            </Title>
            <Box mt="md">{moveIconMap[lastRound.dealerMove].largeIcon}</Box>
            <Text mt="sm" c="dimmed">
              {lastRound.dealerMove.toUpperCase()}
            </Text>
          </Box>
        </Group>
      </Box>
    );
  };
  
  export default Round;
  