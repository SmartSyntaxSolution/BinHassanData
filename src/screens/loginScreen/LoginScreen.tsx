import { ActivityIndicator, Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ACTIVE_OPACITY, COLORS } from '../../enums/StyleGuide';
import { CustomButton, ForgotPasswordModal, InputField, KeyboardAware } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { TAB } from '../../enums';
import { styles } from './Styles';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);
    const [forgotModalVisible, setForgotModalVisible] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter credentials!');
            return;
        }
        try {
            setLoader(true);
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            const doc = await firestore().collection('users').doc(user.email).get();

            if (!doc.exists) {
                console.log('No role found!');
                setLoader(false);
                return;
            }

            const { role } = doc.data();
            setLoader(false);
            //@ts-ignore
            navigation.reset({ index: 0, routes: [{ name: TAB.BOTTOM_TAB, params: { role } }] })

        } catch (error) {
            console.error('Login failed:', error);
            setLoader(false);
            Alert.alert('Login Failed', error.message);
        }
    };

    const handleForgotPassword = async () => {
        if (!forgotEmail) {
            Alert.alert('Error', 'Please enter your email.');
            return;
        }
        try {
            await auth().sendPasswordResetEmail(forgotEmail);
            Alert.alert('Success', 'Password reset email sent!');
            setForgotModalVisible(false);
            setForgotEmail('');
        } catch (error) {
            console.error('Reset failed:', error);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <KeyboardAware>
                <Text style={styles.binHassanHeader}>Bin Hassan Data</Text>
                <View style={styles.whiteFieldArea}>
                    <Text style={styles.loginTextHeader}>Login to your account</Text>
                    <InputField value={email} onChangeText={setEmail} label='Email' placeHolder='Enter your email' />
                    <InputField value={password} onChangeText={setPassword} label='Password' placeHolder='Enter your password' />
                    <TouchableOpacity
                        activeOpacity={ACTIVE_OPACITY}
                        style={styles.forgotPassStyle}
                        onPress={() => setForgotModalVisible(true)}
                    >
                        <Text>Forgot Password?</Text>
                    </TouchableOpacity>
                    <CustomButton
                        buttonName={loader ? <ActivityIndicator color={COLORS.white} size={'small'} /> : 'Login'}
                        onPress={handleLogin}
                    />
                </View>
                <Text style={styles.dataManagementText}>Data Management App</Text>
            </KeyboardAware>
            <ForgotPasswordModal forgotEmail={forgotEmail} forgotModalVisible={forgotModalVisible} onPress={handleForgotPassword} setForgotEmail={setForgotEmail} setForgotModalVisible={setForgotModalVisible} />
        </SafeAreaView>
    );
};

export default LoginScreen;

