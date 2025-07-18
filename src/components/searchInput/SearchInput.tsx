import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../enums/StyleGuide';

interface SearchInputProps {
    data: any[];
    filterKey: string;
    setFiltered: (value: any[]) => void;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    data,
    filterKey,
    setFiltered,
    placeholder = 'Search by Order Number',
}) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (text: string) => {
        setSearchText(text);

        if (text.trim() === '') {
            setFiltered(data);
        } else {
            const searchFiltered = data.filter(item =>
                item[filterKey].toString().includes(text.trim())
            );
            setFiltered(searchFiltered);
        }
    };

    return (
        <TextInput
            value={searchText}
            onChangeText={handleSearch}
            placeholder={placeholder}
            placeholderTextColor={COLORS.grey2}
            style={styles.searchInput}
            keyboardType="numeric"
        />
    );
};

export default SearchInput;

const styles = StyleSheet.create({
    searchInput: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginVertical: 10,
        fontSize: 16,
        color: COLORS.black,
    },
});
