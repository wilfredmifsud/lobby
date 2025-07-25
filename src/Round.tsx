import {
    Box,
    Group,
    Title,
    Text,
    Center,
    Card,
    Image,
    Avatar
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
  
    const isDraw = lastRound.result === "draw";
    const isPlayerWinner = lastRound.result === "win";
    const isDealerWinner = lastRound.result === "lose";
  
    const getCardBg = (isWinner: boolean) => {
        if (isDraw) return "linear-gradient(135deg, #2e2e2e, #1a1a1a)";
        if (isWinner) return "linear-gradient(135deg, #38a169, #22543d)";
        return "linear-gradient(135deg, #c53030, #742a2a)";
      };
  
    return (
      <Box
        style={{
          minWidth: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
          borderRadius: 12,
          background: "var(--mantine-color-dark-7)",
          animation: "fadeSlideIn 0.4s ease-out",
        }}
      >
        <Title
          fw={900}
          size={70}
          style={{
            marginBottom: 32,
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
  
        <Group justify="center" align="flex-start" grow>
          {/* Player Card */}
          <Card
            withBorder
            radius="md"
            padding="lg"
            style={{
              flex: 1,
              background: getCardBg(isPlayerWinner),
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Avatar size={200} mx="auto" radius="xl">
              <Image
                src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png"
                alt="Player"
                height={200}
                width={200}
                fit="contain"
              />
            </Avatar>
            <Title order={3} mt="md">YOU</Title>
            <Box mt="md">{moveIconMap[lastRound.playerMove].largeIcon}</Box>
            <Text mt="sm" c="gray.3">{lastRound.playerMove.toUpperCase()}</Text>
          </Card>
  
          {/* Dealer Card */}
          <Card
            withBorder
            radius="md"
            padding="lg"
            style={{
              flex: 1,
              background: getCardBg(isDealerWinner),
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Avatar size={200} mx="auto" radius="xl">
              <Image
                src="https://cdn0.iconfinder.com/data/icons/casino-poker-and-cash-monney/512/casino-1024.png"
                alt="Dealer"
                height={200}
                width={200}
                fit="contain"
              />
            </Avatar>
            <Title order={3} mt="md">DEALER</Title>
            <Box mt="md">{moveIconMap[lastRound.dealerMove].largeIcon}</Box>
            <Text mt="sm" c="gray.3">{lastRound.dealerMove.toUpperCase()}</Text>
          </Card>
        </Group>
      </Box>
    );
  };
  
  export default Round;