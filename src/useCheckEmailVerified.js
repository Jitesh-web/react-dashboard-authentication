import { useQuery } from "react-query";
import axios from "axios";

export const useCheckEmailVerified = (email) => {
  return useQuery(
    ["checkEmailVerified", email],
    async () => {
      if (!email) {
        throw new Error("No email provided");
      }
      const response = await axios.post(
        `${process.env.VERIFICATION_MAIL}/check-verified`,
        { email }
      );
      console.log(response.data);
      return response.data?.isVerified;
    },
    {
      enabled: !!email, // Only run if email is provided
      refetchInterval: email ? 5000 : false, // Poll every 5 seconds if email is available
      onError: (error) => {
        console.error("Error fetching verification status:", error);
      },
    }
  );
};
