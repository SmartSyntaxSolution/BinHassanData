import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

/**
 * Generic Firestore collection subscription hook.
 * @param {string} collectionName Firestore collection name
 * @param {function} setData State setter for storing fetched docs
 */
export const useFirestoreCollection = (collectionName: string, setData: any) => {
    useEffect(() => {
        const unsubscribe = firestore()
            .collection(collectionName)
            .onSnapshot(snapshot => {
                const docs = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(docs);
            });

        return () => unsubscribe();
    }, [collectionName]);
};


export const useFirestoreDelete = () => {
    const confirmAndDelete = ({
        collectionName,
        docId,
        title = 'Delete',
        message = 'Are you sure you want to delete this?',
        onSuccess,
    }: {
        collectionName: string,
        docId: string,
        title?: string,
        message?: string,
        onSuccess?: () => void,
    }) => {
        Alert.alert(
            title,
            message,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await firestore().collection(collectionName).doc(docId).delete();
                            Alert.alert('Deleted', 'Document deleted successfully.');
                            if (onSuccess) {
                                onSuccess();
                            }
                        } catch (error) {
                            console.log(error);
                            Alert.alert('Error', 'Could not delete document.');
                        }
                    },
                },
            ]
        );
    };

    return { confirmAndDelete };
};