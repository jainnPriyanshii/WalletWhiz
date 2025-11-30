import { View, Text } from "react-native";
import React, { createContext, useState } from "react";

export const SelectedWalletContext = createContext();
export const SelectedWalletProvider = ({ children }) => {
  const [walletname, SetWalletname] = useState(null);

  function SetSelectedWalletname(name) {
    SetWalletname(name);
  }

  return (
    <SelectedWalletContext.Provider
      value={{ walletname, SetSelectedWalletname }}
    >
      {children}
    </SelectedWalletContext.Provider>
  );
};

export default SelectedWalletContext;
