import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../views/HomeScreen';
import Loader from '../views/Loader';
import { RootStackParamList } from './navigationParams';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"  screenOptions={{
          headerShown: false, 
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Loading" component={Loader} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
