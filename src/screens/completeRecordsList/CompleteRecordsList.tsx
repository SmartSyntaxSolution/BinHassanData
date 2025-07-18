import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONT, hp } from '../../enums/StyleGuide'
import { ListRecordModal, NavBar, RecordsCard, SearchInput } from '../../components'
import { IMAGES } from '../../assets/images'
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';

const CompleteRecordsList = () => {
    const navigation = useNavigation();
    const route = useRoute()
    const [records, setRecords] = useState<any[]>([]);
    const { role }: any = route.params
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const [filtered, setFiltered] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('CompleteRecordList')
            .onSnapshot(snapshot => {
                const fetchedRecords = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        ...data,
                        id: doc.id,
                        icon: data.deliveryStatus === 'Delivered' ? IMAGES.CHECK_MARK : IMAGES.PENDING,
                    };
                });

                setRecords(fetchedRecords);
                setFiltered(fetchedRecords)
            });

        return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainView}>
                <NavBar iconSource={IMAGES.LEFT_ARROW} iconPress={() => navigation.goBack()} header='Records List' />
                {
                    records.length === 0 ?
                        <>
                            <Image source={IMAGES.EMPTY} style={styles.emptyImageStyle} />
                            <Text style={styles.looksLikeEmptyStyle}>
                                “Looks empty here! Tap the + to add one.”
                            </Text>
                        </>
                        :
                        <>
                            <SearchInput data={records} filterKey="orderNumber" setFiltered={setFiltered} placeholder="Search by Order Number" />
                            {
                                filtered.length === 0 ?
                                    <Text style={{ fontSize: 20, color: COLORS.blue2 }}>No Records Found</Text>
                                    :
                                    <FlatList
                                        data={filtered}
                                        keyExtractor={(item) => item.orderNumber}
                                        renderItem={({ item }) => <RecordsCard item={item} onPress={() => setDetailsModalVisible(true)} setSelectedRecord={setSelectedRecord} />}
                                    />
                            }
                        </>
                }


                <ListRecordModal role={role} detailsModalVisible={detailsModalVisible} setDetailsModalVisible={setDetailsModalVisible} selectedRecord={selectedRecord} />
            </View>
        </SafeAreaView>
    )
}

export default CompleteRecordsList

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.light_blue
    },
    mainView: {
        width: '90%', alignItems: 'center'
    },
    looksLikeEmptyStyle: {
        color: COLORS.blue2,
        marginTop: hp('2%'),
        fontSize: 15,
    },
    emptyImageStyle: {
        marginTop: hp('10%'),
    },
})