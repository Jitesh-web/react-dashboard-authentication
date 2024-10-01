import Check from "/images/check.png";
import Message from "../../components/Message/Message";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EmailSent = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const resetEmail = location.state?.email;

  // Automatically navigate to the reset password page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/reset-password/:token");
    }, 5000);
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <Message
      Img={Check}
      heading="Successfully Sent"
      emailSent={true}
      btnShow={false}
      resetEmail={resetEmail}
    />
  );
};

export default EmailSent;
