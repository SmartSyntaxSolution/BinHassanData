import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { ACTIVE_OPACITY, COLORS, hp } from '../../enums/StyleGuide'

interface props {
    buttonStyle?: ViewStyle,
    buttonNameStyle?: TextStyle,
    buttonName: React.ReactNode;
    onPress?: () => void
}

const CustomButton = ({ buttonStyle, buttonNameStyle, buttonName, onPress }: props) => {
    return (
        <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={onPress} style={[styles.mainStyle, buttonStyle]}>
            <Text style={[styles.buttonLabelStyle, buttonNameStyle]}>{buttonName}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    mainStyle: {
        width: '95%',
        height: hp('7%'),
        borderRadius: 40,
        backgroundColor: COLORS.blue2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('5%')
    },
    buttonLabelStyle: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold'
    }
})