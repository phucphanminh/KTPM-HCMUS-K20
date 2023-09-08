import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Images} from '../configs/images';

type ItemProps = {
  title: string;
  origin: string;
  destination: string;
  price: string;
};
const FlatListCar = ({title, origin, destination, price}: ItemProps) => {
  return (
    <View className="flex flex-col py-2">
      <View className=" flex flex-row w-full justify-between mt-3 ">
        <View className="flex flex-row w-[80%]">
          <Image
            className="mt-4 ml-3 h-12 w-12"
            source={Images.Customer}></Image>
          <View className=" flex flex-col ml-2 w-[77%]">
            <Text className="ml-3 text-ellipsis font-extrabold text-xl">
              {title}
            </Text>
            <View className=" ml-3 flex flex-row items-center w-[100%] ">
              <Image className="h-6 w-6" source={Images.Origin} />
              <Text
                className=" flex-1 font-sans text-[#5d5454] text-xg"
                numberOfLines={1}>
                {origin}
              </Text>
            </View>

            <View className=" ml-4 flex flex-row items-center w-[100%] ">
              <Image className="h-4 w-4" source={Images.Location} />
              <Text
                className="ml-1 flex-1 font-sans text-[#5d5454] text-xg"
                numberOfLines={1}>
                {destination}
              </Text>
            </View>
          </View>
        </View>
        <View className="mr-2 flex flex-row items-center justify-end">
          <Text className="mt-3 text-ellipsis text-[17px]">{price}</Text>
        </View>
      </View>
    </View>
  );
};

export default FlatListCar;

const styles = StyleSheet.create({});
