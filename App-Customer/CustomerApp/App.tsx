import React from 'react';
import myTheme from './src/configs/Theme';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native';
import Routes from './src/routers/Routes';

const App = () => {
  return (
      <NativeBaseProvider theme={myTheme}>
        <SafeAreaView style={{flex:1}}>
          <Routes/>
        </SafeAreaView>
      </NativeBaseProvider>

  );
};

export default App;
