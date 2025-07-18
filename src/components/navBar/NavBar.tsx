import { Image, ImageSourcePropType, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { IMAGES } from '../../assets/images'
import { COLORS, hp } from '../../enums/StyleGuide'

interface props {
    mainStyle?: ViewStyle,
    iconSource?: ImageSourcePropType,
    iconStyle?: ImageStyle,
    headerStyle?: TextStyle,
    header?: string,
    iconPress?: () => void
}

const NavBar = ({ mainStyle, iconSource, iconStyle, headerStyle, header, iconPress }: props) => {
    return (
        <View style={[styles.mainStyle, mainStyle]}>
            {
                iconSource && <TouchableOpacity onPress={iconPress} style={[styles.buttonStyle]}>
                    <Image source={iconSource} style={[styles.iconStyle, iconStyle]} />
                </TouchableOpacity>
            }

            <Text style={[styles.headerStyle, headerStyle]}>{header}</Text>
        </View>
    )
}

export default NavBar

const styles = StyleSheet.create({
    mainStyle: {
        width: '100%',
        height: hp('5%'),
        marginTop: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    buttonStyle: {
        position: 'absolute',
        left: 0
    },
    iconStyle: {
        height: 25,
        width: 25
    },
    headerStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.blue2
    }
})