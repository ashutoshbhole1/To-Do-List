import { create } from 'zustand';
import { MMKV } from 'react-native-mmkv';
import { Colors } from '@/constants/theme';

export const storage = new MMKV();

interface ThemeState {
    accentColor: string;
    setAccentColor: (color: string) => void;
    resetTheme: () => void;
}

// Persist the selected theme across app restarts
const THEME_STORAGE_KEY = 'app_accent_color';

export const useThemeStore = create<ThemeState>((set) => ({
    accentColor: storage.getString(THEME_STORAGE_KEY) || Colors.accents.green,
    setAccentColor: (color: string) => {
        storage.set(THEME_STORAGE_KEY, color);
        set({ accentColor: color });
    },
    resetTheme: () => {
        storage.delete(THEME_STORAGE_KEY);
        set({ accentColor: Colors.accents.green });
    },
}));
