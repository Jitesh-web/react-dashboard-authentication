import React, {useEffect} from "react";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Support from "./pages/Support";
import { useNavigate } from "react-router-dom";

const Content = ({ selectedTab }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedTab === "Dashboard") {
      navigate("/");
    } else if (selectedTab === "Transactions") {
      navigate("/transactions");
    } else if (selectedTab === "Support") {
      navigate("/support");
    }
  }, [selectedTab, navigate]);
  return null;
};

export default Content;
