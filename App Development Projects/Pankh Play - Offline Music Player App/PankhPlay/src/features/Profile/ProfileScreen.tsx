import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Typography, Layout } from '@/constants/theme';
import { useThemeStore } from '@/state/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const { accentColor, setAccentColor, resetTheme } = useThemeStore();
    const insets = useSafeAreaInsets();

    const colorOptions = [
        { label: 'Neon Green', hex: Colors.accents.green },
        { label: 'Orange', hex: Colors.accents.orange },
        { label: 'Electric Blue', hex: Colors.accents.blue },
        { label: 'Purple Glow', hex: Colors.accents.purple },
        { label: 'Crimson Red', hex: Colors.accents.red },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Theme Settings Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Theme Color</Text>
                    <Text style={styles.sectionSubtitle}>
                        Select an accent color to instantly update the app's glow and active elements.
                    </Text>

                    <View style={styles.colorWheelContainer}>
                        {colorOptions.map((color) => {
                            const isSelected = accentColor === color.hex;
                            return (
                                <TouchableOpacity
                                    key={color.hex}
                                    onPress={() => setAccentColor(color.hex)}
                                    style={[
                                        styles.colorCircleWrapper,
                                        isSelected && { borderColor: color.hex, borderWidth: 2 }
                                    ]}
                                >
                                    <View style={[styles.colorCircle, { backgroundColor: color.hex }]} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <TouchableOpacity style={styles.resetButton} onPress={resetTheme}>
                        <Ionicons name="refresh" size={20} color={Colors.textSecondary} />
                        <Text style={styles.resetText}>Reset to Default (Neon Green)</Text>
                    </TouchableOpacity>
                </View>

                {/* Other Placeholders */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Playback</Text>
                    <TouchableOpacity style={styles.listItem}>
                        <Ionicons name="options-outline" size={24} color={Colors.textPrimary} />
                        <Text style={styles.listItemText}>Equalizer</Text>
                        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.listItem, styles.listItemNoBorder]}>
                        <Ionicons name="timer-outline" size={24} color={Colors.textPrimary} />
                        <Text style={styles.listItemText}>Sleep Timer</Text>
                        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <TouchableOpacity style={styles.listItem}>
                        <Text style={styles.listItemText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem}>
                        <Text style={styles.listItemText}>Rate App</Text>
                    </TouchableOpacity>
                    <View style={[styles.listItem, styles.listItemNoBorder]}>
                        <Text style={styles.listItemText}>App Version</Text>
                        <Text style={styles.versionText}>1.0.0</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingHorizontal: Layout.padding,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.surfaceLight,
    },
    headerTitle: {
        ...Typography.header,
    },
    content: {
        padding: Layout.padding,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        ...Typography.title,
        marginBottom: 8,
    },
    sectionSubtitle: {
        ...Typography.body,
        marginBottom: 16,
    },
    colorWheelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    colorCircleWrapper: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    resetText: {
        ...Typography.body,
        marginLeft: 8,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.surface,
    },
    listItemNoBorder: {
        borderBottomWidth: 0,
    },
    listItemText: {
        ...Typography.body,
        color: Colors.textPrimary,
        flex: 1,
        marginLeft: 12,
    },
    versionText: {
        ...Typography.caption,
    }
});
