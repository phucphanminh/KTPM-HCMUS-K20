import {
  Flex,
  Text,
  Heading,
  VStack,
  Input,
  HStack,
  CheckCircleIcon,
  Divider,
  Button,
  theme,
  FormControl,
  Image,
  Box,
  Modal,
  Alert,
  CloseIcon,
} from 'native-base';
import React from 'react';
import Button from '../components/Button/Button';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/navigationParams';
import { setLoading } from './../redux/reducers';



const textColor:string="secondary.600"

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const initialFormData: FormFieldSignIn = {
	userTel:"",
	userPass:"",
};

const ErrorMessage: FormFieldSignIn = {
	userTel: 'Phone number is required\n',
	userPass: 'Password is required\n',
};



const initialFormData: FormFieldSignIn = {
  userTel: '',
  userPass: '',
};

const ErrorMessage: FormFieldSignIn = {
  userTel: 'Phone number is required\n',
  userPass: 'Password is required\n',
};

const SignIn: React.FC<SignInScreenProps> = ({navigation}) => {
  const [data, setData] = React.useState<FormFieldSignIn>(initialFormData);
  const [errorFields, setErrorFields] = React.useState({
    userTel: true,
    userPass: true,
  });
  const [showError, setShowError] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);

  const [message, setMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(true);

  const dispatch = useDispatch();

  const updateField =
    (fieldName: keyof FormFieldSignIn) =>
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const value = event.nativeEvent.text;
      setData(prevData => ({...prevData, [fieldName]: value}));
    };

  const validateForm = (): boolean => {
    const userTel = validate.notEmpty(data.userTel);
    const userPass = validate.notEmpty(data.userPass);
    setErrorFields({userTel, userPass});


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
