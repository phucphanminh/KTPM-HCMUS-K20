import  { ReactNode } from 'react';
import {  extendTheme } from 'native-base';

const myTheme = extendTheme({
    colors: {
        primary: {
         100:"#FFF9C4",
         200:"#FFF59D",
         300:"#FEF075",
         400:"#FCEB55",
         500:"#FAE635",
         600:"#FDD835",
         700:"#FBC02D",
         800:"#F9A825",
         900:"#F57F17",
        },
        secondary: {
         100:"#005932",
         200:"#F2899B",
         300:"#F2899B",
         400:"#F2899B",
         500:"#DB1740",
         600:"#CB103F",
         700:"#B7083C",
         800:"#A4003B",
         900:"#820036",
        },
        text: {
            300:"#B8B8B8",
            600:"#717171",
            700:"#5A5A5A",
            800:"#414141",
            900:"#414141",
        },  
        black: "121212",
        white: "#fff",


    },
    config: {
        // Changing initialColorMode to 'light'
        initialColorMode: 'light',
      },
});

export default myTheme
