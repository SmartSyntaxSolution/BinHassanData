import { SafeAreaView, Text, View, TouchableOpacity, Alert, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { NavBar, DropDownComponent } from '../../components';
import { COLORS } from '../../enums/StyleGuide';
import { useFirestoreCollection, useFirestoreDelete } from '../../hooks/UseFirestoreCollection';
import { DeliveryStatusData } from '../../dummy/Dummies';
import { styles } from './Styles';

const DetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { confirmAndDelete } = useFirestoreDelete();
    const { selectedRecord, role } = route.params as any;

    const [deliveryDate, setDeliveryDate] = useState(selectedRecord.deliveryDate || '');
    const [deliveryStatus, setDeliveryStatus] = useState(selectedRecord.deliveryStatus || '');
    const [cutBy, setCutBy] = useState(selectedRecord.cutBy || '');
    const [coat, setCoat] = useState(selectedRecord.coat || '');
    const [pant, setPant] = useState(selectedRecord.pant || '');
    const [waistcoat, setWaistcoat] = useState(selectedRecord.waistcoat || '');
    const [loader, setLoader] = useState(false)

    const [workers, setWorkers] = useState<{ label: string; value: string }[]>([]);

    // useFirestoreCollection('Workers', (docs: any[]) => {
    //     const workerList = docs.map(doc => ({
    //         label: doc.name,
    //         value: doc.name,
    //     }));
    //     setWorkers(workerList);
    // });

    useFirestoreCollection('Workers', (docs: any[]) => {
  const workerList = [
    { label: 'None', value: null }, // 👈 Default option
    ...docs.map(doc => ({
      label: doc.name,
      value: doc.name,
    })),
  ];
  setWorkers(workerList);
});


    const handleSave = async () => {
        try {
            setLoader(true)
            await firestore().collection('Records').doc(selectedRecord.id).update({
                deliveryDate,
                deliveryStatus,
                cutBy,
                coat,
                pant,
                waistcoat,
            });
            setLoader(false)
            Alert.alert('Success', 'Record updated!');
            navigation.goBack();
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Could not update record.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <NavBar header="Record Details" />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.label}>Shop: {selectedRecord.category}</Text>
                    <Text style={styles.label}>Order #: {selectedRecord.orderNumber}</Text>
                    <Text style={styles.label}>Description: {selectedRecord.description}</Text>
                    <Text style={styles.label}>Delivery Date</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Delivery Date"
                        value={deliveryDate}
                        onChangeText={setDeliveryDate}
                        placeholderTextColor={COLORS.grey2}
                    />

                    <DropDownComponent
                        data={DeliveryStatusData}
                        onChange={setDeliveryStatus}
                        label="Delivery Status"
                        placeHolder="Select Delivery Status"
                        value={deliveryStatus}
                    />

                    <DropDownComponent label="Cut By" data={workers} value={cutBy} onChange={setCutBy} placeHolder="Select Cut By" />
                    <DropDownComponent label="Coat" data={workers} value={coat} onChange={setCoat} placeHolder="Select Coat" />
                    <DropDownComponent label="Pant" data={workers} value={pant} onChange={setPant} placeHolder="Select Pant" />
                    <DropDownComponent label="Waistcoat" data={workers} value={waistcoat} onChange={setWaistcoat} placeHolder="Select Waistcoat" />

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>{loader ? <ActivityIndicator size={'small'} color={COLORS.white} /> : 'Save Changes'}</Text>
                    </TouchableOpacity>

                    {role === 'admin' && (
                        <TouchableOpacity style={styles.deleteButton} onPress={() => confirmAndDelete({
                            collectionName: 'Records',
                            docId: selectedRecord.id,
                            onSuccess: () => navigation.goBack(),
                        })}>
                            <Text style={styles.saveButtonText}>Delete Record</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetailsScreen;

