import { Body } from "@/components/Chat/Body";
import { Footer } from "@/components/Chat/Footer";
import { Header } from "@/components/Chat/Header";
import { Stack } from "@mantine/core";

export const ChatContainer = () => {
  return (
    <Stack h={"100vh"} m={0} p={0}>
      <Header />
      <Body />
      <Footer />
    </Stack>
  );
};
