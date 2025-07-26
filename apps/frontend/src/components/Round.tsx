import React, { useEffect, useRef } from "react";
import {
  Box,
  Group,
  Title,
  Text,
  Center,
  Card,
  Image,
  Avatar,
} from "@mantine/core";
import { gsap } from "gsap";
import { LastRound } from "../state/features/betSlice";
import { moveIconMap } from "../const";

interface IBetsProps {
  lastRound: LastRound | null;
}

const Round = ({ lastRound }: IBetsProps) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const dealerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!playerRef.current || !dealerRef.current || !titleRef.current) return;

    const tl = gsap.timeline();

    // Start: slide in fast from sides
    tl.set([playerRef.current, dealerRef.current], {
      x: (i: number) => (i === 0 ? -500 : 500),
      opacity: 0,
      scale: 1,
    });

    tl.to([playerRef.current, dealerRef.current], {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    // Clash impact!
    tl.to([playerRef.current, dealerRef.current], {
      scale: 1.1,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });

    // BAMMM effect on title
    tl.fromTo(
      titleRef.current,
      {
        scale: 0,
        rotation: -20,
        opacity: 0,
      },
      {
        scale: 1.4,
        rotation: 0,
        opacity: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.4)",
      },
      "-=0.1",
    );
  }, [lastRound]);

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
      ref={wrapperRef}
      style={{
        minWidth: "100%",
        height: "100%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        borderRadius: 12,
        background: "var(--mantine-color-dark-7)",
      }}
    >
      <Title
        ref={titleRef}
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
          textShadow: "0 0 20px rgba(255,255,255,0.2)",
          opacity: 0,
          transform: "scale(0)",
        }}
      >
        {lastRound.result.toUpperCase()}!
      </Title>

      <Group justify="center" align="flex-start" grow>
        {/* Player Card */}
        <Card
          ref={playerRef}
          withBorder
          radius="md"
          padding="lg"
          style={{
            flex: 1,
            background: getCardBg(isPlayerWinner),
            color: "white",
            textAlign: "center",
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
          <Title order={3} mt="md">
            YOU
          </Title>
          <Box mt="md">{moveIconMap[lastRound.playerMove].largeIcon}</Box>
          <Text mt="sm" c="gray.3">
            {lastRound.playerMove.toUpperCase()}
          </Text>
        </Card>

        {/* Dealer Card */}
        <Card
          ref={dealerRef}
          withBorder
          radius="md"
          padding="lg"
          style={{
            flex: 1,
            background: getCardBg(isDealerWinner),
            color: "white",
            textAlign: "center",
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
          <Title order={3} mt="md">
            DEALER
          </Title>
          <Box mt="md">{moveIconMap[lastRound.dealerMove].largeIcon}</Box>
          <Text mt="sm" c="gray.3">
            {lastRound.dealerMove.toUpperCase()}
          </Text>
        </Card>
      </Group>
    </Box>
  );
};

export default Round;
