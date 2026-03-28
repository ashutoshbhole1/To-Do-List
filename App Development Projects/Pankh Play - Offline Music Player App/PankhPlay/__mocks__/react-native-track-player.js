module.exports = {
    setupPlayer: jest.fn(),
    destroy: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    skipToNext: jest.fn(),
    skipToPrevious: jest.fn(),
    getPlaybackState: jest.fn().mockResolvedValue({ state: 'none' }),
    addEventListener: jest.fn(),
    State: {
        None: 'none',
        Ready: 'ready',
        Playing: 'playing',
        Paused: 'paused',
        Stopped: 'stopped',
        Buffering: 'buffering',
    },
    Event: {
        PlaybackState: 'playback-state',
        PlaybackError: 'playback-error',
        PlaybackQueueEnded: 'playback-queue-ended',
        PlaybackTrackChanged: 'playback-track-changed',
    }
};
