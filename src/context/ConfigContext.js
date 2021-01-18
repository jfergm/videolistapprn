import React, { createContext, useState, useEffect, Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfigContext = createContext();

class ConfigProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socketIPAddress: null,
      adminKey: null
    }
  }

  async componentDidMount() {
    try {
      const configString = await AsyncStorage.getItem('config');
      if(configString !== null) {
        const config = JSON.parse(configString);
        this.setConfig({...config}, false);
      }
    } catch(e) {
      console.log(e)
    }
  }

  async setConfig({ IPAddress, adminKey }, saveAsyncStorage) {
    this.setState({
      socketIPAddress: IPAddress,
      adminKey
    })

    if(saveAsyncStorage) {
      try {
        const config = JSON.stringify({
          IPAddress,
          adminKey
        })
        await AsyncStorage.setItem('config', config)
      } catch (e) {
        console.log(e)
      }
    }
  }

  render() {
    return(
      <ConfigContext.Provider
      value={{
        socketIPAddress: this.state.socketIPAddress,
        adminKey: this.state.adminKey,
        setConfig: this.setConfig.bind(this)
      }}
    >
      { this.props.children}
    </ConfigContext.Provider>
    )
  }
}

export {
  ConfigContext,
  ConfigProvider
}