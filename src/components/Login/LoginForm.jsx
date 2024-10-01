import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Box,
  Text,
  Stack,
  Flex,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { login } from "../../networkCalls";
import { useToast } from "@chakra-ui/toast";
import { useNavigate, Link } from "react-router-dom";
import { actionTypes, useStateValue } from "../../store";
import { useCookies } from "react-cookie";

const LoginForm = () => {
  const [, setCookie] = useCookies(["jwt"]);
  const [{}, dispatch] = useStateValue();

  const navigate = useNavigate();
  const toast = useToast();
  const { isError, error, isLoading, mutateAsync, data } = useMutation(
    "login",
    login,
    {
      onSuccess: (data) => {
        dispatch({ type: actionTypes.SET_TOKEN, value: data.token });
        setCookie("jwt", data.token);
        toast({
          title: "Login Successful",
          description: "You have logged in succesfully",
          status: "success",
          duration: 2000,
          isClosable: true,
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
          title: "Login Failed",
          description: errorMessage,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      },
    }
  );
  console.log("data", data);
  console.log(error);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "jiteshnarode345@gmail.com",
    password: "123456",
    remember: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm, setTouched }) => {
        console.log("Form values:", values);
        await mutateAsync({
          email: values.email,
          password: values.password,
        });
        resetForm();
        setTouched({});
      }}
    >
      {({ isSubmitting, errors, touched, setFieldValue, values }) => (
        <Form>
          <FormControl
            textStyle="h5"
            w={{ base: "100%", md: "408px" }}
            h={{ base: "auto", md: "452px" }}
            p={{ base: "2", md: "0" }}
          >
            <Flex flexDir="column" gap="6">
              {/* Email Field */}
              <FormControl isInvalid={!!(errors.email && touched.email)}>
                <FormLabel mb="2">Email</FormLabel>
                <Field name="email">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="name@email.com"
                      borderColor="#EEEEF4"
                    />
                  )}
                </Field>
                <FormErrorMessage>
                  <ErrorMessage name="email" />
                </FormErrorMessage>
              </FormControl>

              {/* Password Field */}
              <FormControl isInvalid={!!(errors.password && touched.password)}>
                <FormLabel mb="2">Password</FormLabel>
                <Field name="password">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      borderColor="#EEEEF4"
                    />
                  )}
                </Field>
                <FormErrorMessage>
                  <ErrorMessage name="password" />
                </FormErrorMessage>
              </FormControl>

              {/* Remember Me Checkbox */}
              <Box>
                <Field name="remember">
                  {({ field }) => (
                    <Checkbox
                      {...field}
                      borderColor="#EEEEF4"
                      isChecked={values.remember}
                      onChange={(e) =>
                        setFieldValue("remember", e.target.checked)
                      }
                    >
                      <Flex
                        w={{ base: "354px", md: "384px" }}
                        justifyContent="space-between"
                      >
                        <Text textStyle="h5" fontWeight="400">
                          Remember me
                        </Text>
                        <Link to="/forgot">
                          <Text
                            textStyle="h5"
                            fontWeight="500"
                            textColor="purple"
                          >
                            Forgot Password?
                          </Text>
                        </Link>
                      </Flex>
                    </Checkbox>
                  )}
                </Field>
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                fontSize="14px"
                lineHeight="18px"
                fontWeight="500"
                textColor="gray"
                bg="grey"
                h="38px"
                isLoading={isSubmitting}
              >
                Log In
              </Button>

              {/* Create Account Button */}
              <Button
                textStyle="h6"
                fontSize="14px"
                lineHeight="18px"
                fontWeight="500"
                textColor="#171717"
                bg="greyBtn"
                h="38px"
                mt="-3"
              >
                Create New Account
              </Button>
            </Flex>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
