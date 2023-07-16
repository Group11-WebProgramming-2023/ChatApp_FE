import { RegisterPayload } from "@/configs/api/payload";
import { ROUTER } from "@/routes/path";
import { useAuthContext } from "@/hooks/context";
import {
  Box,
  Button,
  Card,
  Center,
  Col,
  Grid,
  Group,
  Modal,
  PinInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useState } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const { register, confirmOTP } = useAuthContext();

  const form = useForm<RegisterPayload>({
    initialValues: { firstName: "", lastName: "", email: "", password: "" },
    validate: {
      firstName: isNotEmpty("First name is required"),
      lastName: isNotEmpty("Last name is required"),
      email: isNotEmpty("Email is required"),
      password: isNotEmpty("Password is required"),
    },
  });

  const handleRegister = (values: RegisterPayload) => {
    register(values);
    open();
  };

  const handleConfirmOTP = (otp: string, email: string) => {
    confirmOTP(
      {
        otp,
        email,
      },
      {
        onSuccess: () => {
          navigate(ROUTER.LOGIN);
        },
      }
    );
  };

  const [opened, { close, open }] = useDisclosure();
  const [otp, setOtp] = useState("");

  return (
    <Box pos="relative">
      <Text tt="uppercase" align="center" fw="700" fz={28}>
        Register
      </Text>
      <Text align="center" color="dimmed" fz="xl">
        Register and start chatting
      </Text>
      <Center mt={"sm"}>
        <Card shadow="md" w={360}>
          <form
            id="register"
            onSubmit={form.onSubmit((values) => handleRegister(values))}
          >
            <Stack>
              <Grid>
                <Col span={6}>
                  <TextInput
                    label="First name"
                    placeholder="First name"
                    {...form.getInputProps("firstName")}
                  />
                </Col>
                <Col span={6}>
                  <TextInput
                    label="Last name"
                    placeholder="Last name"
                    {...form.getInputProps("lastName")}
                  />
                </Col>
              </Grid>
              <TextInput
                label="Email"
                placeholder="Input your email"
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Password"
                placeholder="Input your password"
                {...form.getInputProps("password")}
              />
              <Button
                color="blue.9"
                variant="filled"
                fullWidth
                type="submit"
                form="register"
              >
                Register
              </Button>
              <Group position="center">
                <Text
                  color="blue"
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(ROUTER.LOGIN)}
                >
                  Already have an account? Login
                </Text>
              </Group>
            </Stack>
          </form>
        </Card>
      </Center>
      <Modal opened={opened} onClose={close} centered title="Input OTP">
        {/* <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        /> */}
        <Center mb={"lg"}>
          <PinInput value={otp} onChange={setOtp} length={6} />
        </Center>
        <Group position="center">
          <Button onClick={() => handleConfirmOTP(otp, form.values.email)}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </Box>
  );
};
