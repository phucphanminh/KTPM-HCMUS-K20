import { Flex, Text } from 'native-base';
import React from 'react';
import Button from '../components/Button/Button';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/navigationParams';
import { setLoading } from './../redux/reducers';



const textColor:string="secondary.600"

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn: React.FC<SignInScreenProps>  = ({navigation}) => {


	const dispatch=useDispatch();

	const handleLoading=()=>{
		dispatch(setLoading())
	}
    return (
      <Flex>
		  <Text color={textColor}>
		  Sign in
		  </Text>
		  <Button onPress={()=>navigation.navigate("SignUp")}>
			<Text color={textColor}>
				 Sign up
			</Text>
		  </Button>
		  
	  </Flex>
    );
};


export default SignIn;
