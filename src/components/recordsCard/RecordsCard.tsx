import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ACTIVE_OPACITY, COLORS, hp } from '../../enums/StyleGuide';

interface RecordItem {
    orderNumber: string;
    category: string;
    deliveryDate: string;
    deliveryStatus: string;
    icon: any;
}

interface Props {
    item: RecordItem;
    onPress: () => void;
    setSelectedRecord: (record: RecordItem) => void;
}

const RecordsCard: React.FC<Props> = ({ item, onPress, setSelectedRecord }) => {
    return (
        <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            style={styles.mainCardStyle}
            onPress={() => {
                setSelectedRecord(item);
                onPress();
            }}
        >
            <View style={styles.cardItemsRowView}>
                <Text style={styles.cateTextStyle}>Order No. {item?.orderNumber}</Text>
                <Text style={styles.orderIdText}>{item?.category}</Text>
            </View>
            <View style={styles.cardItemsRowView}>
                <Text style={styles.deliveryDateText}>Delivery Date: {item?.deliveryDate}</Text>
                <View style={styles.deliveredTextAndIcon}>
                    <Image source={item?.icon} style={styles.iconStyle} />
                    <Text style={styles.deliveredText}>{item?.deliveryStatus}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default RecordsCard;

const styles = StyleSheet.create({
    mainCardStyle: {
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    cardItemsRowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 5,
    },
    cateTextStyle: {
        fontSize: 18,
        color: COLORS.blue2,
    },
    orderIdText: {
        color: COLORS.grey3,
    },
    deliveryDateText: {
        fontSize: 14,
    },
    deliveredTextAndIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    iconStyle: {
        height: 20,
        width: 20,
    },
    deliveredText: {
        color: COLORS.grey3,
    },
});
