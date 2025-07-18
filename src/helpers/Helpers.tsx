import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export const exportAndArchiveRecords = async (records: any[]) => {
    const deliveredRecords = records.filter(r => r.deliveryStatus === 'Delivered');

    if (deliveredRecords.length === 0) {
        Alert.alert('No records', 'There are no Delivered records to export.');
        return;
    }

    try {
        const wsData = deliveredRecords.map(r => ({
            OrderNumber: r.orderNumber,
            Category: r.category,
            DeliveryDate: r.deliveryDate,
            Status: r.deliveryStatus,
            Description: r.description,
            CutBy: r.cutBy,
            Coat: r.coat,
            Pant: r.pant,
            Waistcoat: r.waistcoat,
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, 'Delivered Records');

        const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
        const path = `${RNFS.DownloadDirectoryPath}/DeliveredRecords.xlsx`;

        await RNFS.writeFile(path, wbout, 'base64');

        await Share.open({
            title: 'Exported Delivered Records',
            url: `file://${path}`,
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        const batch = firestore().batch();
        deliveredRecords.forEach(record => {
            const completeRef = firestore().collection('CompleteRecordList').doc();
            batch.set(completeRef, record);

            const originalRef = firestore().collection('Records').doc(record.id);
            batch.delete(originalRef);
        });

        await batch.commit();
        Alert.alert('Success', 'Delivered records exported, archived and deleted.');
    } catch (err) {
        console.error(err);
        Alert.alert('Error', 'Something went wrong during export.');
    }
};
