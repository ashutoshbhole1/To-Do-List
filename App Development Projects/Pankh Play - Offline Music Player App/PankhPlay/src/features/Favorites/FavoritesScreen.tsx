import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '@/constants/theme';
import { useThemeStore } from '@/state/useThemeStore';

export default function FavoritesScreen() {
    const accentColor = useThemeStore((state) => state.accentColor);

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: accentColor }]}>Favorites</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        ...Typography.header,
    }
});
