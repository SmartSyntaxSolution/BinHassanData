import { StyleSheet } from "react-native";
import { COLORS, FONT, hp } from "../../enums/StyleGuide";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.light_blue,
    },
    mainView: {
        width: '90%',
        alignItems: 'center',
    },
    looksLikeEmptyStyle: {
        color: COLORS.blue2,
        marginTop: hp('2%'),
        fontSize: 15,
    },
    emptyImageStyle: {
        marginTop: hp('10%'),
    },
    noRecordText: {
        fontFamily: FONT.bold, fontSize: 16
    }
});
