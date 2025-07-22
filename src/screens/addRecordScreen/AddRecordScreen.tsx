import { SafeAreaView, View, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, hp } from '../../enums/StyleGuide';
import { AddRecordInputField, CustomButton, DatePickerField, DropDownComponent, KeyboardAware, NavBar } from '../../components';
import { IMAGES } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { DeliveryStatusData } from '../../dummy/Dummies';
import { useFirestoreCollection } from '../../hooks/UseFirestoreCollection';
import { styles } from './Styles';

const AddRecordScreen = () => {
    const navigation = useNavigation();
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [date, setDate] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [description, setDescription] = useState('');
    const [workers, setWorkers] = useState([]);
    const [deliveryStatus, setDeliveryStatus] = useState('Pending');
    const [cutBy, setCutBy] = useState(null);
    const [coat, setCoat] = useState(null);
    const [pant, setPant] = useState(null);
    const [waistcoat, setWaistcoat] = useState(null);
    const [deliveryDate, setDeliveryDate] = useState(new Date());
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        const today = new Date();
        setDate(today.toLocaleDateString());

    }, []);

    useFirestoreCollection('Workers', setWorkers);
    useFirestoreCollection('Categories', setCategories);

    // const workerOptions = workers.map(worker => ({
    //     label: worker.name,
    //     value: worker.name,
    // }));

    const workerOptions = [
  { label: 'None', value: null }, // 👈 This adds the 'unselect' option
  ...workers.map(worker => ({
    label: worker.name,
    value: worker.name,
  })),
];


    const categoryOptions = categories.map(category => ({
        label: category.name,
        value: category.name,
    }));



    const handleAddRecord = async () => {
        if (!category) {
            Alert.alert('Error', 'Please select a category');
            return;
        }
        if (!deliveryDate) {
            Alert.alert('Error', 'Please enter a delivery date');
            return;
        }
        if (!deliveryStatus) {
            Alert.alert('Error', 'Please select delivery status');
            return;
        }
        if (!orderNumber) {
            Alert.alert('Error', 'Order number is required');
            return;
        }
        if (!description.trim()) {
            Alert.alert('Error', 'Please enter a description');
            return;
        }

        try {
            setLoader(true);

            const querySnapshot = await firestore()
                .collection('Records')
                .where('orderNumber', '==', orderNumber)
                .get();

            if (!querySnapshot.empty) {
                setLoader(false);
                Alert.alert('Duplicate', 'A record with the same order number already exists.');
                return;
            }

            await firestore().collection('Records').add({
                category,
                orderNumber,
                date,
                deliveryDate: deliveryDate.toLocaleDateString(),
                deliveryStatus,
                description,
                cutBy,
                coat,
                pant,
                waistcoat,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });

            setLoader(false);
            Alert.alert('Success', 'Record added successfully!');
            setCategory(null);
            setDeliveryDate(new Date());
            setDeliveryStatus(null);
            setOrderNumber('');
            setDescription('');
            setCutBy(null);
            setCoat(null);
            setPant(null);
            setWaistcoat(null);
            navigation.goBack();
        } catch (error) {
            console.error('Error adding record:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
            setLoader(false);
        }
    };


    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.mainView}>
                <NavBar
                    iconSource={IMAGES.LEFT_ARROW}
                    header="Add Record"
                    iconPress={() => navigation.goBack()}
                />

                <KeyboardAware>
                    <DropDownComponent
                        data={categoryOptions}
                        value={category}
                        onChange={setCategory}
                        label="Select Shop"
                        placeHolder="Select shop"
                    />
                    <DatePickerField
                        label="Delivery Date"
                        date={deliveryDate}
                        setDate={setDeliveryDate}
                        placeholder="Select Delivery Date"
                    />

                    <AddRecordInputField
                        value={orderNumber}
                        label="Order Number"
                        placeHolder="Enter Order Number"
                        onChangeText={setOrderNumber}
                        labelStyle={{ marginTop: 0 }}

                    />

                    <AddRecordInputField
                        value={description}
                        label="Description"
                        placeHolder="Enter description"
                        onChangeText={setDescription}
                    />
                    <DropDownComponent
                        data={DeliveryStatusData}
                        onChange={setDeliveryStatus}
                        label="Delivery Status"
                        placeHolder="Select Delivery Status"
                        value={deliveryStatus}
                    />

                    <AddRecordInputField
                        placeHolder="Add Date"
                        label="Date"
                        value={date}
                        onChangeText={setDate}
                        editable={false}
                    />

                    <DropDownComponent data={workerOptions} value={cutBy} onChange={setCutBy} label="Cut by" placeHolder="Select Cut by" />
                    <DropDownComponent data={workerOptions} value={coat} onChange={setCoat} label="Coat" placeHolder="Select coat" />
                    <DropDownComponent data={workerOptions} value={pant} onChange={setPant} label="Pant" placeHolder="Select pant" />
                    <DropDownComponent data={workerOptions} value={waistcoat} onChange={setWaistcoat} label="Waistcoat" placeHolder="Select waistcoat" />

                    <CustomButton
                        buttonName={loader ? <ActivityIndicator size={'small'} color={COLORS.white} /> : 'Add Record'}
                        buttonStyle={{ height: hp('5.5%') }}
                        onPress={handleAddRecord}
                    />
                </KeyboardAware>
            </View>
        </SafeAreaView>
    );
};

export default AddRecordScreen;

