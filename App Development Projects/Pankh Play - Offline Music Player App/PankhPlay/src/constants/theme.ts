export const Colors = {
    background: '#000000',     // Deep pure black background
    surface: '#121212',        // Dark elevated surface
    surfaceLight: '#1A1A1A',   // Lighter surface for cards
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
    inactive: '#404040',

    // Neon presets for the user to choose from
    accents: {
        green: '#BFFF00',        // The primary UI reference glowing neon lime green
        orange: '#FF5E00',
        blue: '#00D1FF',
        purple: '#B530FF',
        red: '#FF2A2A',
    }
};

export const Typography = {
    header: {
        fontSize: 24,
        fontWeight: '700' as const,
        color: Colors.textPrimary,
    },
    title: {
        fontSize: 18,
        fontWeight: '600' as const,
        color: Colors.textPrimary,
    },
    body: {
        fontSize: 14,
        fontWeight: '400' as const,
        color: Colors.textSecondary,
    },
    caption: {
        fontSize: 12,
        fontWeight: '400' as const,
        color: Colors.inactive,
    },
};

export const Layout = {
    padding: 16,
    borderRadius: {
        small: 8,
        medium: 16,
        large: 24,
        pill: 999,
    }
};
