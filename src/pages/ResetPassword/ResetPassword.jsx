import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  FormControl,
  Stack,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/toast";
import { resetPassword } from "../../networkCalls";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Validation schema for password fields
const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New Password is required"),
  repeatNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Repeat New Password is required"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Get the token from the URL
  const toast = useToast();
  const { isError, error, isLoading, mutateAsync, data } = useMutation(
    "resetPassword",
    resetPassword,
    {
      onSuccess: (data) => {
        toast({
          title: "Reset Successful",
          description: "Password reset successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/resetpassword", { replace: true });
      },
      onError: (error) => {
        // Use the toast to show the error
        // Log the entire error object for debugging
        console.log("Error object:", error);

        // Check for different error structures
        const errorMessage =
          error.response?.data?.message || // Backend error with message
          error.response?.data || // Backend error without specific message
          error.message || // Network-related error
          "An unexpected error occurred"; // Fallback if no info is available
        toast({
          title: "Reset Failed",
          description: errorMessage,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      },
    }
  );

  const initialValues = {
    newPassword: "",
    repeatNewPassword: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Submitted data:", values);
    await mutateAsync({
      password: values.newPassword,
      token: token,
    });
    resetForm(); // Reset the form after successful submission
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
        h="384px"
        w={{ base: "90%", sm: "400px", md: "488px" }}
        bg="white"
        rounded="xl"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        p={{ base: "7", md: "10" }}
        gap={3}
      >
        <Flex flexDir="column" alignItems="flex-start" w="100%" gap="4">
          <Heading
            as="h6"
            textAlign="center"
            fontSize="20px"
            lineHeight="24px"
            fontWeight="500"
          >
            Reset Password
          </Heading>
          <Box mb="2">
            <Text textStyle="h6" fontWeight="400">
              Enter your new password.
            </Text>
          </Box>
        </Flex>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form style={{ width: "100%" }}>
              <FormControl
                isInvalid={!!errors.newPassword && touched.newPassword}
                mb={6}
              >
                <Stack borderColor="#EEEEF4">
                  <FormLabel textStyle="h5" fontWeight="500">
                    New Password
                  </FormLabel>
                  <Field name="newPassword">
                    {({ field }) => (
                      <Input {...field} type="password" placeholder="******" />
                    )}
                  </Field>
                  <FormErrorMessage>
                    <ErrorMessage name="newPassword" />
                  </FormErrorMessage>
                </Stack>
              </FormControl>

              <FormControl
                isInvalid={
                  !!errors.repeatNewPassword && touched.repeatNewPassword
                }
                mb={6}
              >
                <Stack borderColor="#EEEEF4">
                  <FormLabel textStyle="h5" fontWeight="500">
                    Repeat New Password
                  </FormLabel>
                  <Field name="repeatNewPassword">
                    {({ field }) => (
                      <Input {...field} type="password" placeholder="******" />
                    )}
                  </Field>
                  <FormErrorMessage>
                    <ErrorMessage name="repeatNewPassword" />
                  </FormErrorMessage>
                </Stack>
              </FormControl>

              <Box w="100%">
                <Button
                  type="submit"
                  fontSize="14px"
                  lineHeight="18px"
                  fontWeight="500"
                  textColor="gray"
                  bg="greyBtn"
                  h="38px"
                  w="100%"
                  isLoading={isSubmitting}
                >
                  Reset Password
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default ResetPassword;
