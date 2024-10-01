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
import { signup } from "../../networkCalls";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import { actionTypes, useStateValue } from "../../store";
import { useCookies } from "react-cookie";

const SignupForm = () => {
  const [, setCookie] = useCookies(["jwt"]);
  const [{}, dispatch] = useStateValue();

  const toast = useToast();
  const navigate = useNavigate();
  let emailValue;
  const { isError, error, isLoading, mutateAsync, data } = useMutation(
    "signup",
    signup,
    {
      onSuccess: (data) => {
        dispatch({ type: actionTypes.SET_TOKEN, value: data.uniqueToken });
        setCookie("jwt", data.uniqueToken);
        toast({
          title: "Signup Successful",
          description: "Please check your email to verify your account.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        //navigate("/email", { replace: true }, { state: { email: emailValue } });
        navigate("/email", { replace: true, state: { email: emailValue } });
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
          title: "Signup Failed",
          description: errorMessage,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      },
    }
  );

  console.log("data", data);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    terms: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
  });

  const initialValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm, setTouched }) => {
        emailValue = values.email;
        console.log(values.email);
        await mutateAsync({
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: values.password,
        });
        resetForm();
        setTouched({});
      }}
    >
      {({ isSubmitting, errors, touched, values, setFieldValue }) => (
        <Form>
          <FormControl
            textStyle="h5"
            w={{ base: "100%", md: "408px" }}
            h={{ base: "auto", md: "452px" }}
            p={{ base: "4", md: "1" }}
          >
            <Flex flexDir="column" gap="6">
              <Flex gap="6" flexDir={{ base: "column", md: "row" }}>
                <FormControl isInvalid={errors.name && touched.name}>
                  <FormLabel mb="2">Name</FormLabel>
                  <Field name="name">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter name"
                        borderColor="#EEEEF4"
                      />
                    )}
                  </Field>
                  <FormErrorMessage as="span">
                    <ErrorMessage name="name" />
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.surname && touched.surname}>
                  <FormLabel mb="2">Surname</FormLabel>
                  <Field name="surname">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter surname"
                        borderColor="#EEEEF4"
                      />
                    )}
                  </Field>
                  <FormErrorMessage as="span">
                    <ErrorMessage name="surname" />
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <FormControl isInvalid={errors.email && touched.email}>
                <FormLabel mb="2">Email</FormLabel>
                <Field name="email">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email"
                      borderColor="#EEEEF4"
                    />
                  )}
                </Field>
                <FormErrorMessage as="span">
                  <ErrorMessage name="email" />
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password && touched.password}>
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
                <FormErrorMessage as="span">
                  <ErrorMessage name="password" />
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.confirmPassword && touched.confirmPassword}
              >
                <FormLabel mb="2">Repeat Password</FormLabel>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      borderColor="#EEEEF4"
                    />
                  )}
                </Field>
                <FormErrorMessage as="span">
                  <ErrorMessage name="confirmPassword" />
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.terms && touched.terms}>
                <Field name="terms">
                  {({ field }) => (
                    <Checkbox
                      {...field}
                      borderColor="#EEEEF4"
                      isChecked={values.terms}
                      onChange={(e) => setFieldValue("terms", e.target.checked)}
                    >
                      <Text textStyle="h5" fontWeight="400">
                        I agree with
                        <Text as="span" textColor="purple">
                          {" "}
                          Terms & Conditions.
                        </Text>
                      </Text>
                    </Checkbox>
                  )}
                </Field>
                <FormErrorMessage as="span">
                  <ErrorMessage name="terms" />
                </FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                fontSize="14px"
                lineHeight="18px"
                fontWeight="500"
                textColor="gray"
                bg="grey"
                h="38px"
                w="100%"
                isLoading={isSubmitting}
              >
                Create Account
              </Button>

              <Flex justifyContent="center" alignItems="center">
                <Text textStyle="h5" fontWeight="500" textColor="gray">
                  Already have an account?{" "}
                  <Text as="span" textColor="purple">
                    Log In
                  </Text>
                </Text>
              </Flex>
            </Flex>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
