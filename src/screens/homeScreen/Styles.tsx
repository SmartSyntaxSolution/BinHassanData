import { StyleSheet } from "react-native";
import { COLORS, hp } from "../../enums/StyleGuide";

export const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.light_blue,
    },
    mainView: {
        width: '90%',
        alignItems: 'center',
    },
    yourRecordsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: hp('2%'),
    },
    yourRecordsText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    filterButton: {
        backgroundColor: COLORS.blue2,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    filterButtonText: {
        color: COLORS.white,
        fontWeight: '600',
    },
    looksLikeEmptyStyle: {
        color: COLORS.blue2,
        marginTop: hp('2%'),
        fontSize: 15,
    },
    emptyImageStyle: {
        marginTop: hp('10%'),
    },

});
