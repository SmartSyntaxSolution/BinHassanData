import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../enums/StyleGuide'

interface props {
    visible: boolean;
    setModalVisible: (visible: boolean) => void;
    applyFilter: (filterType: string) => void;
}


const ModalFilter = ({ visible, setModalVisible, applyFilter }: props) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Filter By</Text>

                    <TouchableOpacity
                        style={styles.modalOption}
                        onPress={() => applyFilter('Delivery Date')}
                    >
                        <Text style={styles.modalOptionText}>Delivery Date</Text>
                    </TouchableOpacity>

                    <Text style={[styles.modalTitle, { alignSelf: 'flex-start', marginTop: 10 }]}>
                        Delivery Status
                    </Text>

                    <TouchableOpacity
                        style={styles.modalOption}
                        onPress={() => applyFilter('Pending')}
                    >
                        <Text style={styles.modalOptionText}>Pending</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.modalOption}
                        onPress={() => applyFilter('Delivered')}
                    >
                        <Text style={styles.modalOptionText}>Delivered</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.modalClose}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.modalCloseText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalFilter

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalOption: {
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: COLORS.grey3,
    },
    modalOptionText: {
        fontSize: 16,
    },
    modalClose: {
        marginTop: 15,
    },
    modalCloseText: {
        color: COLORS.blue2,
        fontWeight: 'bold',
    },
})