import { ResetPasswordPayload } from "@/configs/api/payload";
import { useAuthContext } from "@/hooks/context";
import { ROUTER } from "@/routes/path";
import {
  Box,
  Button,
  Card,
  Center,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ResetPwd = () => {
  const navigate = useNavigate();
  const token = useLocation().search.substring(7);
  const [confirmPass, setConfirmPass] = useState("");

  const { resetPwd } = useAuthContext();

  const form = useForm<ResetPasswordPayload>({
    initialValues: {
      newPassword: "",
      token: token,
    },
  });

  const handleResetPassword = (values: ResetPasswordPayload) => {
    resetPwd(values);
    navigate(ROUTER.LOGIN);
  };

  return (
    <Box pos="relative">
      <Text tt="uppercase" align="center" fw="700" fz={28}>
        New password
      </Text>
      <Text align="center" color="dimmed" fz="xl"></Text>
      <Center mt={"sm"}>
        <Card shadow="md" w={360}>
          <form
            id="forgot-pwd"
            onSubmit={form.onSubmit((values) => handleResetPassword(values))}
          >
            <Stack>
              <PasswordInput
                label="New password"
                placeholder="New password"
                {...form.getInputProps("newPassword")}
              />
              <PasswordInput
                label="Confirm password"
                placeholder="Confirm password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.currentTarget.value)}
              />
              <Button
                color="blue.9"
                variant="filled"
                fullWidth
                type="submit"
                form="forgot-pwd"
              >
                Reset password
              </Button>
            </Stack>
          </form>
        </Card>
      </Center>
    </Box>
  );
};
