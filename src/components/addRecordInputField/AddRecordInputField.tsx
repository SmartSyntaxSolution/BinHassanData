import { StyleSheet, Text, TextInput, TextStyle } from 'react-native'
import React from 'react'
import { COLORS, hp } from '../../enums/StyleGuide'

interface props {
    label?: string,
    placeHolder?: string,
    value?: string,
    onChangeText?: (text: string) => void;
    labelStyle?: TextStyle,
    editable?: boolean
}

const AddRecordInputField = ({ label, placeHolder, value, onChangeText, labelStyle, editable }: props) => {
    return (
        <>
            <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
            <TextInput
                style={styles.textInputStyle}
                value={value}
                placeholder={placeHolder}
                placeholderTextColor={"black"}
                onChangeText={onChangeText}
                editable={editable}
            />
        </>
    )
}

export default AddRecordInputField

const styles = StyleSheet.create({
    labelStyle: {
        alignSelf: 'flex-start',
        marginTop: hp('2%'),
        fontSize: 16,
        color:"gray",
        fontWeight: '600',
    },
    textInputStyle: {
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: COLORS.white,
        width: '100%',
        color:"black",
        marginTop: hp('1%'),
        fontSize: 16,
    },
})