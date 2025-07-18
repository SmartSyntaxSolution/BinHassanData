import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, hp } from '../../enums/StyleGuide';
import { Dropdown } from 'react-native-element-dropdown';

interface props {
    label?: string;
    data: { label: string; value: any }[];
    value: any;
    onChange: (value: any) => void;
    placeHolder?: string
}

const DropDownComponent = ({ label, data, value, onChange, placeHolder }: props) => {
    return (
        <>
            <Text style={styles.labelStyle}>{label}</Text>
            <Dropdown
                style={styles.dropdownStyle}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={placeHolder}
                value={value}
                onChange={item => {
                    onChange(item.value);
                }}
            />
        </>
    )
}

export default DropDownComponent

const styles = StyleSheet.create({
    labelStyle: {
        alignSelf: 'flex-start',
        marginTop: hp('2%'),
        fontSize: 16,
        fontWeight: '600',
    },
    dropdownStyle: {
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: COLORS.white,
        width: '100%',
        marginTop: hp('1%'),
    },
    placeholderStyle: {
        color: COLORS.grey3,
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: COLORS.black,
    },
})