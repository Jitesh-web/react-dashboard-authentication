import Check from "/images/check.png";
import Message from "../../components/Message/Message";

const PasswordResetDone = () => {
  return (
    <Message
      Img={Check}
      heading="Password Reset Done"
      btnName="Sign In"
      reset={true}
      btnShow={true}
      btnColor={true}
    />
  );
};

export default PasswordResetDone;
