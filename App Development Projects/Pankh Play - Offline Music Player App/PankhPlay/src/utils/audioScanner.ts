import * as MediaLibrary from 'expo-media-library';
import { Track } from 'react-native-track-player';

export async function scanLocalAudio(): Promise<Track[]> {
    const permission = await MediaLibrary.requestPermissionsAsync();

    if (!permission.granted) {
        console.warn("Permission to access media library was not granted.");
        return [];
    }

    try {
        // Fetch audio assets from the device
        const media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: 1000, // Fetch up to 1000 tracks for now
        });

        // Map MediaLibrary assets to react-native-track-player Track objects
        const tracks: Track[] = media.assets.map((asset) => {
            // Basic filename parsing for UI (removes extension like .mp3)
            const cleanTitle = asset.filename.replace(/\.[^/.]+$/, "");

            return {
                id: asset.id,
                url: asset.uri,
                title: cleanTitle,
                artist: 'Unknown Artist', // We can add ID3 tag parsing later for better metadata
                artwork: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=200&q=80', // Default artwork
                duration: asset.duration,
            };
        });

        return tracks;
    } catch (error) {
        console.error("Error scanning local audio:", error);
        return [];
    }
}
