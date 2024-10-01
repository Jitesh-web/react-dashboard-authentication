import { Box, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import LoginForm from "../../components/Login/LoginForm";

const Login = () => {
  return (
    <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
      <Stack
        maxWidth="456px"
        h="454px"
        gap="6"
        boxShadow={{ base: "auto", md: "2xl" }}
        rounded="2xl"
        p={{ base: "8", md: "6" }}
      >
        <Box>
          <Heading as="h1" textStyle="h1" mb="3" fontWeight="500">
            Welcome to Crypto App
          </Heading>
          <Text textStyle="h6" fontWeight="400">
            Enter your credentials to access the account.
          </Text>
        </Box>
        <Box>
          <LoginForm />
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
