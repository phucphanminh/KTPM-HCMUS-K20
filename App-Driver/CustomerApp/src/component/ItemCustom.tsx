import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Images} from '../configs/images';

type ItemProps = {title: string; address: string; time: string};
const ItemCustom = ({title, address, time}: ItemProps) => {
  return (
    <View
      className="w-full h-[50%] overflow-auto"
      // onPress={() => {
      //   navigation.navigate('Book');
      // }}
    >
      <View className="flex flex-col">
        <View className=" flex flex-row w-full justify-between mt-3 ">
          <View className="flex flex-row w-[50%]">
            <Image source={Images.clock}></Image>
            <Text
              className="ml-3 text-ellipsis overflow-hidden"
              numberOfLines={1}>
              {title}
            </Text>
          </View>
          <View className="flex flex-row items-start justify-end w-[50%]">
            <Text className="text-ellipsis overflow-hidden" numberOfLines={1}>
              {time}
            </Text>
          </View>
        </View>
        <View className=" flex flex-row mt-2 ml-8 w-[50%]">
          <Text className=" flex-1 font-sans text-[#B8B8B8]" numberOfLines={1}>
            {address}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ItemCustom;

const styles = StyleSheet.create({});
