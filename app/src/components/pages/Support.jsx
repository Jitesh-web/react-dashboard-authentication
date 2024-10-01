import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Checkbox,
  Flex,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { EmailIcon, ChatIcon } from "@chakra-ui/icons";

const Support = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Container maxW="960px" maxH="544px" py={10}>
      <Flex direction="row" align="flex-start" gap={3}>
        <Box direction="column" gap={3}>
          <Box>
            <EmailIcon boxSize={6} color="blue.500" mr={2} />
            <Heading size="lg">Contact Us</Heading>
            <Text>
              Have a question or just want to know more? Feel free to reach out
              to us.
            </Text>
          </Box>
          <Box
            borderWidth={1}
            borderRadius="lg"
            p={6}
            bg={bgColor}
            borderColor={borderColor}
          >
            <VStack align="stretch" spacing={4}>
              <Flex align="center">
                <ChatIcon boxSize={6} color="purple.500" mr={2} />
                <Heading size="lg">Live Chat</Heading>
              </Flex>
              <Text>
                Don't have time to wait for the answer? Chat with us now.
              </Text>
              <Button colorScheme="purple" leftIcon={<ChatIcon />}>
                Chat with us now
              </Button>
            </VStack>
          </Box>
        </Box>
        <Box
          borderWidth={1}
          borderRadius="lg"
          p={6}
          bg={bgColor}
          borderColor={borderColor}
          width="550px"
          height="544px"
        >
          <VStack align="stretch" spacing={4}>
            <Text fontWeight="bold" whiteSpace="nowrap">
              You will receive response within 24 hours of time of submit.
            </Text>
            <Flex gap={4}>
              <Input placeholder="Name" />
              <Input placeholder="Surname" />
            </Flex>
            <Input placeholder="Email" />
            <Textarea placeholder="Your Message" />
            <Checkbox>
              I agree with <Link color="purple.500">Terms & Conditions</Link>.
            </Checkbox>
            <Button colorScheme="gray">Send a Message</Button>
            <Button variant="outline">Book a Meeting</Button>
          </VStack>
        </Box>
      </Flex>
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <VStack flex={1} align="stretch" spacing={4}></VStack>
      </Flex>
    </Container>
  );
};

export default Support;
