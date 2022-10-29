import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormLabel,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { setBudget } from "../redux/budgetSlice";

import MinBillsModal from "./MinBillsModal";

const TotalAmount = () => {
  const [budgetInput, setBudgetInput] = useState(null);
  const [minBills, setMinBills] = useState([]);
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const budget = useSelector((state) => state.budget);

  const bills = useSelector((state) => state.bills);

  const totalAmount = useSelector((state) => {
    return state.bills.reduce((acc, bill) => {
      // consider only current month bills
      if (
        bill.date.split("-")[1] === (new Date().getMonth() + 1).toString() &&
        bill.date.split("-")[0] === new Date().getFullYear().toString()
      ) {
        return acc + bill.amount;
      }
      return acc;
    }, 0);
  });

  const handleSetBudget = () => {
    if (budgetInput === 0 || !budgetInput) {
      toast({
        title: "Enter a non zero value",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(setBudget(budgetInput));
    toast({
      title: "Monthly budget updated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleViewMinimumBills = () => {
    if (!budget || budget === 0) {
      toast({
        title: "Set a monthly budget first",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // sort bills by amount in descending order
    const billsCopy = [...bills];
    const sortedBills = billsCopy.sort((a, b) => b.amount - a.amount);
    const minimumBills = [];

    // add bills to minimumBills array until total amount is greater than budget
    let total = 0;
    for (let i = 0; i < sortedBills.length; i++) {
      if (total + sortedBills[i].amount <= budget) {
        minimumBills.push(sortedBills[i]);
        total += sortedBills[i].amount;
      }
    }

    setMinBills(minimumBills);
    onOpen();
  };

  return (
    <Box
      w="100%"
      h={"auto"}
      mx={[0, 0, 0, 2]}
      my={2}
      p={8}
      backgroundColor={"#fafafa"}
      borderRadius={16}
    >
      <Box>
        <Text fontSize={"xl"} fontWeight={"normal"} color="blackAlpha.700">
          Total expenses for&nbsp;
          <b>
            {new Date().toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </b>
        </Text>
        <Heading color={"blackAlpha.800"}>&#8377;{totalAmount}</Heading>
      </Box>

      <Box mt="8">
        <FormLabel>Monthly budget</FormLabel>
        <Box display={"flex"}>
          <Input
            type={"number"}
            placeholder="Enter budget"
            value={budgetInput}
            onChange={(e) => setBudgetInput(parseInt(e.target.value))}
            mr="2"
          />
          <Button px="10" onClick={handleSetBudget}>
            Set budget
          </Button>
        </Box>
      </Box>

      <Button
        mt="4"
        w="100%"
        colorScheme={"blue"}
        variant="outline"
        onClick={handleViewMinimumBills}
      >
        View minimum bills to be paid
      </Button>
      <MinBillsModal isOpen={isOpen} onClose={onClose} minBills={minBills} />
    </Box>
  );
};

export default TotalAmount;
