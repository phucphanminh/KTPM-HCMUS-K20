import { Flex, Text, Heading, VStack, Input, HStack, CheckCircleIcon, Button, theme, FormControl, Image, Box, Modal, Alert, CloseIcon } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/navigationParams';
import { setLoading, setLogin } from './../redux/reducers';
import { Icons } from '../configs/images';
import { StyleSheet } from 'react-native';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { validate } from './../helpers/validate';
import { FormFieldSignIn, UserService } from './../services/user/UserService';
import { User } from '../appData/user/User';
import useCustomNavigation from '../hooks/useCustomNavigation';
import Divider from '../component/Divider';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const initialFormData: FormFieldSignIn = {
  driverTel: '',
  driverPass: '',
};

const ErrorMessage: FormFieldSignIn = {
  driverTel: 'Phone number is required\n',
  driverPass: 'Password is required\n',
};

const SignIn: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [data, setData] = React.useState<FormFieldSignIn>(initialFormData);
  const [errorFields, setErrorFields] = React.useState({
    driverTel: true,
    driverPass: true,
  });
  const [showError, setShowError] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);

  const [message, setMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(true);

  const dispatch = useDispatch();
  const navigate = useCustomNavigation()

  const updateField =
    (fieldName: keyof FormFieldSignIn) =>
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const value = event.nativeEvent.text;
        setData(prevData => ({ ...prevData, [fieldName]: value }));
      };

  const validateForm = (): boolean => {
    const driverTel = validate.notEmpty(data.driverTel);
    const driverPass = validate.notEmpty(data.driverPass);
    setErrorFields({ driverTel, driverPass });

    return driverTel && driverPass;
  };

  const handleSubmit = async () => {
    const isValidated = validateForm();

    if (isValidated) {
      dispatch(setLoading(true));
      try {
        // Call API or perform further actions
        const { result } = await UserService.signIn(data);
        setIsSuccess(true);
        setMessage("Login Success");

        const user = User.getInstance()
        const info = await user.getInformation(result)
        dispatch(setLogin(User.isUserLogin()))
        navigate.navigate("Home")

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
    <Flex margin={'auto'} height={'90%'}>
      <Heading marginBottom={4}>Sign in</Heading>
      <Divider backgroundColor={'red.800'} />

      <VStack w={'90%'} space={4}>
        <FormControl>
          <Input
            onChange={updateField('driverTel')}
            type="text"
            placeholder="Phone Number"
            keyboardType="number-pad"
            width={'100%'}
          />
        </FormControl>
        <FormControl>
          <Input
            onChange={updateField('driverPass')}
            type="password"
            placeholder="Password"
            width={'100%'}
          />
        </FormControl>
        <HStack justifyContent={'flex-end'} alignItems={'center'}>
          <CloseIcon color="error.600" />
          <Text color="error.600" textDecorationLine={'underline'}>
            Forgot Password?
          </Text>
        </HStack>

        <Button
          onPress={handleSubmit}
          backgroundColor={'primary.700'}
          rounded="md">
          <Text color="white" fontWeight={600}>
            Sign In
          </Text>
        </Button>

        <HStack mx={"auto"}>
          <Text >
            First time?
            <Text color={"success.600"} onPress={() => navigation.navigate("SignUp")} textDecorationLine={'underline'}>
              Sign Up
            </Text>
          </Text>
        </HStack>

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

        <Modal isOpen={showError} onClose={() => setShowError(false)}>
          <Modal.Content>
            <Modal.CloseButton />
            <Alert status={'error'}>
              <VStack alignItems={'center'} space={2}>
                <Alert.Icon />
                <Text style={styles.errorMsg} textAlign={'center'}>
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
            <Alert status={isSuccess ? 'success' : 'error'}>
              <VStack alignItems={'center'} space={2}>
                <Alert.Icon />
                <Text
                  color={isSuccess ? 'success.600' : 'error.600'}
                  textAlign={'center'}>
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

const styles = StyleSheet.create({
  iconBtn: {
    width: 50,
    height: 50,
    borderColor: theme.colors.gray[300],
  },
  icon: {
    objectFit: 'contain',
  },
  errorMsg: {
    color: theme.colors.red[600],
  },
});

export default SignIn;
