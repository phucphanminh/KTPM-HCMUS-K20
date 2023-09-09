import {Text, View, Image} from 'react-native';
import React, {Component} from 'react';
import {Images} from '../configs/images';
import {Button} from 'native-base';
import {useDispatch} from 'react-redux';
import {setStep} from '../redux/reducers';
import {selectStep} from '../redux/reducers';
import {useSelector} from 'react-redux';
import {SocketIOClient} from '../socket';
import {SOCKET} from '../socket/constants';

type ItemProps = {
  customerName: string;
  telephonenumber: string;
};

const NotifyInformationCustomer = ({
  customerName,
  telephonenumber,
}: ItemProps) => {
  const socket = SocketIOClient.getInstance();
  const dispatch = useDispatch();
  const step = useSelector(selectStep);
  React.useEffect(() => {}, [step]);
  return (
    <View className="py-2 flex flex-col w-[90%] h-[90%] bg-white rounded-xl items-center">
      <View className=" w-[100%] h-[70%]   flex flex-row items-center">
        <Image source={Images.profile} className="ml-2 h-[90%] w-[60px]" />
        <View className="gap-2 ml-1 flex flex-col h-full w-  ">
          <Text className="font-extrabold text-[#6f6868] text-xl">
            {customerName}
          </Text>
          <Text className="font-semibold text-[#454242] text-md">
            {telephonenumber}
          </Text>
        </View>
      </View>
      <View className=" mb-3 flex flex-row h-[40%] w-[90%] rounded-md justify-center gap-3">
        <Button className="w-[30%] text-center  bg-red-500 h-[80%]">
          <Text className="text-white h-full text-xs">Cancel Trip</Text>
        </Button>
        {step.name === 'pick up' ? (
          <Button
            className="w-[30%] text-center  bg-green-500 h-[80%]"
            onPress={() => {
              dispatch(setStep({name: 'drop off'}));
              socket.emitSuccessTrip(telephonenumber);
            }}>
            <Text className="text-white h-full text-xs">drop off</Text>
          </Button>
        ) : (
          <Button
            className="w-[30%] text-center  bg-green-500 h-[80%]"
            onPress={() => {
              dispatch(setStep({name: 'pick up'}));
              socket.emitPickCustomer(telephonenumber);
            }}>
            <Text className="text-white h-full text-xs">pick up</Text>
          </Button>
        )}
      </View>
    </View>
  );
};
export default NotifyInformationCustomer;
