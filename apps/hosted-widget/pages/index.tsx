import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Container,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useState } from "react";

const Home: NextPage = () => {
  const [ipfsHash, setIpfsHash] = useState("");
  const router = useRouter();
  const onSubmit = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();
      router.push(`/${ipfsHash}`);
    },
    [router, ipfsHash],
  );

  return (
    <>
      <Container maxWidth="sm">
        <Stack
          component={"form"}
          onSubmit={onSubmit}
          spacing={1}
          sx={{ height: "100vh" }}
          justifyContent="center"
          alignItems="center"
        >
          <FormControl fullWidth>
            <FormLabel htmlFor="ipfs-hash">
              Enter IPFS hash to load a checkout
            </FormLabel>
            <TextField
              hiddenLabel
              variant="outlined"
              id="ipfs-hash"
              sx={{ bgcolor: "#ffffff" }}
              onChange={(x) => setIpfsHash(x.target.value?.trim())}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit">
                      <ArrowForwardIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                pattern: "^[A-Za-z0-9]+$",
              }}
            />
          </FormControl>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
