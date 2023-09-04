import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../views/HomeScreen';
import {RootStackParamList} from './navigationParams';
import {useDispatch, useSelector} from 'react-redux';
import Loader from './../views/Loader';
import {StoreType} from '../redux';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import FindScreen from '../views/FindScreen';
import WelcomeScreen from '../views/WelcomeScreen';
import RideScreen from './../views/RideScreen';
import SlideMessage from '../component/Overlay/SlideMessage';
import Footer from '../component/Footer/Footer';
import BookScreen from '../views/BookScreen';
import SelectWalletScreen from '../views/SelecteWallet';
import MapBookScreen from '../views/MapBookScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  const appStatus = useSelector((store: StoreType) => store.status);
  const slideMessage = useSelector((store: StoreType) => store.slideMessage);
  return (
    <>
      {appStatus.isLoading && <Loader />}
      <NavigationContainer>
        <SlideMessage
          placement="top"
          status={slideMessage.status}
          message={slideMessage.message}
          key={slideMessage.key}
        />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SelectWallet" component={SelectWalletScreen} />
          <Stack.Screen name="Book" component={BookScreen} />
          <Stack.Screen name="MapBook" component={MapBookScreen} />
          <Stack.Screen name="Find" component={FindScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Ride" component={RideScreen} />
        </Stack.Navigator>
        <Footer />
      </NavigationContainer>
    </>
  );
};

export default Routes;
