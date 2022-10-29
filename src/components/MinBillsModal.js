import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const MinBillsModal = ({ isOpen, onClose, minBills }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Minimum bills to be paid</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column">
              <Heading
                fontWeight={"normal"}
                fontSize={"2xl"}
                mb="10"
                color={"blackAlpha.700"}
              >
                <b>{minBills.length}</b> bills to be paid
              </Heading>

              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Description</Th>
                      <Th>Category</Th>
                      <Th>Amount</Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {minBills.map((bill) => (
                      <Tr>
                        <Td>{bill.description}</Td>
                        <Td>{bill.category}</Td>
                        <Td>{bill.amount}</Td>
                        <Td>{bill.date}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MinBillsModal;
