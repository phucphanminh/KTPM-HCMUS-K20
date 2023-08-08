import { Container, Text, Flex, VStack, Image, theme, useTheme, Button } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/navigationParams';
import { setLoading } from '../redux/reducers';
import myStyles from '../configs/styles';
import {Images} from '../configs/images';
import { StyleSheet } from 'react-native';

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps>  = ({navigation}) => {


	const dispatch=useDispatch();

	const navigateSignIn=()=>{
		navigation.navigate("SignIn")
	}
	const navigateSignUp=()=>{
		navigation.navigate("SignUp")
	}
    return (
      <Flex style={myStyles.flexCenter} bgColor={"white"}>
		 <Flex flexDirection={"column"} justifyContent={"space-between"} height={"90%"}  >
			 <VStack justifyContent={"center"} alignItems={"center"} space={2}>
			 	<Image source={Images.welcome} alt='bg' />
				<Text style={styles.title}>
					Welcome
				</Text>
				<Text style={styles.subTitle}>
					Have a better sharing experience
				</Text>
			 </VStack>


			 <VStack space={2} width="80" marginX="auto" >
				<Button backgroundColor={"primary.700"} onPress={navigateSignUp} rounded="md" >
					<Text color="white" fontWeight={600}>Create an account</Text>
				</Button>
				<Button onPress={navigateSignIn} rounded="md" variant={"outline"} borderColor={"primary.600"} borderWidth={1}>
					<Text fontWeight={600} color={"primary.800"}>Log In</Text>
				</Button>
			 </VStack>	
		 </Flex>
		
	  </Flex>
    );
};

const styles=StyleSheet.create({
	title:{
		fontSize:24,
		fontWeight:"500",
		color:"black",
		lineHeight:30,
		textAlign:"center",
	},
	subTitle:{
		fontSize:16,
		fontWeight:"400",
		color: theme.colors.gray[400],
		lineHeight:24,
		textAlign:"center",
	}
})


export default WelcomeScreen;
