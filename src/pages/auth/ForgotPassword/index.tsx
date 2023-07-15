import { ForgotPasswordPayload } from "@/configs/api/payload";
import {
  Box,
  Button,
  Card,
  Center,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordPayload>({
    initialValues: { email: "" },
    validate: {
      email: isNotEmpty("Email is required"),
    },
  });

  const handleForgotPassword = (values: ForgotPasswordPayload) => {
   
  };

  return (
    <Box pos="relative">
      <Text tt="uppercase" align="center" fw="700" fz={28}>
        Forgot your password
      </Text>
      <Text align="center" color="dimmed" fz="xl">
        Submit your email to reset the password
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
          </form>
        </Card>
      </Center>
    </Box>
  );
};
