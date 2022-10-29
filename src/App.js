import React from "react";
import { Box } from "@chakra-ui/react";

import Nav from "./components/Nav";
import Home from "./components/Home";

function App() {
  return (
    <Box
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
    >
      <Nav />
      <Home />
    </Box>
  );
}

export default App;
