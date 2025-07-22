// import XLSX from 'xlsx';
// import RNFS from 'react-native-fs';
// import Share from 'react-native-share';
// import firestore from '@react-native-firebase/firestore';
// import { Alert } from 'react-native';

// export const exportAndArchiveRecords = async (records: any[]) => {
//     const deliveredRecords = records.filter(r => r.deliveryStatus === 'Delivered');

//     if (deliveredRecords.length === 0) {
//         Alert.alert('No records', 'There are no Delivered records to export.');
//         return;
//     }

//     try {
//         const wsData = deliveredRecords.map(r => ({
//             OrderNumber: r.orderNumber,
//             Category: r.category,
//             DeliveryDate: r.deliveryDate,
//             Status: r.deliveryStatus,
//             Description: r.description,
//             CutBy: r.cutBy,
//             Coat: r.coat,
//             Pant: r.pant,
//             Waistcoat: r.waistcoat,
//         }));

//         const wb = XLSX.utils.book_new();
//         const ws = XLSX.utils.json_to_sheet(wsData);
//         XLSX.utils.book_append_sheet(wb, ws, 'Delivered Records');

//         const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
//         const path = `${RNFS.DownloadDirectoryPath}/DeliveredRecords.xlsx`;

//         await RNFS.writeFile(path, wbout, 'base64');

//         await Share.open({
//             title: 'Exported Delivered Records',
//             url: `file://${path}`,
//             type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         });

//         const batch = firestore().batch();
//         deliveredRecords.forEach(record => {
//             const completeRef = firestore().collection('CompleteRecordList').doc();
//             batch.set(completeRef, record);

//             const originalRef = firestore().collection('Records').doc(record.id);
//             batch.delete(originalRef);
//         });

//         await batch.commit();
//         Alert.alert('Success', 'Delivered records exported, archived and deleted.');
//     } catch (err) {
//         console.error(err);
//         Alert.alert('Error', 'Something went wrong during export.');
//     }
// };


import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// export const exportAndArchiveRecords = async (records: any[]) => {
//   const deliveredRecords = records.filter(r => r.deliveryStatus === 'Delivered');

//   if (deliveredRecords.length === 0) {
//     Alert.alert('No records', 'There are no Delivered records to export.');
//     return;
//   }

//   try {
//     // 🔁 Group records by shop name
//     const groupedRecords: { [key: string]: any[] } = {};
//     deliveredRecords.forEach(record => {
//       const shop = record.category || 'Unknown Shop';
//       if (!groupedRecords[shop]) groupedRecords[shop] = [];
//       groupedRecords[shop].push(record);
//     });

//     const wsData: any[] = [];

//     // 🏪 Add shop name as row, then its records
//     Object.entries(groupedRecords).forEach(([shop, records]) => {
//       wsData.push({}); // Empty row for spacing (optional)
//       wsData.push({ OrderNumber: `${shop}` }); // 👈 shop name row
//       wsData.push({}); // Empty row for spacing (optional)

//       // Add records for this shop
//       records.forEach(r => {
//         wsData.push({
//           OrderNumber: r.orderNumber,
//           Category: r.category,
//           DeliveryDate: r.deliveryDate,
//           Status: r.deliveryStatus,
//           Description: r.description,
//           CutBy: r.cutBy,
//           Coat: r.coat,
//           Pant: r.pant,
//           Waistcoat: r.waistcoat,
//         });
//       });

//       wsData.push({}); // Empty row after shop records (optional)
//     });

//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.json_to_sheet(wsData);
//     XLSX.utils.book_append_sheet(wb, ws, 'Delivered Records');

//     const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
//     const path = `${RNFS.DownloadDirectoryPath}/DeliveredRecords.xlsx`;

//     await RNFS.writeFile(path, wbout, 'base64');

//     await Share.open({
//       title: 'Exported Delivered Records',
//       url: `file://${path}`,
//       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     });

//     // ✅ Archive & delete
//     const batch = firestore().batch();
//     deliveredRecords.forEach(record => {
//       const completeRef = firestore().collection('CompleteRecordList').doc();
//       batch.set(completeRef, record);

//       const originalRef = firestore().collection('Records').doc(record.id);
//       batch.delete(originalRef);
//     });

//     await batch.commit();
//     Alert.alert('Success', 'Delivered records exported, archived, and deleted.');
//   } catch (err) {
//     console.error(err);
//     Alert.alert('Error', 'Something went wrong during export.');
//   }
// };


export const exportAndArchiveRecords = async (records: any[]) => {
  const deliveredRecords = records.filter(r => r.deliveryStatus === 'Delivered');

  if (deliveredRecords.length === 0) {
    Alert.alert('No records', 'There are no Delivered records to export.');
    return;
  }

  try {
    // ✅ 1. SHOP-WISE DATA
    const shopMap: { [key: string]: any[] } = {};
    deliveredRecords.forEach(record => {
      if (!shopMap[record.category]) {
        shopMap[record.category] = [];
      }
      shopMap[record.category].push(record);
    });

    const wsData: any[] = [];
    for (const shop in shopMap) {
      wsData.push({});
      wsData.push({ OrderNumber: `${shop} Orders` });
      shopMap[shop].forEach(r => {
        wsData.push({
          OrderNumber: r.orderNumber,
          Category: r.category,
          DeliveryDate: r.deliveryDate,
          Status: r.deliveryStatus,
          Description: r.description,
          CutBy: r.cutBy,
          Coat: r.coat,
          Pant: r.pant,
          Waistcoat: r.waistcoat,
        });
      });
      wsData.push({});
    }

    // ✅ 2. WORKER-WISE DATA
    const workersSnapshot = await firestore().collection('Workers').get();
    const workerNames = workersSnapshot.docs.map(doc => doc.data().name);

    const workerRecordMap: { [key: string]: any[] } = {};

    workerNames.forEach(name => {
      workerRecordMap[name] = [];
    });

    for (const record of deliveredRecords) {
      const involvedWorkers = [record.pant, record.coat, record.waistcoat, record.cutBy];
      const uniqueInvolved = new Set(involvedWorkers);
      
      for (const workerName of workerNames) {
        if (uniqueInvolved.has(workerName)) {
          // ✅ Same record multiple times for different involved workers
          workerRecordMap[workerName].push(record);
        }
      }
    }

    for (const worker in workerRecordMap) {
      if (workerRecordMap[worker].length === 0) continue;
      wsData.push({ OrderNumber: `${worker} Orders` });
      workerRecordMap[worker].forEach(r => {
        wsData.push({
          OrderNumber: r.orderNumber,
          Category: r.category,
          DeliveryDate: r.deliveryDate,
          Status: r.deliveryStatus,
          Description: r.description,
          CutBy: r.cutBy,
          Coat: r.coat,
          Pant: r.pant,
          Waistcoat: r.waistcoat,
        });
      });
      wsData.push({});
    }

    // ✅ Create Excel Sheet
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

    // ✅ Archive in Firebase
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

