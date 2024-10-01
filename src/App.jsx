import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import SignupEmail from "./pages/SignupEmail/SignupEmail";
import SignupVerified from "./pages/SignupVerified/SignupVerified";
import PasswordResetDone from "./pages/PasswordResetDone/PasswordResetDone";
import EmailSent from "./pages/EmailSent/EmailSent";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./Home";
import { actionTypes, useStateValue } from "./store";
import ReactDashboardComponent from "../app/src/App";
import "../app/src/index.css";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies] = useCookies(["jwt"]);
  const [{ token }, dispatch] = useStateValue();
  const queryClient = new QueryClient();

  useEffect(() => {
    if (token === null) {
      const { jwt } = cookies;
      if (jwt) {
        dispatch({ type: actionTypes.SET_TOKEN, value: jwt });
      }
    }
  }, [dispatch, token, cookies]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <ReactDashboardComponent />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/signup"
            element={!token ? <Signup /> : <Navigate to="/" replace />}
          />

          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" replace />}
          />

          <Route path="/email" element={<SignupEmail />} />
          <Route path="/verified" element={<SignupVerified />} />

          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/forgotpassword" element={<EmailSent />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/resetpassword" element={<PasswordResetDone />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
