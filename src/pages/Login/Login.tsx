import { LoginPayload } from "@/configs/api/payload";
import { ROUTER } from "@/configs/routers";
import { useAuthContext } from "@/hooks/context";
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

export const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const form = useForm<LoginPayload>({
    initialValues: { email: "", password: "" },
    validate: {
      email: isNotEmpty("Email is required"),
      password: isNotEmpty("Password is required"),
    },
  });

  const handleLogin = (values: LoginPayload) => {
    login(values, {
      onSuccess: () => {
        navigate(ROUTER.BASE);
      },
    });
  };

  return (
    <Box pos="relative">
      <Text tt="uppercase" align="center" fw="700" fz={28}>
        Login
      </Text>
      <Text align="center" color="dimmed" fz="xl">
        Welcome to the chat app. Login and start chatting
      </Text>
      <Center mt={"sm"}>
        <Card shadow="md" w={360}>
          <form
            id="login"
            onSubmit={form.onSubmit((values) => handleLogin(values))}
          >
            <Stack>
              <TextInput
                label="Email"
                placeholder="Input your email"
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Password"
                type="password"
                placeholder="Input your password"
                {...form.getInputProps("password")}
              />
              <Button
                color="blue.9"
                variant="filled"
                fullWidth
                type="submit"
                form="login"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Card>
      </Center>
    </Box>
  );
};
