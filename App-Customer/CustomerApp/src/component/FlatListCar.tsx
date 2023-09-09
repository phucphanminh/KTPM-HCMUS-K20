import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Images} from '../configs/images';
import {Car} from '../designPattern/Factories/CarFactory';
import {useSelector} from 'react-redux';
import {selectorigin, selectdestination} from '../redux/reducers';
import {LocationService} from '../services/location/LocationService';

type ItemProps = {car: Car};

const FlatListCar = ({car}: ItemProps) => {
  const origin = useSelector(selectorigin);
  const destination = useSelector(selectdestination);
  return (
    <View className="flex flex-col w-full">
      <View className=" flex flex-row w-full justify-between mt-3 ">
        <View className="flex flex-row w-[80%]">
          <Image
            className="mt-4 ml-3 h-10 object-contain w-10"
            source={car.data.image}></Image>
          <View className=" flex flex-col ml-2 w-[50%]">
            <Text className="ml-3 text-ellipsis font-extrabold text-xl">
              {car.data.type}
            </Text>
            <Text className=" ml-3 flex-1 font-sans text-[#5d5454] text-xg">
              {car.data.detail}
            </Text>
          </View>
        </View>
        <View className="mr-2 flex flex-row items-start justify-end ">
          <Text className="mt-3 text-ellipsis text-[17px] mr-3">
            {car.countPrice(
              LocationService.calculateDistance(
                origin.location,
                destination.location,
              ),
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FlatListCar;

const styles = StyleSheet.create({});
