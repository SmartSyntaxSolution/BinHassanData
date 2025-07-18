import { Dimensions, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export { hp, wp };

export const ACTIVE_OPACITY = 0.75;
export const WIDTH = Dimensions.get('window').width
export const HEIGHT = Dimensions.get('window').height


export const COLORS = {
    lightgrey: '#ececec',
    white: '#FFFFFF',
    black: '#000000',
    background: '#000000',
    black_90: 'rgba(0,0,0,0.9)',
    modalBackground: 'rgba(0, 0, 0, 0.5)',
    lightBlack: 'rgba(13, 13, 13, 1)',
    lightGradient: '#D8F2FF',
    darkGradient: '#A6E7FF',
    buttonColor: '#007AFF',
    textColor: '#040C22',
    purple: 'rgba(81, 78, 183, 1)',
    primary: '#2F78BE',
    light_blue: '#EBF2F9',
    secondary: '#45B7E5',
    grey: '#D9D9D9',
    darkGrey: '#646464',
    lightGrey1: '#A5A6A7',
    red: '#E12222',
    darkRed: '#FF0000',
    mainColor: '#496CF1',
    lightPink: 'rgb(243, 113, 206)',
    pink: 'rgb(255, 0, 183)',
    lightWhite2: 'rgba(255, 255, 255, 1)',
    lightWhite3: 'rgba(255, 255, 255, 0.5)',
    lightGrey2: 'rgba(100, 100, 100, 1)',
    orange: "rgba(255, 204, 77, 1)",
    lightGrey3: "rgba(217, 217, 217, 1)",
    transparent: 'transparent',
    blue2: "rgba(47, 120, 190, 1)",
    faceBook: "#3b5998",
    lightPurple: 'rgb(144, 139, 234)',
    brown: "#A52A2A",
    green: "#008000",
    grey2: "rgba(194, 194, 194,1)",
    grey3: "rgba(149, 149, 149,1)",
    BLACKK: "#0D0D0D",
    grey4: "rgb(27, 27, 27,1)",
    grey5: "#222222",
    eobiColor: '#ff9616',
    lightGrey: 'lightGrey',
    unSelectedCategoryColor: '#E5EBFF'
}

export const FONT = {
    bold: 'Poppins-Bold',
    regular: 'Poppins-Regular',
    extraBold: 'Poppins-ExtraBold',
    semiBold: 'Poppins-SemiBold',
    medium: 'Poppins-Medium',
}


export const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    gradientStyle: {
        ...StyleSheet.absoluteFillObject,
    },
})