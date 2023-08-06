import React from 'react';
import myStyles from '../configs/styles';
import { Text, Box, Button } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/navigationParams';
import { useDispatch } from 'react-redux';
import { setLoading } from './../redux/reducers';
 
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {

  const dispatch=useDispatch()

  const handlePress=()=>{
    console.log("Loadding screen is appeared");
    dispatch(setLoading())
  }
  
  return (
    <Box style={{ ...myStyles.flexCenter, backgroundColor: 'white' }}>
      <Text style={{ color: 'black' }}>Home Screen</Text>
      <Button onPress={handlePress}>
        <Text fontSize="lg">Go to Loading</Text>
      </Button>
    </Box>
  );
};

export default HomeScreen;
// onPress={() => navigation.navigate('Loading')