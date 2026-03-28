import { create } from 'zustand';
import TrackPlayer, { Track, State } from 'react-native-track-player';

interface PlayerState {
    currentTrack: Track | null;
    isPlaying: boolean;
    isBuffering: boolean;
    library: Track[];

    // Actions
    setLibrary: (tracks: Track[]) => void;
    loadLibrary: () => Promise<void>;
    playTrack: (track: Track) => Promise<void>;
    togglePlayPause: () => Promise<void>;
    nextTrack: () => Promise<void>;
    previousTrack: () => Promise<void>;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    currentTrack: null,
    isPlaying: false,
    isBuffering: false,
    library: [],

    setLibrary: (tracks) => set({ library: tracks }),

    loadLibrary: async () => {
        const { scanLocalAudio } = require('@/utils/audioScanner');
        const tracks = await scanLocalAudio();
        set({ library: tracks });
    },

    playTrack: async (track) => {
        try {
            await TrackPlayer.reset();
            await TrackPlayer.add(track);
            await TrackPlayer.play();
            set({ currentTrack: track, isPlaying: true });
        } catch (error) {
            console.error('Failed to play track:', error);
        }
    },

    togglePlayPause: async () => {
        const currentState = await TrackPlayer.getPlaybackState();

        if (currentState.state === State.Playing) {
            await TrackPlayer.pause();
            set({ isPlaying: false });
        } else {
            await TrackPlayer.play();
            set({ isPlaying: true });
        }
    },

    nextTrack: async () => {
        try {
            await TrackPlayer.skipToNext();
        } catch (e) {
            console.log('No next track.');
        }
    },

    previousTrack: async () => {
        try {
            await TrackPlayer.skipToPrevious();
        } catch (e) {
            console.log('No previous track.');
        }
    }
}));
