import Check from "/images/check.png";
import Message from "../../components/Message/Message";

const SignupVerified = () => {
  return (
    <Message
      Img={Check}
      heading="Successfully Registration"
      btnName="Enter the App"
      registerSuccess={true}
      btnShow={true}
      btnColor={true}
    />
  );
};

export default SignupVerified;
