import { Button as CButton } from "native-base";
import { StyleSheet } from 'react-native';
import React, { ReactNode } from 'react'


type ButtonProps = {
	children: ReactNode,
	type?: string,
	onPress?:any
}


const styles = StyleSheet.create(
	{
		normalButton: {
			borderRadius:4,
		}
	}
)


const Button = ({ children, type, ...others }: ButtonProps) => {
	return (
		<CButton style={styles.normalButton} {...others} _text={{
			fontSize: 14
		}}>{children}</CButton>
	)
}



export default Button