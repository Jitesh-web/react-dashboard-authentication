import { useMutation } from "react-query";
import axios from "axios";

export const useResendVerificationEmail = () => {
  return useMutation(async (email) => {
    const response = await axios.post(
      `${process.env.VERIFICATION_MAIL}/resend-verification-email`,
      { email }
    );
    console.log(response.data);
    return response.data;
  });
};
