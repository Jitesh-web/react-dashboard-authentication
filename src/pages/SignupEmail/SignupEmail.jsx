import Mail from "/images/mail.png";
import Message from "../../components/Message/Message";
import { useLocation } from "react-router-dom";

const SignupEmail = () => {
  const location = useLocation();
  const email = location.state?.email;
  console.log(email);
  return (
    <Message
      Img={Mail}
      heading="Email Verification"
      btnName="Re-Send Email"
      Email={true}
      btnShow={true}
      btnColor={false}
      email={email}
    />
  );
};

export default SignupEmail;
