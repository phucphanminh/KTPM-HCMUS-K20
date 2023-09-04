import React from 'react'
import { Text, Box, HStack, Pressable, Divider, VStack } from 'native-base';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import myTheme from './../../configs/Theme';
import { RootStackParamList } from '../../routers/navigationParams';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { withTheme } from '@rneui/themed';
import { IconExample, Icons } from '../../configs/images';

type FooterProps = {

}

const Footer: React.FC<FooterProps> = () => {
	const [selected, setSelected] = React.useState(0);
	const navigation =	useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
	const menu: (keyof RootStackParamList)[] = ["Home", "Ride", "Welcome"];
  
	const handlePress = (index: number, item: keyof RootStackParamList) => (event: GestureResponderEvent) => {
	  setSelected(index);
	  navigation.navigate(item); // Navigate to the selected screen
	};
  
	return (
	  <Box position={"fixed"} bottom={0}>
		<HStack>
		  {menu.map((item, index) => (
			<Pressable style={styles.button} onPress={handlePress(index, item)} key={index}>
				<VStack space={1} alignItems={"center"}>
					<IconExample/>
					<Text style={{ ...styles.textBtn, color: selected === index ? myTheme.colors.secondary[600] : myTheme.colors.gray[400] }}>
						{item}
					</Text>
				</VStack>
			</Pressable>
		  ))}
		  
		</HStack>
	  </Box>
	);
  };
  

const styles = StyleSheet.create({
	button: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		height: 60,
	},
	textBtn: {
		color:myTheme.colors.gray[400],
	}

})

export default Footer