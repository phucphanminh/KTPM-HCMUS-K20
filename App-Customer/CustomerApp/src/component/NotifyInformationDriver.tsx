import {Text, View, Image} from 'react-native';
import React, {Component} from 'react';
import {Images} from '../configs/images';

interface NotifyInformationDriverProps {
  driverName: string;
  vehicleInfo: string;

  // Add any other props you need here
}

export default class NotifyInformationDriver extends Component<NotifyInformationDriverProps> {
  render() {
    const {driverName, vehicleInfo} = this.props;
    return (
      <View className=" w-[90%] h-[80%] bg-white rounded-xl flex flex-row items-center">
        <Image source={Images.profile} className="ml-2 h-[100%] w-[60px]" />
        <View className="gap-2 ml-1 flex flex-col h-full w-full  ">
          <Text className="font-extrabold text-[#6f6868] text-xl">
            {driverName}
          </Text>
          <Text className="font-semibold text-[#454242] text-md">
            {vehicleInfo}
          </Text>
        </View>
      </View>
    );
  }
}
