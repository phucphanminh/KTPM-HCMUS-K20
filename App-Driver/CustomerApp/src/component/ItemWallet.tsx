import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Images} from '../configs/images';

type ItemProps = {
  title: string;
  detail: string;
  price: string;
  classname: string;
};
const ItemWallet = ({title, detail, price, classname}: ItemProps) => {
  return (
    <View
      className={`flex flex-col border-2 mb-5 mx-3 rounded-lg border-[#FEC400] bg-[#FFFBE7] ${classname}`}>
      <View className=" flex flex-row w-full justify-between mt-3 ">
        <View className="flex flex-row w-[80%]">
          <Image className="mt-4 ml-3 h-12 w-12" source={Images.car}></Image>
          <View className=" flex flex-col ml-2 w-[50%]">
            <Text className="ml-3 text-ellipsis font-extrabold text-xl">
              {title}
            </Text>
            <Text className=" ml-3 flex-1 font-sans text-[#5d5454] text-xg">
              {detail}
            </Text>
          </View>
        </View>
        <View className="mr-2 flex flex-row items-start justify-end">
          <Text className="mt-3 text-ellipsis text-[17px]">{price}</Text>
        </View>
      </View>
    </View>
  );
};

export default ItemWallet;

const styles = StyleSheet.create({});
