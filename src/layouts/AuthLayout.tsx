import { BackgroundImage, Box, Center, Grid, MediaQuery } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import bg from "@/assets/img/bg.gif";
import { ROUTER } from "../configs/routers";

const AuthLayout = () => {
  if (localStorage.getItem("authUser")) {
    return <Navigate to={ROUTER.BASE} />;
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
      <Grid.Col xs={12} md={5}>
        <Center>
          <Outlet />
        </Center>
      </Grid.Col>
    </Grid>
  );
};

export default AuthLayout;
