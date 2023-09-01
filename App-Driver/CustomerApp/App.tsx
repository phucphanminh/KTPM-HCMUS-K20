import React, { useEffect } from 'react';
import myTheme from './src/configs/Theme';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native';
import Routes from './src/routers/Routes';
import { Provider } from 'react-redux';
import {  store } from './src/redux/index';





const App = () => {


  return (
    
      <NativeBaseProvider theme={myTheme}>
        <Provider store={store}>
          <SafeAreaView style={{flex:1}} >
            <Routes/>
          </SafeAreaView>
        </Provider>
      </NativeBaseProvider>

  );
};

export default App;
