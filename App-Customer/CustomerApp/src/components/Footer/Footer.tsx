import React from 'react'
import { Text, Box, HStack,  Pressable } from 'native-base';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import myTheme from './../../configs/Theme';
import { RootStackParamList } from '../../routers/navigationParams';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type FooterProps = {

}

const Footer: React.FC<FooterProps> = () => {
	const [selected, setSelected] = React.useState(0);
	const navigation =	useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
	const menu: (keyof RootStackParamList)[] = ["Home", "Ride", "Welcome", "Find"];
  
	const handlePress = (index: number, item: keyof RootStackParamList) => (event: GestureResponderEvent) => {
	  setSelected(index);
	  navigation.navigate(item); // Navigate to the selected screen
	};
  
	return (
	  <Box position={"fixed"} bottom={0}>
		<HStack>
		  {menu.map((item, index) => (
			<Pressable style={styles.button} onPress={handlePress(index, item)} key={index}>
			  <Text style={{ ...styles.textBtn, opacity: selected === index ? 1 : 0.6 }}>
				{item}
			  </Text>
			</Pressable>
		  ))}
		</HStack>
	  </Box>
	);
  };
  

const styles = StyleSheet.create({
	button: {
		flex: 1,
		backgroundColor: myTheme.colors.primary[900],
		borderColor:  myTheme.colors.gray[200],
		borderLeftWidth: 0.5,
		borderRightWidth: 0.5,
		justifyContent: "center",
		alignItems: "center",
		height: 52,
		borderRadius:12,
	},
	textBtn: {
		fontWeight: "bold",
		color:"white",
	}

})

export default Footer