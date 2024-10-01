import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { TableData } from "./TableData";

const TransactionTable = () => {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr fontSize="12px" fontWeight="500px" lineHeight="14px" color="grey">
            <Th>ID</Th>
            <Th isNumeric>Date & Time</Th>
            <Th>Type</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {TableData.map(
            ({ id, date, time, type, subType, amount, status }, index) => {
              return (
                <Tr
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  color="black"
                  key={index}
                >
                  <Td>{id}</Td>
                  <Td isNumeric>
                    <Box>{date}</Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="15px"
                      color="grey"
                    >
                      {type}
                    </Box>
                  </Td>
                  <Td>
                    <Box>{time}</Box>
                    <Box>{subType}</Box>
                  </Td>
                  <Td>{amount}</Td>
                  <Td>{status}</Td>
                </Tr>
              );
            }
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
