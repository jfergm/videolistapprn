import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';

import { SocketIOProvider } from './context/SocketIOContext';

import ListScreen from './screens/ListScreen';
import AddItemScreen from './screens/AddItemScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SocketIOProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;
              
              switch(route.name) {
                case 'List':
                  iconName = 'list';
                  break;
                case 'AddItem':
                  iconName = 'add-outline';
                  break;
              }
  
              // You can return any component that you like here!
              return <Icon type="Ionicons" name={iconName} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="List" component={ListScreen} />
          <Tab.Screen name="AddItem" component={AddItemScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SocketIOProvider>
  )
};

export default App;