import { useState, useReducer } from "react";
import CryptoPage from "./components/CryptoPage";
import { reducer, initialState } from "./reducer";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Transactions from "./components/pages/Transactions";
import Support from "./components/pages/Support";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Routes>
      <Route
        path="/"
        element={<CryptoPage state={state} dispatch={dispatch} />}
      >
        <Route index element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/support" element={<Support />} />
      </Route>
    </Routes>
  );
};

export default App;
