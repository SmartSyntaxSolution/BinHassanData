import { StyleSheet } from "react-native";
import { COLORS } from "../../enums/StyleGuide";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.light_blue,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: COLORS.grey3,
        color: COLORS.black,
    },
    statusRow: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 8,
    },
    statusButton: {
        borderWidth: 1,
        borderColor: COLORS.blue2,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    statusActive: {
        backgroundColor: COLORS.blue2,
    },
    statusText: {
        color: COLORS.blue2,
        fontWeight: 'bold',
    },
    statusActiveText: {
        color: COLORS.white,
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: COLORS.blue2,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
});
