import {
  BackgroundImage,
  Box,
  Center,
  Grid,
  Image,
  MediaQuery,
  Stack,
} from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import bg from "@/assets/img/bg.gif";
import Logo from "@/assets/img/logo.png";

import { ROUTER } from "@/routes/path";

const AuthLayout = () => {
  if (localStorage.getItem("authUser")) {
    return <Navigate to={ROUTER.APP} />;
  }

  return (
    <Grid style={{ width: "100vw" }} m={0} align="center" justify="center">
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Grid.Col p={0} md={7}>
          <BackgroundImage src={bg}>
            <Box
              sx={{
                minHeight: "90vh",
                maxHeight: "90vh",
              }}
            ></Box>
          </BackgroundImage>
        </Grid.Col>
      </MediaQuery>
      <Grid.Col xs={12} md={5} p={0}>
        <Stack h={"100vh"} align="center" justify="center">
          <Image src={Logo} width={150} />
          <Center>
            <Outlet />
          </Center>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default AuthLayout;
