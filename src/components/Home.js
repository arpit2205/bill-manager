import React from "react";
import { Box, Heading } from "@chakra-ui/react";

import TotalAmount from "./TotalAmount";
import TimeSeriesChart from "./TimeSeriesChart";
import BillsList from "./BillsList";

const Home = () => {
  return (
    <Box
      w={["98%", null, "90%", "75%"]}
      display="flex"
      justifyContent={"center"}
      flexWrap="wrap"
      p={4}
    >
      <Box
        display={"flex"}
        w="100%"
        flexDirection={["column", null, null, "row"]}
      >
        <TotalAmount />
        <TimeSeriesChart />
      </Box>

      <BillsList />
    </Box>
  );
};

export default Home;
