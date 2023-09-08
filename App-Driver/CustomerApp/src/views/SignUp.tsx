import { Flex, Text, Heading, VStack, Input, HStack, CheckCircleIcon, Button, theme, FormControl, Image, Box, Modal, Alert } from 'native-base';
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
import Divider from '../component/Divider';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const initialFormData: FormFieldSignUp = {
	driverName: '',
	driverTel: '',
	driverPass: '',
	driverAcc: '',
	driverBrandName: '',
	driverCMND: '',
	driverVehicleID: '',
	driverVehicleType: '',
};

const ErrorMessage: FormFieldSignUp = {
	driverName: 'Name is Required\n',
	driverTel: 'Phone number at least 10 digits\n',
	driverPass: 'Password at least 8 characters with letters and numbers\n',
	driverAcc: '',
	driverBrandName: '',
	driverCMND: '',
	driverVehicleID: '',
	driverVehicleType: '',
};



const SignUp: React.FC<SignUpScreenProps> = ({ navigation }) => {

	const [data, setData] = React.useState<FormFieldSignUp>(initialFormData);
	const [errorFields, setErrorFields] = React.useState({ driverName: true, driverTel: true, driverPass: true })
	const [showError, setShowError] = React.useState(false)
	const [showMessage, setShowMessage] = React.useState(false)

	const [message, setMessage] = React.useState("")
	const [isSuccess, setIsSuccess] = React.useState(true)

	const dispatch = useDispatch()

	const updateField = (fieldName: keyof FormFieldSignUp) => (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
		const value = event.nativeEvent.text;
		setData((prevData) => ({ ...prevData, [fieldName]: value }));
	};

	const validateForm = (): boolean => {
		const driverName = validate.notEmpty(data.driverName)
		const driverTel = validate.phone(data.driverTel)
		const driverPass = validate.password(data.driverPass)
		setErrorFields({ driverName, driverTel, driverPass })

		return driverName && driverTel && driverPass;
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
		<Flex margin={"auto"} height={"90%"} >
			<Heading marginBottom={4}>
				Sign up
			</Heading>

			<VStack w={"90%"} space={4}>
				<HStack w={"100%"} space={2}>
					<Input onChange={updateField('driverName')} type='text' placeholder='Name' width={"50%"} />
					<Input onChange={updateField('driverTel')} type='text' placeholder='Phone Number' keyboardType='number-pad' width={"50%"} />
				</HStack>

				<Input onChange={updateField('driverPass')} type='password' placeholder='Password' width={"100%"} />

				<HStack w={"100%"} space={2}>
					<Input onChange={updateField('driverAcc')} type='text' placeholder='BankAccount' width={"50%"} />
					<Input onChange={updateField('driverCMND')} type='text' placeholder='CCCD' width={"50%"} />
				</HStack>

				<Input onChange={updateField('driverBrandName')} type='text' placeholder='Brand' width={"100%"} />

				<HStack w={"100%"} space={2}>
					<Input onChange={updateField('driverVehicleID')} type='text' placeholder='VehicleNumber' width={"50%"} />
					<Input onChange={updateField('driverVehicleType')} type='text' placeholder='VehicleModel' width={"50%"} />
				</HStack>

				<HStack alignItems={"center"} space={2} >
					<CheckCircleIcon color="emerald.500" />
					<Text width={"95%"}>
						By signing up. you agree to the
						<Text color="emerald.500" textDecorationLine={'underline'}>
							Terms of service and Privacy policy.
						</Text>
					</Text>
				</HStack>


				<Button onPress={handleSubmit} backgroundColor={"primary.700"} rounded="md" >
					<Text color="white" fontWeight={600}>Sign Up</Text>
				</Button>


				<Divider>
					<Text style={{ width: "auto", paddingHorizontal: 10, textAlign: 'center' }}>or</Text>
				</Divider>


				<HStack space={2} mx={"auto"} alignItems={"center"}>
					<Button style={styles.iconBtn} variant={'outline'}>
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
						<Text color={"secondary.600"} onPress={() => navigation.navigate("SignIn")} textDecorationLine={'underline'}>
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
									{!errorFields.driverName && ErrorMessage.driverName}
									{!errorFields.driverTel && ErrorMessage.driverTel}
									{!errorFields.driverPass && ErrorMessage.driverPass}
								</Text>
							</VStack>
						</Alert>
					</Modal.Content>
				</Modal>
				<Modal isOpen={showMessage} onClose={() => setShowMessage(false)}>
					<Modal.Content>
						<Modal.CloseButton />
						<Alert status={isSuccess ? "success" : "error"}>
							<VStack alignItems={"center"} space={2}>
								<Alert.Icon />
								<Text color={isSuccess ? "success.600" : "error.600"} textAlign={"center"}>
									{message}
								</Text>
								{isSuccess && <Button colorScheme={isSuccess ? "success" : "error"} variant={"solid"} onPress={() => navigation.navigate("SignIn")} >
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


const styles = StyleSheet.create({
	iconBtn: {
		width: 50,
		height: 50,
		borderColor: theme.colors.gray[300]
	},
	icon: {
		objectFit: "contain",
	},
	errorMsg: {
		color: theme.colors.red[600]
	}


})

export default SignUp;
