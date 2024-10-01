import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  FormControl,
  Stack,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { forgotPassword } from "../../networkCalls";
import { useToast } from "@chakra-ui/toast";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  let forgotEmail;
  const toast = useToast();
  const navigate = useNavigate();
  const { isError, error, isLoading, mutateAsync, data } = useMutation(
    "forgot",
    forgotPassword,
    {
      onSuccess: (data) => {
        toast({
          title: "Forgot email send Successful",
          description: "forgot mail sent",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/forgotpassword", {
          replace: true,
          state: { email: forgotEmail },
        });
        //navigate("/forgot", { replace: true });
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
          title: "Forgot password Failed",
          description: errorMessage,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      },
    }
  );

  // const handleReset = async (email) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/auth/forgot-password",
  //       { email }
  //     ); // API call
  //     alert("Password link sent successfully");
  //     navigate("/forgotpassword", {
  //       replace: true,
  //       state: { email: email },
  //     });
  //     return response.data.msg;
  //   } catch (error) {
  //     // Ensure you pass along the full error object to preserve the details
  //     if (error.response && error.response.data) {
  //       throw new Error(error.response.data.msg || "An error occurred");
  //     } else {
  //       throw new Error(error.message || "Network error");
  //     }
  //     //throw Error(error.response.data.message);
  //   }
  // };
  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Submitted data:", values);
    //const { email } = values;
    forgotEmail = values.email;
    await mutateAsync({
      email: values.email,
    });
    // handleReset(email);
    resetForm(); // Reset the form after submission
  };

  return (
    <Flex
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      bg="greyBtn"
      p={{ base: 0, md: 0 }}
    >
      <Flex
        h="308px"
        w={{ base: "95%", sm: "400px", md: "488px" }}
        bg="white"
        rounded="xl"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        p="10"
        gap={3}
      >
        <Flex flexDir="column" alignItems="flex-start" w="100%" gap="2">
          <Box>
            <Icon as={FaArrowLeft} />
          </Box>
          <Heading
            as="h6"
            textAlign="center"
            fontSize="20px"
            lineHeight="24px"
            fontWeight="500"
          >
            Forgot Password
          </Heading>
          <Box>
            <Text textStyle="h6" fontWeight="400">
              Enter your email address for which account you want to reset{" "}
              <br />
              your password.
            </Text>
          </Box>
        </Flex>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <FormControl
                textStyle="h5"
                w={{ base: "100%", md: "408px" }}
                //h="452px"
                pt={{ base: 3, md: 0 }}
                isInvalid={!!errors.email && touched.email} // Ensure FormControl reflects errors
              >
                <Flex flexDir="column" gap="6">
                  <Stack borderColor="#EEEEF4">
                    <FormLabel>Email</FormLabel>
                    <Field name="email">
                      {({ field, form }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="name@email.com"
                          isInvalid={form.errors.email && form.touched.email}
                        />
                      )}
                    </Field>
                    <FormErrorMessage>
                      <ErrorMessage name="email" />
                    </FormErrorMessage>
                  </Stack>
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
                </Flex>
              </FormControl>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
