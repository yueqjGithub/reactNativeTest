import 'react-native-gesture-handler';
// In App.js in a new project
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// pages
import LoginPage from './src/pages/login/loginPage';
import IndexPage from './src/pages/index/index';
import CustomerPage from './src/pages/customer/customer';
import AgentPage from './src/pages/agent/agent'

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Login'}>
          <Stack.Screen name="Login" component={LoginPage} options={{ title: '登录', headerShown: false }} />
          <Stack.Screen name="Index" component={IndexPage} options={{ title: '首页', headerShown: false }} />
          <Stack.Screen name="Customer" component={CustomerPage} options={{ title: '我的客户', headerShown: false }} />
          <Stack.Screen name="Agent" component={AgentPage} options={{ title: '我的代理', headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;