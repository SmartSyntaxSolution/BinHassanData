import React, { ReactNode } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { hp } from '../../enums/StyleGuide';

interface KeyboardAwareProps {
    children: ReactNode;
}

const KeyboardAware = ({ children }: KeyboardAwareProps) => {
    return (
        <KeyboardAwareScrollView
            style={styles.scrollViewStyle}
            contentContainerStyle={styles.containerStyle}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            extraScrollHeight={Platform.OS === 'ios' ? 40 : 80}
            extraHeight={Platform.OS === 'ios' ? 100 : 150}
        >
            {children}
        </KeyboardAwareScrollView>
    );
};

export default KeyboardAware;

const styles = StyleSheet.create({
    scrollViewStyle: {
        width: '100%',
    },
    containerStyle: {
        paddingBottom: hp('25%'),
        alignItems: 'center',
    },
});
