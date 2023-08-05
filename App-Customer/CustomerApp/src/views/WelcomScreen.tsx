import { Container, Text, Flex } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/navigationParams';
import { setLoading } from './../redux/reducers';
import myStyles from './../configs/styles';

const textColor:string="secondary.600"

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps>  = ({navigation}) => {


	const dispatch=useDispatch();

	const handleLoading=()=>{
		dispatch(setLoading())
	}
    return (
      <Flex style={myStyles.flexCenter} bgColor={"red.300"}>
		  <Text color={textColor}>
		  Welcome
		  </Text>
	  </Flex>
    );
};


export default WelcomeScreen;
