// components/DatePickerField.tsx
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { COLORS } from '../../enums/StyleGuide';

interface DatePickerFieldProps {
    label?: string;
    date: Date;
    setDate: (date: Date) => void;
    placeholder?: string;
}

const DatePickerField = ({
    label = 'Select Date',
    date,
    setDate,
    placeholder = 'Select Date',
}: DatePickerFieldProps) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
                style={styles.dateBox}
                onPress={() => setOpen(true)}
            >
                <Text style={{color:"black"}} >{date ? date.toLocaleDateString() : placeholder}</Text>
            </TouchableOpacity>

            <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={(selectedDate) => {
                    setOpen(false);
                    setDate(selectedDate);
                }}
                onCancel={() => setOpen(false)}
            />
        </View>
    );
};

export default DatePickerField;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
    },
    label: {
        fontWeight: 'bold',
        
        marginBottom: 5,
        color: "grey",
    },
    dateBox: {
        padding: 15,
        borderRadius: 5,
        width: '100%',
        color: "black",
        backgroundColor: '#fff',
    },
});
