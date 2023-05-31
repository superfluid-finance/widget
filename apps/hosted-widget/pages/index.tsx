import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Something
      </Box>
    </Container>
  );
};

export default Home;
