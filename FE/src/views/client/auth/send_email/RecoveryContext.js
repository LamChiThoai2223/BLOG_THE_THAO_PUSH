import React, { createContext, useContext, useState } from "react";

const RecoveryContext = createContext();

export const useRecovery = () => useContext(RecoveryContext);

export const RecoveryProvider = ({ children }) => {
  const [email, setEmail] = useState(null); 
  const [otpVerified, setOtpVerified] = useState(false);

  return (
    <RecoveryContext.Provider
      value={{ email, setEmail, otpVerified, setOtpVerified }}
    >
      {children}
    </RecoveryContext.Provider>
  );
};
