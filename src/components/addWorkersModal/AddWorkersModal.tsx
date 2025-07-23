import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../enums/StyleGuide'

interface props {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    newWorkerName: string;
    setNewWorkerName: (name: string) => void;
    handleAddWorker: () => void;
    label?: string,
    placeHolder?: string
}

const AddWorkersModal = ({ modalVisible, setModalVisible, newWorkerName, setNewWorkerName, handleAddWorker, label, placeHolder }: props) => {
    return (
        <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{label}</Text>
                    <TextInput
                        placeholderTextColor={"black"}
                        value={newWorkerName}
                        onChangeText={setNewWorkerName}
                        placeholder={placeHolder}
                        style={styles.input}
                    />
                    <TouchableOpacity
                        onPress={handleAddWorker}
                        style={styles.addWorkerButton}
                    >
                        <Text style={{ color: '#fff' }}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={styles.cancelButton}
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default AddWorkersModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000088',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color:"black",
        padding: 12,
        marginBottom: 12,
    },
    addWorkerButton: {
        backgroundColor: COLORS.blue2,
        padding: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    cancelButton: {
        marginTop: 10,
        alignItems: 'center',
    },
})