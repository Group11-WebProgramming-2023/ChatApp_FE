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

export const Login = () => {
  const form = useForm({
    initialValues: { username: "", password: "" },
    validate: {
      username: isNotEmpty("Username is required"),
      password: isNotEmpty("Password is required"),
    },
  });

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
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Stack>
              <TextInput
                label="Username"
                placeholder="Input your username"
                {...form.getInputProps("username")}
              />
              <TextInput
                label="Password"
                placeholder="Input your password"
                {...form.getInputProps("password")}
              />
              <Button color="blue.9" variant="filled" fullWidth type="submit">
                Login
              </Button>
            </Stack>
          </form>
        </Card>
      </Center>
    </Box>
  );
};
