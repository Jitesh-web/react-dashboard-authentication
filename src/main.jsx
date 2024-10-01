import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/ubuntu";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import { theme } from "./theme/index.js";
import { StateProvider } from "./store/StateProvider.jsx";
import reducer, { initialState } from "./store/reducer.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </ChakraProvider>
  </StrictMode>
);
