import React from 'react';
import myStyles from '../configs/styles';
import { Button, Text,Box } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/navigationParams';
 
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <Box style={{ ...myStyles.flexCenter, backgroundColor: 'white' }}>
      <Text style={{ color: 'black' }}>Home Screen</Text>

      <Button onPress={() => navigation.navigate('Loading')}>
        <Text fontSize="lg">Go to Loading</Text>
      </Button>
    </Box>
  );
};

export default HomeScreen;
