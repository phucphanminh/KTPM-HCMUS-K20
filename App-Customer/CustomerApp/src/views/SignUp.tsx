import { Flex, Text, Heading, VStack, Input, HStack, CheckCircleIcon, Divider, Button, theme, FormControl, Image, Box, Modal, Alert } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/navigationParams';
import { setLoading } from './../redux/reducers';
import { Icons } from '../configs/images';
import { StyleSheet } from 'react-native';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { validate } from './../helpers/validate';
import { FormFieldSignUp, UserService } from './../services/user/UserService';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const initialFormData: FormFieldSignUp = {
	userName:"",
	userTel:"",
	userPass:"",
};

const ErrorMessage: FormFieldSignUp = {
	userName: 'Name is Required\n',
	userTel: 'Phone number at least 10 digits\n',
	userPass: 'Password at least 8 characters with letters and numbers\n',
};



const SignUp: React.FC<SignUpScreenProps>  = ({navigation}) => {

	const [data, setData] = React.useState<FormFieldSignUp>(initialFormData);
	const [errorFields,setErrorFields]=React.useState({userName:true,userTel:true,userPass:true})
	const [showError,setShowError]=React.useState(false)
	const [showMessage,setShowMessage]=React.useState(false)

	const [message,setMessage]=React.useState("")
	const [isSuccess,setIsSuccess]=React.useState(true)

	const dispatch=useDispatch()

	const updateField = (fieldName: keyof FormFieldSignUp) => (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
		const value = event.nativeEvent.text;
		setData((prevData) => ({ ...prevData, [fieldName]: value }));
	  };

	const validateForm=():boolean=>{
		const userName=validate.notEmpty(data.userName)
		const userTel=validate.phone(data.userTel)
		const userPass=validate.password(data.userPass)
		setErrorFields({userName,userTel,userPass})

		return userName && userTel && userPass;
	}

	const handleSubmit = async () => {
		const isValidated = validateForm();
	  
		if (isValidated) {
		  dispatch(setLoading(true));
		  try {
			// Call API or perform further actions
			const responseData = await UserService.signUp(data);
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
				Sign up 
			</Heading>
			<Divider  thickness="2" bg={"red.800"} />

			<VStack w={"90%"} space={4}>
				<FormControl >
					<Input  onChange={updateField('userName')} type='text' placeholder='Name' width={"100%"}/>	
				</FormControl>
				<FormControl >
					<Input  onChange={updateField('userTel')}  type='text' placeholder='Phone Number' keyboardType='number-pad'width={"100%"}/>
				</FormControl>
				<FormControl >
					<Input   onChange={updateField('userPass')} type='password' placeholder='Password'width={"100%"}/>
				</FormControl>
				<HStack alignItems={"center"} space={2} >
					<CheckCircleIcon color="emerald.500"/>
					<Text width={"95%"}>
						By signing up. you agree to the 
						<Text  color="emerald.500" textDecorationLine={'underline'}>
							Terms of service and Privacy policy.
						</Text>
					</Text>
				</HStack>


				<Button onPress={handleSubmit} backgroundColor={"primary.700"}  rounded="md" >
					<Text color="white" fontWeight={600}>Sign Up</Text>
				</Button>

				{/* Divider */}
				<Box style={{flexDirection: 'row', alignItems: 'center'}}>
					<Box style={{flex: 1, height: 1.5, backgroundColor: theme.colors.gray[400]}} />
					<Box>
						<Text style={{width: "auto", paddingHorizontal:10, textAlign: 'center'}}>or</Text>
					</Box>
					<Box style={{flex: 1, height: 1.5, backgroundColor: theme.colors.gray[400]}} />
				</Box>

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
							Already have an account?  
							<Text color={"secondary.600"} onPress={()=>navigation.navigate("SignIn")} textDecorationLine={'underline'}>
							 Sign in
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
											{!errorFields.userName&& ErrorMessage.userName}
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
										{isSuccess&&<Button colorScheme={isSuccess?"success":"error"} variant={"solid"} onPress={()=>navigation.navigate("SignIn")} >
											Sign in
										</Button>}
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

export default SignUp;
