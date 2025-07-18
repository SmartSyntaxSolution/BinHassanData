import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomButton from '../customButton'
import { ACTIVE_OPACITY, COLORS } from '../../enums/StyleGuide'

interface props {
    forgotModalVisible: boolean;
    setForgotModalVisible: (visible: boolean) => void;
    forgotEmail: string;
    setForgotEmail: (email: string) => void;
    onPress: () => void;
}

const ForgotPasswordModal = ({ forgotModalVisible, setForgotModalVisible, forgotEmail, setForgotEmail, onPress }: props) => {
    return (
        <Modal
            visible={forgotModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setForgotModalVisible(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Reset Password</Text>
                    <TextInput
                        placeholder="Enter your email"
                        value={forgotEmail}
                        onChangeText={setForgotEmail}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <CustomButton buttonName="Send Reset Link" onPress={onPress} />
                    <TouchableOpacity
                        activeOpacity={ACTIVE_OPACITY}
                        style={{ marginTop: 15 }}
                        onPress={() => setForgotModalVisible(false)}
                    >
                        <Text style={{ color: COLORS.blue2 }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ForgotPasswordModal

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
        width: '85%',
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: COLORS.blue2
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.grey3,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
})