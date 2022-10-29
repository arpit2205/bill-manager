import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select,
  IconButton,
  useDisclosure,
  FormLabel,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";

import AddBillModal from "./AddBillModal";
import EditBillModal from "./EditBillModal";

import { useSelector, useDispatch } from "react-redux";
import { deleteBill } from "../redux/billSlice";

const BillsList = () => {
  const [bill, setBill] = useState(null);
  const [category, setCategory] = useState("All");

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const dispatch = useDispatch();

  let bills = useSelector((state) => state.bills);

  const categories = useSelector((state) => {
    const categories = state.bills.map((bill) => bill.category);
    return ["All", ...new Set(categories)];
  });

  const handleDeleteBill = (id) => {
    dispatch(deleteBill(id));
  };

  const handleEditBill = (bill) => {
    setBill(bill);
    onEditOpen();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Box
      w="100%"
      mx={[0, 0, 0, 2]}
      my={10}
      display="flex"
      flexDirection={"column"}
    >
      <Box w="100%" display={"flex"} justifyContent={"space-between"}>
        <Heading fontSize={["2xl"]} fontWeight={"normal"}>
          Bills List
        </Heading>
        <Button colorScheme="blue" onClick={onAddOpen}>
          <AddIcon mr="2" /> Add Bill
        </Button>
      </Box>

      {/* category filter */}
      <Box w="100%" mt="8" mb="6">
        <FormLabel>Filter by category</FormLabel>
        <Select
          w="200px"
          defaultValue={category}
          onChange={handleCategoryChange}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Box>

      {/* list */}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Category</Th>
              <Th>Description</Th>
              <Th isNumeric>Amount</Th>
              <Th isNumeric>Date</Th>
              <Th>Edit/Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bills
              .filter((bill) => {
                if (category === "All") return true;
                return bill.category === category;
              })
              .map((bill) => (
                <Tr key={bill.id}>
                  <Td>{bill.category}</Td>
                  <Td>{bill.description}</Td>
                  <Td isNumeric>{bill.amount}</Td>
                  <Td isNumeric>{bill.date}</Td>
                  <Td>
                    <IconButton
                      colorScheme={"blue"}
                      variant="ghost"
                      icon={<EditIcon />}
                      mr="1"
                      onClick={() => handleEditBill(bill)}
                    />
                    <IconButton
                      colorScheme={"red"}
                      variant="ghost"
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteBill(bill.id)}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AddBillModal isOpen={isAddOpen} onClose={onAddClose} />
      <EditBillModal isOpen={isEditOpen} onClose={onEditClose} bill={bill} />
    </Box>
  );
};

export default BillsList;
