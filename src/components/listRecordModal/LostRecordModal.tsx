import { Modal, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'
import { COLORS } from '../../enums/StyleGuide'
import firestore from '@react-native-firebase/firestore'

interface props {
  detailsModalVisible: boolean
  setDetailsModalVisible: (visible: boolean) => void
  selectedRecord: {
    id: string
    category: string
    orderNumber: string
    deliveryDate: string
    deliveryStatus: string
    description: string
    cutBy: string
    coat: string
    pant: string
    waistcoat: string
  } | null
  newDeliveryDate?: string
  setNewDeliveryDate?: (date: string) => void
  newDeliveryStatus?: string
  setNewDeliveryStatus?: (status: string) => void
  role?: string
}

const ListRecordModal = ({
  detailsModalVisible,
  setDetailsModalVisible,
  selectedRecord,
  role
}: props) => {

  const handleSave = () => {
    setDetailsModalVisible(false)
  }

  const handleDelete = async () => {
    if (!selectedRecord) return

    try {
      await firestore().collection('CompleteRecordList').doc(selectedRecord.id).delete()
      Alert.alert('Deleted', 'Record deleted successfully.')
      setDetailsModalVisible(false)
    } catch (error) {
      console.error('Error deleting record:', error)
      Alert.alert('Error', 'Failed to delete the record.')
    }
  }

  return (
    <Modal
      visible={detailsModalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setDetailsModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.detailsModalContainer}>
          {selectedRecord && (
            <>
              <Text style={styles.modalTitle}>Record Details</Text>

              {/* Details */}
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Shop:</Text><Text style={styles.detailValue}>{selectedRecord.category}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Order Number:</Text><Text style={styles.detailValue}>{selectedRecord.orderNumber}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Delivery Date:</Text><Text style={styles.detailValue}>{selectedRecord.deliveryDate}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Status:</Text><Text style={styles.detailValue}>{selectedRecord.deliveryStatus}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Description:</Text><Text style={styles.detailValue}>{selectedRecord.description}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Cut By:</Text><Text style={styles.detailValue}>{selectedRecord.cutBy}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Coat:</Text><Text style={styles.detailValue}>{selectedRecord.coat}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Pant:</Text><Text style={styles.detailValue}>{selectedRecord.pant}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Waistcoat:</Text><Text style={styles.detailValue}>{selectedRecord.waistcoat}</Text></View>

              <TouchableOpacity style={styles.detailsCloseButton} onPress={handleSave}>
                <Text style={styles.detailsCloseButtonText}>Save & Close</Text>
              </TouchableOpacity>

              {role === 'admin' && (
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                  <Text style={styles.deleteButtonText}>Delete Record</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    </Modal>
  )
}

export default ListRecordModal

const styles = StyleSheet.create({
  detailsModalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    width: '85%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey3,
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.blue2,
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.grey3,
    flexShrink: 1,
    textAlign: 'right',
  },
  detailsCloseButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: COLORS.blue2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  detailsCloseButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
})
