import React, { useState, useEffect } from 'react';
import { Badge, Heading, Image, VStack, theme, Text, Button, HStack } from 'native-base';
import { StyleSheet } from 'react-native';
import { Icons, Images } from './../../configs/images';
import myTheme from './../../configs/Theme';
import Divider from '../Divider';
import { useDispatch } from 'react-redux';
import { UserInformation } from '../../appData/user/User';
import { CarFactory } from '../../designPattern/Factories/CarFactory';

interface DriverProps {
	data: UserInformation
}

const DriverProfile: React.FC<DriverProps> = ({ data }) => {
	
	const [isFree, setIsFree] = useState(data.free)
	const dispatch = useDispatch()
	const driverCar= CarFactory.getInstance().factoryMethod(data)
	
	return (
		<>
			<VStack width={"100%"} alignItems={"center"} space={3}>
				<VStack>
					<Image style={styles.imgProfile} source={Images.profile} alt='avt' />
					<Badge backgroundColor={isFree ? "teal.500" : "gray.400"} rounded="full" width={6} height={6} mt={-6} mr={1} zIndex={1} variant="solid" alignSelf="flex-end" />
				</VStack>
				<Heading style={styles.name}> {data.name}</Heading>

				<HStack style={styles.border} alignItems={"center"}>
					<HStack space={2}>
						<Text fontWeight={600} fontSize={20}>
							Phone:
						</Text>
						<Text fontSize={20}>
							{data.tel}
						</Text>
					</HStack>
					<Button colorScheme={"success"} style={styles.button}>
						<Image source={Icons.CallIcon} alt='callIcon' />
					</Button>
				</HStack>
				<HStack style={styles.border} alignItems={"center"}>
					<HStack space={2}>
						<Text fontWeight={600} fontSize={20}>
							CMND:
						</Text>
						<Text fontSize={20}>
							{data.cmnd}
						</Text>
					</HStack>
				</HStack>

				<VStack alignItems={"center"} space={2}>
					<Image style={styles.image} source={driverCar.data.image} alt='car_type' />
					<Text fontSize={24} fontWeight={600} color={"secondary.600"}>{driverCar.data.brandname} - {driverCar.data.vehicletype}</Text>
					<Divider width={"75%"} />
					<Text fontSize={20} color={"gray.700"}>{driverCar.data.vehicleid}</Text>
				</VStack>
			</VStack>
		</>

	);
}





const styles = StyleSheet.create({
	imgProfile: {
		borderRadius: 100,
		borderColor: myTheme.colors.primary[700],
		borderWidth: 2,
		objectFit: "cover",
		width: 100,
		height: 100,
	},
	name: {
		textAlign: "center",
		color: myTheme.colors.text[800],
		fontSize: 28,
	},
	border: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: myTheme.colors.gray[200],
		padding: 8,
		width: 300,
		justifyContent: "space-between"
	}
	,
	button: {
		width: 50,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},
	image: {
		objectFit: "contain",
		width: 269,
		height: 120,
	}

})
export default DriverProfile;
