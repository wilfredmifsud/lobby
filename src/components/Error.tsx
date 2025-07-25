import { Overlay, Center, Text, Box } from "@mantine/core";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

const ConnectionErrorOverlay = () => {
  const wsError = useSelector((state: RootState) => state.game.wsError);

  if (!wsError) return null;

  return (
    <Overlay
      blur={4}
      center
      fixed
      zIndex={500}
      background="rgba(0, 0, 0, 0.7)"
    >
      <Center style={{ height: "100vh", flexDirection: "column" }}>
        <Text c="red.5" size="xl" fw={700}>
          Connection Error
        </Text>
        <Text mt="sm" c="gray.2" size="md" fw={500}>
          {wsError}
        </Text>
      </Center>
    </Overlay>
  );
};

export default ConnectionErrorOverlay