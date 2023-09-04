import React, { useState, useEffect } from 'react';
import { Badge, Heading, Image, VStack, theme, Text, Button, HStack } from 'native-base';
import { StyleSheet } from 'react-native';
import { Icons, Images } from './../../configs/images';
import myTheme from './../../configs/Theme';
import Divider from '../Divider';
import { useDispatch } from 'react-redux';
import { showMessage } from './../../redux/reducers';
import { StatusColor } from '../Overlay/SlideMessage';
import { DriverModels } from './../../models/Driver/index';

interface DriverProps {
	data: DriverModels
}

const DriverProfile: React.FC<DriverProps> = ({ data }) => {
	const { phone, cccd, name, image, vehicleImage,
		vehicleName,
		vehicleType,
		vehicleNumber } = data
	const [isFree, setIsFree] = useState(true)
	const dispatch = useDispatch()



	return (
		<>
			<VStack width={"100%"} alignItems={"center"} space={3}>
				<VStack>
					<Image style={styles.imgProfile} source={image} alt='avt' />
					<Badge backgroundColor={isFree ? "teal.500" : "gray.400"} rounded="full" width={6} height={6} mt={-6} mr={1} zIndex={1} variant="solid" alignSelf="flex-end" />
				</VStack>
				<Heading style={styles.name}> {name}</Heading>

				<HStack style={styles.border} alignItems={"center"}>
					<HStack space={2}>
						<Text fontWeight={600} fontSize={20}>
							Phone:
						</Text>
						<Text fontSize={20}>
							{phone}
						</Text>
					</HStack>
					<Button colorScheme={"success"} style={styles.button}>
						<Image source={Icons.CallIcon} alt='callIcon' />
					</Button>
				</HStack>
				<HStack style={styles.border} alignItems={"center"}>
					<HStack space={2}>
						<Text fontWeight={600} fontSize={20}>
							CCCD:
						</Text>
						<Text fontSize={20}>
							{cccd}
						</Text>
					</HStack>
				</HStack>

				<VStack alignItems={"center"} space={2}>
					<Image style={styles.image} source={vehicleImage} alt='car_type' />
					<Text fontSize={24} fontWeight={600} color={"secondary.600"}>{vehicleName} - {vehicleType}</Text>
					<Divider width={"75%"} />
					<Text fontSize={20} color={"gray.700"}>{vehicleNumber}</Text>
				</VStack>
			</VStack>

			<Button onPress={() => dispatch(showMessage(StatusColor.info, "The Driver is not here!"))}>
				Click
			</Button>
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
