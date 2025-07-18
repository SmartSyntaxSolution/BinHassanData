import { StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import { ACTIVE_OPACITY, COLORS, hp } from '../../enums/StyleGuide';

interface Props {
    mainView?: ViewStyle;
    labelStyle?: TextStyle;
    label?: string;
    placeHolder?: string;
    iconPress?: () => void;
    icon?: React.ReactNode;
    value?: string;
    onChangeText?: (text: string) => void;
    textInputStyle?: TextStyle
}

const InputField = ({
    mainView,
    labelStyle,
    label,
    placeHolder,
    iconPress,
    icon,
    onChangeText,
    value,
    textInputStyle
}: Props) => {
    const hasIcon = !!icon;

    return (
        <View style={[styles.mainView, mainView]}>
            <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
            <View style={styles.inputFieldMainView}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeHolder}
                    style={[
                        styles.inputFieldStyle,
                        { width: hasIcon ? '85%' : '100%' },
                        textInputStyle,
                    ]}
                />

                {hasIcon && (
                    <TouchableOpacity
                        activeOpacity={ACTIVE_OPACITY}
                        onPress={iconPress}
                        style={styles.iconBox}>
                        {icon}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    mainView: {
        alignItems: 'center',
        width: '92%',
        marginTop: hp('3%'),
    },
    labelStyle: {
        alignSelf: 'flex-start',
        fontSize: 18,
    },
    inputFieldMainView: {
        width: '100%',
        backgroundColor: COLORS.light_blue,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: hp('1%'),
    },
    inputFieldStyle: {
        height: hp('6%'),
        borderRadius: 10,
        paddingLeft: '5%',
    },
    iconBox: {
        width: '15%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('6%'),
    },
});
