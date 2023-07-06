import { Container } from "@mantine/core";

interface Props {
  children: JSX.Element;
}
export const RightSidebarContainer = ({ children }: Props) => {
  return (
    <Container bg={"#F8FAFF"} h={"100vh"} p={"xl"}>
      {children}
    </Container>
  );
};
