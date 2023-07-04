import { Divider, Stack } from "@mantine/core";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Body } from "./Body";

export const ChatMain = () => {
  return (
    <Stack bg={"#F0F4FA"} h={"100vh"} m={0} p={"xl"} spacing={2}>
      <Header />
      <Divider orientation={"horizontal"} />
      <Body />
      <Footer />
    </Stack>
  );
};
