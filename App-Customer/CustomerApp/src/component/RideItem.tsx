import React from 'react';
import {ListRenderItemInfo, SafeAreaView, StyleSheet} from 'react-native';
import {Ride} from '../designPattern/adapter/Adapter';
import {Flex, HStack, Image, Text, theme, VStack} from 'native-base';
import {Images} from '../configs/images';
import {truncateString} from './../helpers/validate';
import {RideState} from './../models/Ride/State';

interface RideItemProps {
  data: ListRenderItemInfo<Ride>; // Define the correct type for the 'data' prop
}

const RideItem: React.FC<RideItemProps> = ({data}) => {
  // Extract relevant information from the 'data' prop
  const {item: ride} = data;

  return (
    <Flex style={styles.item}>
      <HStack alignItems={'center'} space={2}>
        <Image
          style={styles.image}
          source={Images.Seat4Car}
          size={'md'}
          alt="img"
        />
        <VStack space={2}>
          <HStack>
            <Text>Customer: </Text>
            <Text style={styles.boldText}>{ride.appuser_name}</Text>
          </HStack>
          <HStack style={styles.location}>
            <Text>From: </Text>
            <Text style={styles.boldText}>
              {truncateString(ride.pickup, 100)}
            </Text>
          </HStack>
          <HStack style={styles.location}>
            <Text>To: </Text>
            <Text style={styles.boldText}>
              {truncateString(ride.dropoff, 100)}
            </Text>
          </HStack>
          <HStack>
            <Text>Time: </Text>
            <Text style={styles.boldText}>{ride.booktime}</Text>
          </HStack>
          <HStack>
            <Text>Price: </Text>
            <Text style={styles.boldText}>{ride.price}đ </Text>
          </HStack>
          <HStack>
            <Text>Status: </Text>
            <Text
              style={{
                color:
                  ride.status === -1
                    ? 'red'
                    : ride.status === 0
                    ? 'dodgerblue'
                    : 'green',
              }}>
              {RideState[ride.status]}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Flex>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderBottomColorColor: theme.colors.gray[100],
    maxWidth: '100%',
  },
  image: {
    objectFit: 'contain',
  },
  location: {
    maxWidth: 280,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default RideItem;
