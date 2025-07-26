import { Overlay, Center, Text, Box } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export default function ConnectionErrorOverlay() {
  const wsError = useSelector((state: RootState) => state.game.connectionError);

  if (!wsError) return null;

  return (
    <Overlay blur={4} center fixed zIndex={500}>
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
}
