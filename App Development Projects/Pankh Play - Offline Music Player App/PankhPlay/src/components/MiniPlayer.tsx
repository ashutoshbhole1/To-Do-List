import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Typography, Layout } from '@/constants/theme';
import { useThemeStore } from '@/state/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Player: undefined;
};

export default function MiniPlayer() {
    const accentColor = useThemeStore((state) => state.accentColor);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // Mock data for UI testing
    const mockTrack = {
        title: "Call out my name",
        artist: "The Weeknd",
        artwork: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80"
    };

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Player')}
        >
            <View style={[styles.progressLine, { backgroundColor: accentColor }]} />

            <View style={styles.content}>
                <Image source={{ uri: mockTrack.artwork }} style={styles.artwork} />

                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>{mockTrack.title}</Text>
                    <Text style={styles.artist} numberOfLines={1}>{mockTrack.artist}</Text>
                </View>

                <View style={styles.controls}>
                    <TouchableOpacity style={styles.controlBtn}>
                        <Ionicons name="play" size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlBtn}>
                        <Ionicons name="play-skip-forward" size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 70, // Height of the TabBar
        left: 8,
        right: 8,
        backgroundColor: '#1E1E1E',
        borderRadius: Layout.borderRadius.medium,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    progressLine: {
        height: 2,
        width: '40%', // Mock progress
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    artwork: {
        width: 44,
        height: 44,
        borderRadius: Layout.borderRadius.small,
    },
    info: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    title: {
        ...Typography.body,
        fontWeight: '600' as const,
        color: Colors.textPrimary,
    },
    artist: {
        ...Typography.caption,
        marginTop: 2,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlBtn: {
        padding: 8,
        marginLeft: 8,
    }
});
