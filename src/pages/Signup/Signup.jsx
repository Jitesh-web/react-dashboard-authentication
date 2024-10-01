import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import SignupForm from "../../components/Signup/SignupForm";

const Signup = () => {
  return (
    <>
      <Flex
        h="100vh"
        w="100vw"
        justifyContent="center"
        alignItems="center"
        p={{ base: "4", md: "0" }}
      >
        <Stack
          maxWidth={{ base: "100%", md: "456px" }}
          w="100%"
          h={{ base: "auto", md: "610px" }}
          gap="4"
          boxShadow={{ base: "auto", md: "2xl" }}
          p={{ base: "4", md: "6" }}
          rounded="2xl"
        >
          <Box>
            <Heading
              as="h1"
              textStyle="h1"
              mb={{ base: "0", md: "3" }}
              fontWeight="500"
              textAlign={{ base: "center", md: "left" }}
            >
              Welcome to Crypto App
            </Heading>
            <Text
              textStyle="h6"
              fontWeight="400"
              textAlign={{ base: "center", md: "left" }}
            >
              Create a free account by filling data below.
            </Text>
          </Box>
          <Box>
            <SignupForm />
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Signup;
