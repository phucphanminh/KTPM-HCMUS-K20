import {
	Container,
	Text,
	Flex,
	VStack,
	Image,
	theme,
	useTheme,
	Button,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/navigationParams';
import { setLoading, setLogin, showMessage } from '../redux/reducers';
import myStyles from '../configs/styles';
import { Images } from '../configs/images';
import { StyleSheet } from 'react-native';
import { User } from '../appData/user/User';
import { UserService } from '../services/user/UserService';
import { StoreType } from '../redux';
import { StatusColor } from '../component/Overlay/SlideMessage';
import DriverProfile from '../component/Profile/Driver';

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {

	const dispatch = useDispatch()

	const navigateSignIn = () => {
		navigation.navigate("SignIn")
	}
	const navigateSignUp = () => {
		navigation.navigate("SignUp")
	}

	const isLogin = useSelector((store: StoreType) => store.auth.isLogin)


	const handleSignOut = () => {
		//clear data of User
		UserService.signOut();
		dispatch(setLogin(User.isUserLogin()))
	}
	const handleEdit = () => {
		dispatch(showMessage(StatusColor.info, "Not impliment yet"))
	}

	return (
		<Flex style={myStyles.flexCenter} bgColor={"white"}>
			<Flex flexDirection={"column"} justifyContent={"space-between"} height={"90%"} >
				{isLogin ? <Flex flexDirection={"column"} justifyContent={"center"} height={"100%"}>
					<DriverProfile data={User.getInstance().information} />
					<Button style={styles.btn} variant={"outline"} borderColor={"primary.600"} borderWidth={1} onPress={handleEdit}>
						<Text color="primary.800" fontWeight={600}>Edit Profile</Text>
					</Button>
					<Button style={styles.btn} onPress={handleSignOut} >
						<Text color="white" fontWeight={600}>Sign Out</Text>
					</Button>
				</Flex> : <>
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
						<Button onPress={navigateSignUp} rounded="md" >
							<Text color="white" fontWeight={600}>Create an account</Text>
						</Button>
						<Button onPress={navigateSignIn} rounded="md" variant={"outline"} borderColor={"primary.600"} borderWidth={1}>
							<Text fontWeight={600} color={"primary.800"}>Log In</Text>
						</Button>
					</VStack>
				</>}

			</Flex>

		</Flex>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: '500',
		color: 'black',
		lineHeight: 30,
		textAlign: 'center',
	},
	subTitle: {
		fontSize: 16,
		fontWeight: '400',
		color: theme.colors.gray[400],
		lineHeight: 24,
		textAlign: 'center',
	},
	btn: {
		marginTop: 8,
	}
});

export default WelcomeScreen;
