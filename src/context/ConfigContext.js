import React, { createContext, useState } from 'react';

const ConfigContext = createContext();

const ConfigProvider = (props) => {
  const [socketIPAddress, setSocketIPAddress] = useState();
  const [adminKey, setAdminKey] = useState();
  
  const setConfig = ({ IPAddress, adminKey }) => {
    setSocketIPAddress(IPAddress);
    setAdminKey(adminKey);
  };

  return(
    <ConfigContext.Provider
      value={{
        socketIPAddress,
        adminKey,
        setConfig
      }}
    >
      { props.children}
    </ConfigContext.Provider>
  )
};

export {
  ConfigContext,
  ConfigProvider
}