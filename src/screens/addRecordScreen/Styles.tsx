import { StyleSheet } from "react-native";
import { COLORS, hp } from "../../enums/StyleGuide";

export const styles = StyleSheet.create({
    safeAreaViewStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.light_blue,
    },
    scrollViewStyle: {
        width: '100%',
    },
    mainView: {
        width: '90%',
        alignItems: 'center',
    },
    containerStyle: {
        paddingBottom: hp('25%'),
        alignItems: 'center',
    },
});
