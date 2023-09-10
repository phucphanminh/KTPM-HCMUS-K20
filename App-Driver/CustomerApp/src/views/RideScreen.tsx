import React, {useState, useEffect} from 'react';
import myStyles from '../configs/styles';
import {Text, Box, Button, Flex, VStack} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routers/navigationParams';
import {useDispatch} from 'react-redux';
import {setLoading, showMessage} from '../redux/reducers';

type RideScreenProps = NativeStackScreenProps<RootStackParamList, 'Ride'>;

import {Ride} from '../designPattern/adapter/Adapter';
import {FlatList, SafeAreaView} from 'react-native';
import RideItem from '../component/RideItem';
import {formatDatabaseTimestamp} from '../helpers/validate';
import {RideService} from '../services/ride/RideService';
import {User, UserInformation} from '../appData/user/User';
import {StatusColor} from '../component/Overlay/SlideMessage';

const RideScreen: React.FC<RideScreenProps> = ({}) => {
  const [data, setData] = useState();
  const driverInfo: UserInformation = User.getInstance().information;

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(setLoading(true));
        const responseData = await RideService.getRide(driverInfo.tel);
        setData(responseData.reverse());
        dispatch(showMessage(StatusColor.success, 'Get Rides success'));
      } catch (error) {
        dispatch(showMessage(StatusColor.error, error));
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={item => <RideItem data={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default RideScreen;
// onPress={() => navigation.navigate('Loading')
