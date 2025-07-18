import { StyleSheet } from "react-native";
import { COLORS, hp } from "../../enums/StyleGuide";

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
    noWorkersText: {
        color: COLORS.blue2,
        marginTop: hp('2%'),
        fontSize: 15,
        textAlign: 'center'
    },
    workerCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        width: '100%'
    },
    workerName: {
        fontSize: 18,
        color: COLORS.blue2,
    },
    sectionTitle: {
        marginTop: hp('3%'),
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
        alignSelf: 'flex-start',
    },
});
