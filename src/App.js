import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import { SocketIOProvider } from './context/SocketIOContext';
import { ConfigProvider } from './context/ConfigContext';

import ListScreen from './screens/ListScreen';
import AddItemScreen from './screens/AddItemScreen';
import ConfigScreen from './screens/ConfigScreen';

import { Appearance } from 'react-native';

const Tab = createBottomTabNavigator();

const myDarkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: '#303030',
    card: '#424242',
    text: '#f50057'
  },
}

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  return (
    <ConfigProvider>
        <NavigationContainer theme={ colorScheme === 'dark' ? myDarkTheme : DefaultTheme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => {
                let iconName;
              
                switch(route.name) {
                  case 'List':
                    iconName = 'list';
                    break;
                  case 'Add':
                    iconName = 'add';
                    break;
                  case 'Config':
                    iconName = 'settings';
                    break;
                }
                return <Icon name={iconName} type='ionicon' color={color} />
              },
            })}
            tabBarOptions={{
              activeTintColor: '#f50057',
              inactiveTintColor: 'white',
            }}
          >
            <Tab.Screen name="List" component={ListScreen} />
            <Tab.Screen name="Add" component={AddItemScreen} />
            <Tab.Screen name="Config" component={ConfigScreen} />
          </Tab.Navigator>
        </NavigationContainer>
    </ConfigProvider>
  )
};

export default App;