import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routers/navigationParams';
import Map from '../component/Map';
import ChoiceOrign from '../component/ChoiceOrign';
import FlatListCar from '../component/FlatListCar';
import {useSelector} from 'react-redux';
import {selectStep} from '../redux/reducers';
import {Images} from '../configs/images';
import {useDispatch} from 'react-redux';
import ItemWallet from '../component/ItemWallet';

const DATA: ItemData[] = [
  {
    id: '1',
    title: 'Momo',
    image: Images.Momo,
  },
  {
    id: '2',
    title: 'Cash',
    image: Images.Cash,
  },
];
type ItemData = {
  id: string;
  title: string;
  image: string;
};

type SelectWalletScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SelectWallet'
>;
const SelectWalletScreen: React.FC<SelectWalletScreenProps> = ({
  navigation,
}) => {
  const [selectedId, setSelectedId] = useState<string>();
  const Step = useSelector(selectStep);

  React.useEffect(() => {}, [Step]);
  const dispatch = useDispatch();
  return (
    <View className="h-full w-full">
      <View className="h-full w-full">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="mt-3 flex flex-row w-[100%] h-[5%] ">
          <View className="ml-2 flex flex-row h-full w-full items-center justify-start mr-7 ">
            <Image className="" source={Images.angle} />
            <Text className="text-xg">Back</Text>
          </View>
        </TouchableOpacity>
        <View className="flex flex-col gap-1 ml-4 mb-5 mt-2">
          <Text className="font-bold text-2xl">Select payment method</Text>
          <Text className="font-extralight">
            Select payment method you want to use
          </Text>
        </View>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          extraData={selectedId}
          renderItem={({item}) => (
            <TouchableOpacity
              className="relative"
              onPress={() => setSelectedId(item.id)}>
              <ItemWallet
                title={item.title}
                image={item.image}
                classname={`${item.id === selectedId ? '' : 'opacity-40 '}`}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default SelectWalletScreen;
