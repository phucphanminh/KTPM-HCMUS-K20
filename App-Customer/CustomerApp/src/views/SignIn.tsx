import { Flex, Text, Heading, VStack, Input, HStack,  Divider, Button, theme, FormControl, Image, Box, Modal, Alert, CloseIcon } from 'native-base';
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

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;


const initialFormData: FormFieldSignIn = {
	userTel: '',
	userPass: '',
};

const ErrorMessage: FormFieldSignIn = {
	userTel: 'PhoneNumber does not exist\n',
	userPass: 'Password is wrong\n',
};



const SignIn: React.FC<SignInScreenProps>  = ({navigation}) => {

	const [data, setData] = React.useState<FormFieldSignIn>(initialFormData);
	const [errorFields,setErrorFields]=React.useState({userTel:true,userPass:true})
	const [showError,setShowError]=React.useState(false)
	const [showSuccess,setShowSuccess]=React.useState(false)
	const dispatch=useDispatch()

	const updateField = (fieldName: keyof FormFieldSignIn) => (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
		const value = event.nativeEvent.text;
		setData((prevData) => ({ ...prevData, [fieldName]: value }));
	  };

	const validateForm=():boolean=>{
		const userTel=validate.phone(data.userTel)
		const userPass=validate.password(data.userPass)
		setErrorFields({userTel,userPass})

		return userTel && userPass;
	}

	const handleSubmit = () => {
		const isValidated = validateForm();
	  
		if (isValidated) {
			dispatch(setLoading(true));
			// Call API or perform further actions
			// UserService.signIn(data)
			
			dispatch(setLoading(false));
		  setShowSuccess(true);
		} else {
		  setShowError(true);
		}
	  };
	  
	
  	
    return (
		<Flex  margin={"auto"} height={"90%"} >
			<Heading marginBottom={4}>
				Sign in
			</Heading>
			<Divider  thickness="2" bg={"red.800"} />

			<VStack w={"90%"} space={4}>
			
				<FormControl >
					<Input  onChange={updateField("userTel")}  type='text' placeholder='Phone Number' keyboardType='number-pad'width={"100%"}/>
					<FormControl.ErrorMessage></FormControl.ErrorMessage>	
				</FormControl>
				<FormControl >
					<Input   onChange={updateField('userPass')} type='password' placeholder='Password'width={"100%"}/>
					<FormControl.ErrorMessage></FormControl.ErrorMessage>	
				</FormControl>
				<HStack justifyContent={"flex-end"} alignItems={"center"} space={1} >
					<Text  color={"secondary.600"} textDecorationLine={'underline'}>
						Forget password?
					</Text>
					<CloseIcon color="secondary.600"/>
				</HStack>


				<Button onPress={handleSubmit} backgroundColor={"primary.700"}  rounded="md" >
					<Text color="white" fontWeight={600}>Sign In</Text>
				</Button>

				<HStack mx={"auto"}>
					<Text >
							First time using app ?
							<Text color="emerald.500" onPress={()=>navigation.navigate("SignUp")} textDecorationLine={'underline'}>
							 Sign up
							</Text>
					</Text>
				</HStack>

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
				<Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)}>
					<Modal.Content>
							<Alert status={'success'}>
								<VStack alignItems={"center"} space={2}>
										<Alert.Icon />
										<Text textAlign={"center"}>
											Login Success!
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
