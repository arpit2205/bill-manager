import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

import { useSelector } from "react-redux";

const TimeSeriesChart = () => {
  const bills = useSelector((state) => state.bills);

  // Get unique days from the current month on which bills are due
  const uniquesDaysInCurrentMonth = useSelector((state) =>
    state.bills
      .map((bill) => bill.date)
      .filter(
        (date) =>
          date.split("-")[1] === (new Date().getMonth() + 1).toString() &&
          date.split("-")[0] === new Date().getFullYear().toString()
      )
      .map((date) => date.split("-")[2])
      .sort((a, b) => a - b)
      .filter((date, index, self) => self.indexOf(date) === index)
  );

  // Get the total amount of bills due on each day
  const amountsArr = uniquesDaysInCurrentMonth.map((day) => {
    return bills
      .filter(
        (bill) =>
          bill.date.split("-")[1] === (new Date().getMonth() + 1).toString() &&
          bill.date.split("-")[0] === new Date().getFullYear().toString() &&
          bill.date.split("-")[2] === day
      )
      .reduce((acc, bill) => {
        return acc + bill.amount;
      }, 0);
  });

  return (
    <Box
      w="100%"
      maxW={["100%", null, null, "50%"]}
      h={"auto"}
      mx={[0, 0, 0, 2]}
      my={2}
      p={8}
      backgroundColor={"#fafafa"}
      borderRadius={16}
    >
      <Text fontSize={"xl"} fontWeight={"normal"} color="blackAlpha.700">
        Day wise expenses for&nbsp;
        <b>
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </b>
      </Text>

      <Line
        data={{
          labels: uniquesDaysInCurrentMonth,
          datasets: [
            {
              label: "Expenses",
              data: amountsArr,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              title: {
                display: true,
                text: "Amount",
              },
            },
            x: {
              title: {
                display: true,
                text: "Day",
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default TimeSeriesChart;
