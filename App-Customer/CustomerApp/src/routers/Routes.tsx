import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../views/HomeScreen';
import { RootStackParamList } from './navigationParams';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../views/Loader';
import { StoreType } from '../redux';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import WelcomeScreen from './../views/WelcomScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {


  const appStatus=useSelector((store:StoreType)=>store.status)

  return (
    <>
      {appStatus.isLoading && <Loader />}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome"  screenOptions={{
            headerShown: false, 
          }}>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
