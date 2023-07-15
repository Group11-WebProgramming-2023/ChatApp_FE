import { Body } from "@/components/Chat/Body";
import { Footer } from "@/components/Chat/Footer";
import { Header } from "@/components/Chat/Header";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { Stack } from "@mantine/core";

export const ChatContainer = () => {
  // const { conversations } = useAppSelector(
  //   (state: RootState) => state.conversation
  // );
  // console.log(
  //   "🚀 ~ file: ChatContainer.tsx:10 ~ ChatContainer ~ conversations:",
  //   conversations
  // );
  return (
    <Stack h={"100vh"} m={0} p={0}>
      <Header />
      {/* <Body messages={conversations[0]?.messages} /> */}
      <Footer />
    </Stack>
  );
};
