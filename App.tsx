import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navigator from './screens/Navigator';
// import {
//   SafeAreaView,
// } from 'react-native';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Navigator></Navigator>
    </NavigationContainer>
  );
};

export default App;
