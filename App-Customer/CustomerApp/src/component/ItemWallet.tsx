import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Images} from '../configs/images';

type ItemProps = {
  title: string;
  image: string | any;
  classname: string;
};
const ItemWallet = ({title, image, classname}: ItemProps) => {
  return (
    <View
      className={`flex flex-col border-2 mb-5 mx-3 rounded-lg border-[#FEC400] bg-[#FFFBE7] ${classname}`}>
      <View className=" flex flex-row w-full justify-between  ">
        <View className="flex flex-row w-[80%]">
          <View className=" flex flex-row ml-2 w-[50%] items-center p-2">
            <Image className="h-12 w-12" source={image}></Image>
            <Text className="ml-3 text-ellipsis  text-xl">{title}</Text>
            <Text className=" ml-3 flex-1 font-sans text-[#5d5454] text-xg"></Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemWallet;

const styles = StyleSheet.create({});
