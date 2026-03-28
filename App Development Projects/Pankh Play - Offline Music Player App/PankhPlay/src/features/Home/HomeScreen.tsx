import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors, Typography, Layout } from '@/constants/theme';
import { useThemeStore } from '@/state/useThemeStore';
import { usePlayerStore } from '@/state/usePlayerStore';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CATEGORIES = ['All', 'Party', 'Blues', 'Sad', 'Hip Hop'];

const POPULAR_SONGS = [
    { id: '1', title: 'Jazz Concert', artist: 'The Weekend', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80' },
    { id: '2', title: 'Festival', artist: 'Music', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80' },
    { id: '3', title: 'Live Performance', artist: 'Harmony wave', image: 'https://images.unsplash.com/photo-1470229722913-7c090b332da8?w=400&q=80' },
];

export default function HomeScreen() {
    const accentColor = useThemeStore((state) => state.accentColor);
    const { library, loadLibrary, playTrack } = usePlayerStore();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        loadLibrary();
    }, []);

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/100?img=11' }}
                            style={styles.profilePic}
                        />
                        <View>
                            <Text style={styles.greeting}>Good Morning!</Text>
                            <Text style={styles.username}>Antony Das</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.notificationBtn}>
                        <Ionicons name="notifications-outline" size={24} color={Colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <Text style={styles.sectionTitle}>Select Categories</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryScroll}
                >
                    {CATEGORIES.map((cat, index) => {
                        const isActive = index === 0;
                        return (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryPill,
                                    { backgroundColor: isActive ? accentColor : Colors.surfaceLight }
                                ]}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    { color: isActive ? '#000' : Colors.textSecondary, fontWeight: isActive ? '700' : '500' }
                                ]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Popular Songs */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Popular Songs</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See all <Ionicons name="chevron-forward" size={12} /></Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardsScroll}
                >
                    {library.slice(0, 10).map((song, index) => (
                        <TouchableOpacity
                            key={song.id || index.toString()}
                            style={styles.songCard}
                            onPress={() => playTrack(song)}
                        >
                            <Image source={{ uri: song.artwork as string || 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80' }} style={styles.songImage} />
                            <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
                            <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
                            <Text style={styles.songArtist} numberOfLines={1}>{song.artist}</Text>
                        </TouchableOpacity>
                    ))}

                    {library.length === 0 && (
                        <Text style={{ color: Colors.textSecondary, marginTop: 20 }}>Scanning for local music...</Text>
                    )}
                </ScrollView>

                {/* New Collection */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>New Collection</Text>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardsScroll}
                >
                    <TouchableOpacity style={styles.collectionCard}>
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f4a7?w=500&q=80' }} style={StyleSheet.absoluteFillObject} />
                        <View style={styles.collectionOverlay} />
                        <View style={styles.collectionContent}>
                            <Text style={styles.collectionTitle}>Top Songs{'\n'}Global</Text>
                            <Text style={styles.collectionSubtitle}>Discover 86 songs</Text>
                            <Ionicons name="arrow-forward" size={24} color={accentColor} style={{ marginTop: 10 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.collectionCard}>
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80' }} style={StyleSheet.absoluteFillObject} />
                        <View style={styles.collectionOverlay} />
                        <View style={styles.collectionContent}>
                            <Text style={styles.collectionTitle}>Popular{'\n'}Songs Hip Hop</Text>
                            <Text style={styles.collectionSubtitle}>Discover 50 songs</Text>
                            <Ionicons name="arrow-forward" size={24} color={accentColor} style={{ marginTop: 10 }} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                <View style={{ height: 100 }} />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Layout.padding,
        paddingTop: 20,
        marginBottom: 24,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    greeting: {
        ...Typography.caption,
        fontSize: 13,
    },
    username: {
        ...Typography.title,
        marginTop: 2,
    },
    notificationBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Layout.padding,
        marginTop: 30,
        marginBottom: 16,
    },
    sectionTitle: {
        ...Typography.title,
        paddingHorizontal: Layout.padding,
    },
    seeAll: {
        ...Typography.body,
        fontSize: 13,
    },
    categoryScroll: {
        paddingHorizontal: Layout.padding,
        marginTop: 16,
        paddingBottom: 8,
    },
    categoryPill: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: Layout.borderRadius.pill,
        marginRight: 10,
    },
    categoryText: {
        fontSize: 14,
    },
    cardsScroll: {
        paddingHorizontal: Layout.padding,
    },
    songCard: {
        width: 140,
        marginRight: 16,
    },
    songImage: {
        width: 140,
        height: 140,
        borderRadius: Layout.borderRadius.medium,
        backgroundColor: Colors.surface,
    },
    accentBar: {
        width: 3,
        height: 14,
        position: 'absolute',
        bottom: 35,
        left: 0,
        borderRadius: 2,
    },
    songTitle: {
        ...Typography.body,
        color: Colors.textPrimary,
        fontWeight: '600',
        marginTop: 12,
        paddingLeft: 8,
    },
    songArtist: {
        ...Typography.caption,
        paddingLeft: 8,
        marginTop: 4,
    },
    collectionCard: {
        width: 280,
        height: 160,
        borderRadius: Layout.borderRadius.medium,
        marginRight: 16,
        overflow: 'hidden',
    },
    collectionOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    collectionContent: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    collectionTitle: {
        ...Typography.header,
        fontSize: 22,
        marginBottom: 8,
    },
    collectionSubtitle: {
        ...Typography.caption,
        color: '#E0E0E0',
    }
});
