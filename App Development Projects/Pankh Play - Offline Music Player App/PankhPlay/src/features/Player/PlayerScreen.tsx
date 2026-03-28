import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Colors, Typography, Layout } from '@/constants/theme';
import { useThemeStore } from '@/state/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function PlayerScreen() {
    const accentColor = useThemeStore((state) => state.accentColor);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    // Mock data for static UI testing
    const mockTrack = {
        title: "Call out my name",
        artist: "The Weeknd",
        artwork: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80"
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Background Image with heavy blur/dark overlay */}
            <Image
                source={{ uri: mockTrack.artwork }}
                style={styles.backgroundImage}
                blurRadius={60}
            />
            <View style={styles.overlay} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-down" size={28} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Now Playing</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
            </View>

            {/* Album Art */}
            <View style={styles.artworkContainer}>
                <Image source={{ uri: mockTrack.artwork }} style={styles.artwork} />
            </View>

            {/* Track Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{mockTrack.title}</Text>
                <Text style={styles.artist}>{mockTrack.artist}</Text>
            </View>

            {/* Circular Glowing Player Controls Section */}
            <View style={styles.controlsContainer}>

                {/* Top actions above progress */}
                <View style={styles.secondaryControls}>
                    <TouchableOpacity><Ionicons name="share-social-outline" size={24} color={Colors.textSecondary} /></TouchableOpacity>
                    <TouchableOpacity><Ionicons name="heart" size={28} color={accentColor} /></TouchableOpacity>
                    <TouchableOpacity><Ionicons name="list" size={24} color={Colors.textSecondary} /></TouchableOpacity>
                </View>

                {/* Progress Bar (Linear for now, but will glow) */}
                <View style={styles.progressSection}>
                    <Text style={styles.timeText}>1:35</Text>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarGlow, { backgroundColor: accentColor, width: '40%', shadowColor: accentColor }]} />
                        <View style={[styles.progressThumb, { backgroundColor: accentColor, left: '40%' }]} />
                    </View>
                    <Text style={styles.timeText}>3:05</Text>
                </View>


                {/* Main Controls Wrapper */}
                <View style={styles.mainControlsRow}>
                    <TouchableOpacity style={styles.controlIcon}><Ionicons name="shuffle" size={24} color={Colors.textSecondary} /></TouchableOpacity>
                    <TouchableOpacity style={styles.controlIcon}><Ionicons name="play-skip-back" size={32} color={Colors.textPrimary} /></TouchableOpacity>

                    {/* Huge Glowing Play Button */}
                    <View style={[styles.playButtonOuterGlow, { shadowColor: accentColor }]}>
                        <TouchableOpacity style={[styles.playButtonInner, { borderColor: accentColor }]}>
                            <Ionicons name="pause" size={40} color={Colors.textPrimary} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.controlIcon}><Ionicons name="play-skip-forward" size={32} color={Colors.textPrimary} /></TouchableOpacity>
                    <TouchableOpacity style={styles.controlIcon}><Ionicons name="repeat" size={24} color={Colors.textSecondary} /></TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.4,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Layout.padding,
        paddingVertical: 10,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        ...Typography.caption,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    artworkContainer: {
        alignItems: 'center',
        marginTop: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 30,
        elevation: 20,
    },
    artwork: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: Layout.borderRadius.large,
    },
    infoContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    title: {
        ...Typography.header,
        fontSize: 28,
        marginBottom: 8,
    },
    artist: {
        ...Typography.title,
        color: Colors.textSecondary,
        fontWeight: '400',
    },
    controlsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 60,
    },
    secondaryControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.15,
        marginBottom: 30,
        alignItems: 'center',
    },
    progressSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Layout.padding * 1.5,
        marginBottom: 40,
    },
    timeText: {
        ...Typography.caption,
        width: 45,
        textAlign: 'center',
    },
    progressBarBg: {
        flex: 1,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
        marginHorizontal: 12,
        position: 'relative',
        justifyContent: 'center',
    },
    progressBarGlow: {
        position: 'absolute',
        height: '100%',
        borderRadius: 2,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    progressThumb: {
        position: 'absolute',
        width: 14,
        height: 14,
        borderRadius: 7,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 15,
        transform: [{ translateX: -7 }],
    },
    mainControlsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 10,
    },
    controlIcon: {
        padding: 10,
    },
    playButtonOuterGlow: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 25,
        elevation: 10,
    },
    playButtonInner: {
        width: 76,
        height: 76,
        borderRadius: 38,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.surfaceLight,
    }
});
