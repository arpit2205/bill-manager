import React, { useState, useEffect } from "react";
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
import { editBill } from "../redux/billSlice";

const EditBillModal = ({ isOpen, onClose, bill }) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState("");

  // set input values to bill values on render
  useEffect(() => {
    setDescription(bill?.description);
    setCategory(bill?.category);
    setAmount(bill?.amount);
    setDate(bill?.date);
  }, [bill]);

  const dispatch = useDispatch();
  const toast = useToast();

  const handleEditBill = () => {
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
      editBill({
        id: bill.id,
        description,
        category,
        amount,
        date,
      })
    );

    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit bill</ModalHeader>
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
              <Button
                colorScheme={"blue"}
                p={6}
                my="4"
                onClick={handleEditBill}
              >
                Edit bill
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditBillModal;
