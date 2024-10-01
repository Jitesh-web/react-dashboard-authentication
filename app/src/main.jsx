import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

export const customTheme = extendTheme({
  colors: {
    purple: "#5F00D9",
    gray: "#F3F3F7",
    grey: "#797E82",
    darkgray: "#535D66",
    green: "#059669",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={customTheme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </StrictMode>
);
