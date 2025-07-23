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


// final code

// import XLSX from 'xlsx';
// import RNFS from 'react-native-fs';
// import Share from 'react-native-share';
// import firestore from '@react-native-firebase/firestore';
// import { Alert } from 'react-native';



// export const exportAndArchiveRecords = async (records: any[]) => {
//   const deliveredRecords = records.filter(r => r.deliveryStatus === 'Delivered');

//   if (deliveredRecords.length === 0) {
//     Alert.alert('No records', 'There are no Delivered records to export.');
//     return;
//   }

//   try {
//     // ✅ 1. SHOP-WISE DATA
//     const shopMap: { [key: string]: any[] } = {};
//     deliveredRecords.forEach(record => {
//       if (!shopMap[record.category]) {
//         shopMap[record.category] = [];
//       }
//       shopMap[record.category].push(record);
//     });

//     const wsData: any[] = [];
//     for (const shop in shopMap) {
//       wsData.push({});
//       wsData.push({ OrderNumber: `${shop} Orders` });
//       shopMap[shop].forEach(r => {
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
//       wsData.push({});
//     }

//     // ✅ 2. WORKER-WISE DATA
//     const workersSnapshot = await firestore().collection('Workers').get();
//     const workerNames = workersSnapshot.docs.map(doc => doc.data().name);

//     const workerRecordMap: { [key: string]: any[] } = {};

//     workerNames.forEach(name => {
//       workerRecordMap[name] = [];
//     });

//     for (const record of deliveredRecords) {
//       const involvedWorkers = [record.pant, record.coat, record.waistcoat, record.cutBy];
//       const uniqueInvolved = new Set(involvedWorkers);
      
//       for (const workerName of workerNames) {
//         if (uniqueInvolved.has(workerName)) {
//           // ✅ Same record multiple times for different involved workers
//           workerRecordMap[workerName].push(record);
//         }
//       }
//     }

//     for (const worker in workerRecordMap) {
//       if (workerRecordMap[worker].length === 0) continue;
//       wsData.push({ OrderNumber: `${worker} Orders` });
//       workerRecordMap[worker].forEach(r => {
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
//       wsData.push({});
//     }

//     // ✅ Create Excel Sheet
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

//     // ✅ Archive in Firebase
//     const batch = firestore().batch();
//     deliveredRecords.forEach(record => {
//       const completeRef = firestore().collection('CompleteRecordList').doc();
//       batch.set(completeRef, record);

//       const originalRef = firestore().collection('Records').doc(record.id);
//       batch.delete(originalRef);
//     });

//     await batch.commit();
//     Alert.alert('Success', 'Delivered records exported, archived and deleted.');
//   } catch (err) {
//     console.error(err);
//     Alert.alert('Error', 'Something went wrong during export.');
//   }
// };

import RNHTMLtoPDF from 'react-native-html-to-pdf';
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
    const shopMap: { [key: string]: any[] } = {};
    deliveredRecords.forEach(record => {
      if (!shopMap[record.category]) {
        shopMap[record.category] = [];
      }
      shopMap[record.category].push(record);
    });

    let htmlContent = `
      <html>
      <head>
        <style>
          h1 {
            text-align: center;
            color: #4A148C;
          }
          h2 {
            text-align: center;
            color: #0D47A1;
            margin-top: 40px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 10px;
          }
          th, td {
            border: 1px solid #999;
            text-align: center;
            padding: 8px;
          }
          .shop-table th {
            background-color: #E3F2FD;
            color: #0D47A1;
          }
          .shop-table td {
            background-color: #F1F8E9;
          }
          .worker-table th {
            background-color: #FCE4EC;
            color: #880E4F;
          }
          .worker-table td {
            background-color: #FFF3E0;
          }
        </style>
      </head>
      <body>
        <h1>Delivered Records</h1>
    `;

    htmlContent += `<h1>Shops Data</h1>`;
    for (const shop in shopMap) {
      
      htmlContent += `
        <h2>${shop} Orders</h2>
        <table class="shop-table">
          <tr><th>Order Number</th><th>Description</th><th>Amount</th></tr>
      `;
      shopMap[shop].forEach(r => {
        htmlContent += `
          <tr>
            <td>${r.orderNumber}</td>
            <td>${r.description}</td>
            <td></td>
          </tr>
        `;
      });
      htmlContent += `</table>`;
    }

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
          workerRecordMap[workerName].push(record);
        }
      }
    }

    htmlContent += `<h1>Workers Data</h1>`;
    for (const worker in workerRecordMap) {
      if (workerRecordMap[worker].length === 0) continue;
     
      htmlContent += `
        <h2>${worker} Orders</h2>
        <table class="worker-table">
          <tr><th>Order Number</th><th>Amount</th></tr>
      `;
      workerRecordMap[worker].forEach(r => {
        htmlContent += `
          <tr>
            <td>${r.orderNumber}</td>
            <td></td>
          </tr>
        `;
      });
      htmlContent += `</table>`;
    }

    htmlContent += `</body></html>`;

    const options = {
      html: htmlContent,
      fileName: 'Delivered_Records',
      directory: 'Download',
    };

    const pdf = await RNHTMLtoPDF.convert(options);

    await Share.open({
      title: 'Delivered Records PDF',
      url: `file://${pdf.filePath}`,
      type: 'application/pdf',
    });

    const batch = firestore().batch();
    deliveredRecords.forEach(record => {
      const completeRef = firestore().collection('CompleteRecordList').doc();
      batch.set(completeRef, record);

      const originalRef = firestore().collection('Records').doc(record.id);
      batch.delete(originalRef);
    });

    await batch.commit();
    Alert.alert('Success', 'Delivered records exported as PDF, archived and deleted.');
  } catch (err) {
    console.error(err);
    Alert.alert('Error', 'Something went wrong during PDF export.');
  }
};



