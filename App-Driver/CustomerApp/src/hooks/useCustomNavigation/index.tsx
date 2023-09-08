import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routers/navigationParams';

const useCustomNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return navigation;
};

export default useCustomNavigation;