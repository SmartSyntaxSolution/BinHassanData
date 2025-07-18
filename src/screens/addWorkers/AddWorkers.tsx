import { Image, SafeAreaView, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { ACTIVE_OPACITY, hp } from '../../enums/StyleGuide';
import { AddButton, AddWorkersModal, KeyboardAware, NavBar } from '../../components';
import { IMAGES } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useFirestoreCollection, useFirestoreDelete } from '../../hooks/UseFirestoreCollection';
import { styles } from './Styles';

const AddWorkers = () => {
    const { confirmAndDelete } = useFirestoreDelete();

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [newWorkerName, setNewWorkerName] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [workers, setWorkers] = useState([]);
    const [categories, setCategories] = useState([]);

    useFirestoreCollection('Workers', setWorkers);
    useFirestoreCollection('Categories', setCategories);

    const handleAddWorker = async () => {
        if (!newWorkerName.trim()) return;

        await firestore().collection('Workers').add({
            name: newWorkerName.trim(),
        });

        setNewWorkerName('');
        setModalVisible(false);
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;

        await firestore().collection('Categories').add({
            name: newCategoryName.trim(),
        });

        setNewCategoryName('');
        setCategoryModalVisible(false);
    };

    const handleDeleteWorker = (id: string) => {
        confirmAndDelete({
            collectionName: 'Workers',
            docId: id,
            title: 'Delete Worker',
            message: 'Are you sure you want to delete this worker?',

        });
    };
    const handleDeleteCategory = (id: string) => {
        confirmAndDelete({
            collectionName: 'Categories',
            docId: id,
            title: 'Delete Shop',
            message: 'Are you sure you want to delete this shop?',
        });
    };


    const WorkerCard = ({ id, name }: { id: string; name: string }) => (
        <TouchableOpacity
            style={styles.workerCard}
            activeOpacity={ACTIVE_OPACITY}
            onPress={() => handleDeleteWorker(id)}
        >
            <Text style={styles.workerName}>{name}</Text>
        </TouchableOpacity>
    );

    const CategoryCard = ({ id, name }: { id: string; name: string }) => (
        <TouchableOpacity
            style={styles.workerCard}
            activeOpacity={ACTIVE_OPACITY}
            onPress={() => handleDeleteCategory(id)}
        >
            <Text style={styles.workerName}>{name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainView}>
                <NavBar
                    header="Add Workers & Categories"
                    iconSource={IMAGES.LEFT_ARROW}
                    iconPress={() => navigation.goBack()}
                />
                <KeyboardAware>
                    {/* Workers */}
                    <Text style={styles.sectionTitle}>Workers</Text>
                    {workers.length === 0 ? (
                        <>
                            <Image source={IMAGES.EMPTY} style={{ marginTop: hp('5%') }} />
                            <Text style={styles.noWorkersText}>
                                “No Workers added yet! Tap the + to add one.”
                            </Text>
                        </>
                    ) : (
                        <FlatList
                            data={workers}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <WorkerCard id={item.id} name={item.name} />
                            )}
                            scrollEnabled={false} // disable nested scroll
                            contentContainerStyle={{ paddingTop: 10 }}
                            style={{ width: '100%' }}
                        />
                    )}

                    {/* Categories */}
                    <Text style={styles.sectionTitle}>Shops</Text>
                    {categories.length === 0 ? (
                        <Text style={styles.noWorkersText}>
                            “No Shops added yet! Tap the Add Shops button.”
                        </Text>
                    ) : (
                        <FlatList
                            data={categories}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <CategoryCard id={item.id} name={item.name} />
                            )}
                            scrollEnabled={false}
                            contentContainerStyle={{ paddingTop: 10 }}
                            style={{ width: '100%' }}
                        />
                    )}
                </KeyboardAware>
            </View>

            <AddButton
                source={IMAGES.ADD_WORKER_BLUE}
                onPress={() => setModalVisible(true)}
                buttonStyle={{ bottom: hp('10%'), right: 5 }}
            />
            <AddButton
                source={IMAGES.BLUE_ADD_BUTTON}
                onPress={() => setCategoryModalVisible(true)}
                buttonStyle={{ bottom: hp('3%') }}
            />


            <AddWorkersModal
                label='Add Worker'
                placeHolder='Enter Worker Name'
                handleAddWorker={handleAddWorker}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                newWorkerName={newWorkerName}
                setNewWorkerName={setNewWorkerName}
            />

            <AddWorkersModal
                label='Add Shop'
                placeHolder='Enter Shop Name'
                handleAddWorker={handleAddCategory}
                modalVisible={categoryModalVisible}
                setModalVisible={setCategoryModalVisible}
                newWorkerName={newCategoryName}
                setNewWorkerName={setNewCategoryName}
            />
        </SafeAreaView>
    );
};

export default AddWorkers;

