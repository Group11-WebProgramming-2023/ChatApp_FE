import { ForgotPasswordPayload } from "@/configs/api/payload";
import { useAuthContext } from "@/hooks/context";
import { ROUTER } from "@/routes/path";
import {
  Box,
  Button,
  Card,
  Center,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPwd } = useAuthContext();

  const form = useForm<ForgotPasswordPayload>({
    initialValues: { email: "" },
    validate: {
      email: isNotEmpty("Email is required"),
    },
  });

  const handleForgotPassword = (values: ForgotPasswordPayload) => {
    forgotPwd(values);
  };

  return (
    <Box pos="relative">
      <Text tt="uppercase" align="center" fw="700" fz={28}>
        Reset password
      </Text>
      <Text align="center" color="dimmed" fz="xl">
        Submit your email
      </Text>
      <Center mt={"sm"}>
        <Card shadow="md" w={360}>
          <form
            id="forgot-pwd"
            onSubmit={form.onSubmit((values) => handleForgotPassword(values))}
          >
            <Stack>
              <TextInput
                label="Email"
                placeholder="Input your email"
                {...form.getInputProps("email")}
              />
              <Button
                color="blue.9"
                variant="filled"
                fullWidth
                type="submit"
                form="forgot-pwd"
              >
                Send
              </Button>
            </Stack>
            <Group mt={"xs"} position="right">
              <Text
                color="dimmed"
                onClick={() => navigate(ROUTER.LOGIN)}
                sx={{ cursor: "pointer" }}
              >
                Back to login
              </Text>
            </Group>
          </form>
        </Card>
      </Center>
    </Box>
  );
};
