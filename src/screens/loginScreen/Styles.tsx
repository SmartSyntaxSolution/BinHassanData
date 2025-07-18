import { StyleSheet } from "react-native";
import { COLORS, hp } from "../../enums/StyleGuide";

export const styles = StyleSheet.create({
    safeAreaViewStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.light_blue
    },
    binHassanHeader: {
        color: COLORS.blue2,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: hp('10%')
    },
    whiteFieldArea: {
        width: '90%',
        height: hp('55%'),
        backgroundColor: COLORS.white,
        elevation: 8,
        borderRadius: 15,
        marginTop: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTextHeader: {
        fontSize: 15,
        color: COLORS.blue2,
        fontWeight: 'bold'
    },
    dataManagementText: {
        color: COLORS.blue2,
        fontSize: 20,
        marginTop: hp('8%')
    },
    forgotPassStyle: {
        alignSelf: 'flex-end',
        marginRight: '5%',
        marginTop: hp('1%')
    },

    scrollViewStyle: {
        width: '100%',
    },
    containerStyle: {
        paddingBottom: hp('25%'),
        alignItems: 'center'
    }
});
