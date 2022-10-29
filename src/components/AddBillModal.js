import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  Input,
  useToast,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { addBill } from "../redux/billSlice";

const AddBillModal = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddBill = () => {
    if (description === "" || category === "" || !amount || date === "") {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(
      addBill({
        description,
        category,
        amount,
        date,
      })
    );

    // set state to empty
    setDescription("");
    setCategory("");
    setAmount(null);
    setDate("");

    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column" w="100%">
              <Input
                type={"text"}
                placeholder="Description"
                mb="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                type={"text"}
                placeholder="Category"
                mb="2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <Input
                type={"number"}
                placeholder="Amount"
                mb="2"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
              <Input
                type={"date"}
                placeholder="Date"
                mb="2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Button colorScheme={"blue"} p={6} my="4" onClick={handleAddBill}>
                Add bill
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBillModal;
