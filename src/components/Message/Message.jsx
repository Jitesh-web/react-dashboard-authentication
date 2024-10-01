import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckEmailVerified } from "../../useCheckEmailVerified";
import { useResendVerificationEmail } from "../../resendEmail";

const Message = ({
  Img,
  heading,
  btnName,
  Email,
  registerSuccess,
  emailSent,
  btnShow,
  reset,
  btnColor,
  email,
  resetEmail,
}) => {
  // Resend email mutation
  const { mutate: resendEmail, isLoading: isResending } =
    useResendVerificationEmail();
  const navigate = useNavigate();
  // Periodic check if the user is verified
  const { data: isVerified, isLoading, error } = useCheckEmailVerified(email);

  useEffect(() => {
    if (isVerified) {
      navigate("/verified");
    }
  }, [isVerified, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    console.error("Error:", error);
    return <div>Error: {error.message}</div>; // Show error state
  }

  const handleButtonClick = () => {
    if (btnName === "Re-Send Email") {
      handleResendEmail(email);
    } else if (btnName === "Enter the App") {
      navigate("/"); // Navigate to home page
    } else if (btnName === "Sign In") {
      navigate("/");
    }
  };

  const handleResendEmail = async () => {
    try {
      await resendEmail(email);
      alert("Verification email sent successfully!");
    } catch (error) {
      console.error("Error resending email:", error);
      alert("Failed to resend verification email.");
    }
  };

  const messageText = () => {
    if (Email) {
      return (
        <>
          We have sent you an email verification to <br />
          <Text as="span" fontWeight="500" textColor="#171717">
            {email}
          </Text>{" "}
          If you didn’t receive it, click the button below.
        </>
      );
    }
    if (registerSuccess) {
      return (
        <>
          Hurray! You have successfully created your account. Enter the <br />
          app to explore all its features.
        </>
      );
    }
    if (emailSent) {
      return (
        <>
          We have sent instructions on how to reset your password to{" "}
          <Text as="span" fontWeight="500" textColor="#171717">
            {resetEmail}.
          </Text>{" "}
          Please follow the instructions from the email.
        </>
      );
    }
    if (reset) {
      return "Now you can access your account.";
    }
    return null;
  };

  return (
    <Flex
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      bg="greyBtn"
    >
      <Flex
        h="308px"
        w="488px"
        bg="white"
        rounded="xl"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        p="10"
        m={{ base: "4" }}
        gap={6}
      >
        <Box>
          <Image src={Img} alt="Mail" h="48px" w="48px" objectFit="contain" />
        </Box>
        <Heading
          as="h6"
          textAlign="center"
          fontSize="20px"
          lineHeight="24px"
          fontWeight="500"
        >
          {heading}
        </Heading>
        <Box>
          {messageText() && (
            <Text textAlign="center" textStyle="h6" fontWeight="400">
              {messageText()}
            </Text>
          )}
        </Box>
        <Box w="100%">
          {btnShow && (
            <Button
              type="submit"
              fontSize="14px"
              lineHeight="18px"
              fontWeight="500"
              textColor={btnColor ? "white" : "gray"}
              bg={btnColor ? "purple" : "greyBtn"}
              h="38px"
              w="100%"
              onClick={handleButtonClick}
              isLoading={isResending} // Optional: Show loading state on button
            >
              {btnName}
            </Button>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Message;
