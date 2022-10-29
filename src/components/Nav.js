import React from "react";
import { Box, Heading, Image } from "@chakra-ui/react";

import BrightLogo from "../assets/bright-logo.png";

const Nav = () => {
  return (
    <Box
      w="100%"
      backgroundColor={"#f8f8f8"}
      display="flex"
      alignItems={"center"}
    >
      <Image src={BrightLogo} alt="logo" width={50} height={50} ml="4" />
      <Heading fontSize={["2xl"]} p={4} fontWeight={"normal"}>
        Bill Manager
      </Heading>
    </Box>
  );
};

export default Nav;
