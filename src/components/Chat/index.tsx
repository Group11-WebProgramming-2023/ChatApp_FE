import { Body } from "@/components/Chat/Body";
import { Footer } from "@/components/Chat/Footer";
import { Header } from "@/components/Chat/Header";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { Stack } from "@mantine/core";

export const Chat = () => {
  const { selected_conversation_id } = useAppSelector(
    (state: RootState) => state.conversation
  );

  const { current_messages } = useAppSelector(
    (state: RootState) => state.conversation.direct_chat
  );

  return (
    <Stack h={"100vh"} m={0} p={0}>
      <Header />
      <Body messages={current_messages} />
      <Footer />
    </Stack>
  );
};
