import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { ACTIVE_OPACITY, FONT } from '../../enums/StyleGuide';
import { IMAGES } from '../../assets/images';
import { AddButton, ModalFilter, NavBar, RecordsCard, SearchInput } from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SCREENS } from '../../enums';
import { exportAndArchiveRecords } from '../../helpers/Helpers';
import { useFirestoreCollection } from '../../hooks/UseFirestoreCollection';
import { styles } from './Styles';

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [records, setRecords] = useState<any[]>([]);
    const [filtered, setFiltered] = useState<any[]>([]);
    const { role }: any = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);

    useFirestoreCollection('Records', (docs: any[]) => {
        const fetchedRecords = docs.map(data => ({
            ...data,
            icon: data.deliveryStatus === 'Delivered'
                ? IMAGES.CHECK_MARK
                : IMAGES.PENDING,
        }));

        setRecords(fetchedRecords);
        setFiltered(fetchedRecords);
    });

    const applyFilter = (type: string) => {
        let updated = [...records];

        switch (type) {
            case 'Order Ascending':
                updated.sort((a, b) => a.orderNumber - b.orderNumber);
                break;

            case 'Order Descending':
                updated.sort((a, b) => b.orderNumber - a.orderNumber);
                break;

            case 'Delivered':
            case 'Pending':
                updated = records.filter(item => item.deliveryStatus === type);
                break;

            default:
                updated = [...records];
        }

        setFiltered(updated);
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <View style={styles.mainView}>
                {role === 'admin' ? (
                    <NavBar header="Admin Dashboard" />
                ) : (
                    <NavBar header="Manager Dashboard" />
                )}

                {records.length === 0 ? (
                    <>
                        <Image source={IMAGES.EMPTY} style={styles.emptyImageStyle} />
                        <Text style={styles.looksLikeEmptyStyle}>
                            “Looks empty here! Tap the + to add one.”
                        </Text>
                    </>
                ) : (
                    <>
                        <View style={styles.yourRecordsRow}>
                            <Text style={styles.yourRecordsText}>Your Records</Text>
                            <TouchableOpacity
                                activeOpacity={ACTIVE_OPACITY}
                                style={styles.filterButton}
                                onPress={() => setModalVisible(true)}
                            >
                                <Image source={IMAGES.FILTER} style={{ height: 12, width: 12 }} />
                                <Text style={styles.filterButtonText}>Filter</Text>
                            </TouchableOpacity>
                        </View>

                        <SearchInput data={records} filterKey="orderNumber" setFiltered={setFiltered} placeholder="Search by Order Number" />
                        {
                            filtered.length === 0 &&
                            <Text style={{ fontFamily: FONT.bold, fontSize: 16 }}>No Records Found</Text>
                        }

                        <FlatList
                            data={filtered}
                            keyExtractor={item => item.orderNumber.toString()}
                            renderItem={({ item }) => (
                                <RecordsCard
                                    item={item}
                                    setSelectedRecord={setSelectedRecord}
                                    //@ts-ignore
                                    onPress={() => navigation.navigate(SCREENS.DETAILS_SCREEN as never, {
                                        selectedRecord: item,
                                        role: role,
                                    })}
                                />
                            )}
                        />


                    </>
                )}
            </View>

            <AddButton source={IMAGES.BLUE_ADD_BUTTON} onPress={() => navigation.navigate(SCREENS.ADD_RECORD_SCREEN as never)} />
            {role === 'admin' && (
                <AddButton source={IMAGES.EXPORT_EXCEL} buttonStyle={{ bottom: 90, height: 50 }} onPress={() => exportAndArchiveRecords(records)} />
            )}

            <ModalFilter visible={modalVisible} setModalVisible={setModalVisible} applyFilter={applyFilter} />
        </SafeAreaView>
    );
};

export default HomeScreen;

