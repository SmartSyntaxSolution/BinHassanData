import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { ACTIVE_OPACITY } from '../../enums/StyleGuide'

interface props {
    onPress?: () => void,
    buttonStyle?: ViewStyle,
    source?: ImageSourcePropType
}

const AddButton = ({ onPress, buttonStyle, source }: props) => {
    return (
        <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={onPress}
            style={[styles.addButtonStyle, buttonStyle]}
        >
            <Image
                source={source}
                style={styles.addButtonImageStyle}
            />
        </TouchableOpacity>
    )
}

export default AddButton

const styles = StyleSheet.create({
    addButtonStyle: {
        position: 'absolute',
        right: 10,
        bottom: 20,
    },
    addButtonImageStyle: {
        height: 60,
        width: 60,
    },
})