import { UpdateProfilePayload } from "@/configs/api/payload";
import { useAppDispatch } from "@/hooks/redux";
import { UserAction } from "@/redux/reducer/user/user.action";
import { IUser } from "@/types/models/IUser";
import { Modals } from "@/utils/modals";
import { NotiType, renderNotification } from "@/utils/notifications";
import {
  Avatar,
  Box,
  Button,
  Center,
  Col,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const Profile = () => {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState<IUser>();
  const [_isEditing, setIsEditing] = useState(false);

  const form = useForm<UpdateProfilePayload>({
    validate: {
      firstName: isNotEmpty("This field can not be empty"),
      lastName: isNotEmpty("This field can not be empty"),
    },
  });

  useEffect(() => {
    dispatch(
      UserAction.getProfile({
        onSuccess: (data: IUser) => {
          setProfile(data);
          form.setValues({
            firstName: data.firstName,
            lastName: data.lastName,
            avatar: data.avatar,
          });
        },
      })
    );
  }, [dispatch]);

  const [opened, { close, open }] = useDisclosure();

  const afterUpload = (url: string) => {
    form.values.avatar = url;
    dispatch(
      UserAction.updateProfile(
        { ...form.values, avatar: url },
        {
          onSuccess: () => {
            form.values.avatar = url;
            dispatch(UserAction.getProfile());
          },
          onError: () => form.reset(),
        }
      )
    );
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const handleSubmit = (values: UpdateProfilePayload) => {
    if (!form.isDirty()) {
      renderNotification("Nothing has been changed", NotiType.ERROR);
    } else {
      dispatch(
        UserAction.updateProfile(values, {
          onSuccess: () => {
            dispatch(UserAction.getProfile());
          },
          onError: () => form.reset(),
        })
      );
      setIsEditing(false);
    }
  };

  return (
    <Stack p={"lg"} h={matches ? "100vh" : "calc(100vh - 70px)"}>
      <Text fw={500} size={"lg"}>
        Profile
      </Text>

      <Grid>
        <Col sm={12} md={6} offsetMd={3}>
          <Stack>
            <Center>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  size={250}
                  color="blue"
                  radius="xl"
                  src={form.values.avatar}
                />
                <IconEdit
                  size={"1.8rem"}
                  style={{
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                    background: "white",
                    borderRadius: "50%",
                    border: "2px solid blue",
                    padding: "3px",
                  }}
                  color="blue"
                  cursor={"pointer"}
                  onClick={() => {
                    open();
                  }}
                />
              </Box>
            </Center>
            <form>
              <TextInput
                label="First name"
                size={"sm"}
                disabled={!_isEditing}
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label="Last name"
                size={"sm"}
                disabled={!_isEditing}
                {...form.getInputProps("lastName")}
              />
            </form>
            <Group position="right">
              {_isEditing ? (
                <Button onClick={handleCancel} variant="outline">
                  Cancel
                </Button>
              ) : null}
              <Button
                leftIcon={<IconEdit size={"1rem"} />}
                onClick={
                  _isEditing
                    ? () => handleSubmit(form.values)
                    : () => setIsEditing(true)
                }
              >
                {_isEditing ? "Save" : "Edit"}
              </Button>
            </Group>
          </Stack>
        </Col>
      </Grid>
      <Modals.OpenUploadModal
        title="Update avatar"
        opened={opened}
        onClose={close}
        afterUpload={afterUpload}
      />
    </Stack>
  );
};
