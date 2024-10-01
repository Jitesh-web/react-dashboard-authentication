import { Button, Stack, Flex, Box } from "@chakra-ui/react";
import { GoDownload } from "react-icons/go";
import TransactionTable from "../Transactions/TransactionTable";

const Transactions = () => {
  return (
    <Box height="522px" width="960px" bg="white" margin="30px">
      <Flex justifyContent="flex-end " width="100%">
        <Button
          leftIcon={<GoDownload />}
          bg="purple"
          color="white"
          size="sm"
          m={4}
          p="10px" // Padding for top and bottom
          pl="16px" // Padding for left
          pr="16px" // Padding for right
          fontSize="14px"
          fontWeight="500"
          lineHeight="18px"
        >
          Export CSV
        </Button>
      </Flex>
      <TransactionTable />
    </Box>
  );
};

export default Transactions;
