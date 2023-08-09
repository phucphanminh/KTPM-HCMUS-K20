import { Flex, Text, Heading, VStack, Input, HStack, CheckCircleIcon,  Button, theme, FormControl, Image, Box, Modal, Alert, CloseIcon } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/navigationParams';
import { setLoading } from './../redux/reducers';
import { Icons } from '../configs/images';
import { StyleSheet } from 'react-native';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { validate } from './../helpers/validate';
import { FormFieldSignIn, UserService } from './../services/user/UserService';
import Divider from './../components/Divider';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const initialFormData: FormFieldSignIn = {
	userTel:"",
	userPass:"",
};

const ErrorMessage: FormFieldSignIn = {
	userTel: 'Phone number is required\n',
	userPass: 'Password is required\n',
};



const SignIn: React.FC<SignInScreenProps>  = ({navigation}) => {

	const [data, setData] = React.useState<FormFieldSignIn>(initialFormData);
	const [errorFields,setErrorFields]=React.useState({userTel:true,userPass:true})
	const [showError,setShowError]=React.useState(false)
	const [showMessage,setShowMessage]=React.useState(false)

	const [message,setMessage]=React.useState("")
	const [isSuccess,setIsSuccess]=React.useState(true)

	const dispatch=useDispatch()

	const updateField = (fieldName: keyof FormFieldSignIn) => (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
		const value = event.nativeEvent.text;
		setData((prevData) => ({ ...prevData, [fieldName]: value }));
	  };

	const validateForm=():boolean=>{
		const userTel=validate.notEmpty(data.userTel)
		const userPass=validate.notEmpty(data.userPass)
		setErrorFields({userTel,userPass})

		return  userTel && userPass;
	}

	const handleSubmit = async () => {
		const isValidated = validateForm();
	  
		if (isValidated) {
		  dispatch(setLoading(true));
		  try {
			// Call API or perform further actions
			const responseData = await UserService.signIn(data);
			setIsSuccess(true);
			setMessage(responseData);
		  } catch (error) {
			setIsSuccess(false);
			setMessage(error as string);
		  } finally {
			dispatch(setLoading(false));
			setShowMessage(true);
		  }
		} else {
		  setShowError(true);
		}
	  };

    return (
		<Flex  margin={"auto"} height={"90%"} >
			<Heading marginBottom={4}>
				Sign in
			</Heading>
			

			<VStack w={"90%"} space={4}>
				
				<FormControl >
					<Input  onChange={updateField('userTel')}  type='text' placeholder='Phone Number' keyboardType='number-pad'width={"100%"}/>
				</FormControl>
				<FormControl >
					<Input   onChange={updateField('userPass')} type='password' placeholder='Password'width={"100%"}/>
				</FormControl>
				<HStack justifyContent={"flex-end"} alignItems={"center"}  >
					<CloseIcon color="error.600"/>
					<Text  color="error.600" textDecorationLine={'underline'}>
						Forgot Password?
					</Text>
				</HStack>
		
				<Button onPress={handleSubmit} backgroundColor={"primary.700"}  rounded="md" >
					<Text color="white" fontWeight={600}>Sign In</Text>
				</Button>

				<Divider/>
					
				<HStack space={2}  mx={"auto"} alignItems={"center"}>
					<Button  style={styles.iconBtn} variant={'outline'}>
						<Image style={styles.icon} source={Icons.Gmail} alt="icon" />
					</Button>
					<Button style={styles.iconBtn} variant={'outline'}>
						<Image style={styles.icon} source={Icons.Facebook} alt="icon" />
					</Button>
					<Button style={styles.iconBtn} variant={'outline'}>
						<Image style={styles.icon} source={Icons.Apple} alt="icon" />
					</Button>
				</HStack>

			

				<HStack mx={"auto"}>
					<Text >
							First time? 
							<Text color={"success.600"} onPress={()=>navigation.navigate("SignUp")} textDecorationLine={'underline'}>
							 Sign Up
							</Text>
					</Text>
				</HStack>

				<Modal isOpen={showError} onClose={() => setShowError(false)}>
					<Modal.Content>
						<Modal.CloseButton />
							<Alert status={'error'}>
								<VStack alignItems={"center"} space={2}>
										<Alert.Icon />
										<Text style={styles.errorMsg} textAlign={"center"}>
											{!errorFields.userTel&& ErrorMessage.userTel}
											{!errorFields.userPass&& ErrorMessage.userPass}
										</Text>
									</VStack>
							</Alert>
					</Modal.Content>
				</Modal>
				<Modal isOpen={showMessage} onClose={() => setShowMessage(false)}>
					<Modal.Content>
						<Modal.CloseButton />
							<Alert status={isSuccess?"success":"error"}>
								<VStack alignItems={"center"} space={2}>
										<Alert.Icon />
										<Text color={isSuccess?"success.600":"error.600"} textAlign={"center"}>
											{message}
										</Text>
									</VStack>
							</Alert>
					</Modal.Content>
				</Modal>

				
			</VStack>
			
	</Flex>
    );
};


const styles=StyleSheet.create({
	iconBtn:{
		width:50,
		height:50,
		borderColor:theme.colors.gray[300]
	},
	icon:{
		objectFit:"contain",
	},
	errorMsg:{
		color:theme.colors.red[600]
	}
	

})

export default SignIn;
