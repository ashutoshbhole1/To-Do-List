App Name (Working Title): PANKH Play –  Offline Music Player
🎯 PROJECT GOAL

Build a minimal, premium black-theme offline music player Android app with smooth animations, modern UI, customizable accent colors, and fully compliant for Google Play Store publishing.

The app must feel:

Premium

Clean

Dark

Minimal

Smooth

Fast

Lightweight

Elegant

Inspired by the provided screenshots:

Deep black backgrounds

Glowing accent elements

Smooth rounded components

Large modern controls

Clean typography

Premium spacing

🏗️ TECH STACK (LATEST & PLAY STORE READY)
Frontend:

Flutter (latest stable)
OR

React Native (Expo Bare Workflow latest)

Audio Engine:

ExoPlayer (if native)

react-native-track-player (if RN)

just_audio (if Flutter)

Architecture:

MVVM / Clean Architecture

Modular folder structure

Scalable state management (Redux / Riverpod / Bloc)

Storage:

Local device storage access

SQLite for playlists & favorites

Permissions:

Scoped storage (Android 13+ compliant)

Proper runtime permissions

🎨 DESIGN SYSTEM (Based on Your Screenshot)
🌑 Base Theme: Deep Minimal Black

Primary Background:

Pure Black: #000000

Surface Dark: #121212

Card Dark: #1A1A1A

Typography:

Font: Inter / SF Pro style / Poppins

Clean, bold headings

Soft gray secondary text (#B3B3B3)

Corners:

16px rounded for cards

24px rounded for main player container

Shadows:

Soft glowing shadow on active elements

Neon subtle glow effect on accent color

Spacing:

Airy layout

Generous padding

Clean alignment

🎨 DYNAMIC ACCENT COLOR SYSTEM (VERY IMPORTANT)

The entire app must use a dynamic accent color variable.

Example:

primaryColor = userSelectedColor

This color affects:

Play button glow

Progress bar

Active icons

Selected tab

Switch toggles

Sliders

Favorite heart

Ripple effects

Mini player highlight

🎨 COLOR WHEEL FEATURE (SETTINGS TAB)

Inside Settings:

Show interactive Color Wheel picker

User selects any color

On selection:

Whole app accent updates instantly

Saved to local storage

Persists on app restart

Add:

Reset to Default option

Preset themes:

Neon Green

Orange

Electric Blue

Purple Glow

Crimson Red

Use smooth animated transition when color changes.

🎵 CORE FEATURES (ESSENTIAL)
📂 Music Library

Auto scan device storage

Songs

Albums

Artists

Folders

Recently Added

▶️ Player Screen (Premium UI)

Full Screen Player Includes:

Album Art (large center)

Song Title

Artist Name

Progress Bar (accent color)

Current time / Total time

Play / Pause (large glowing circular button)

Next / Previous

Shuffle

Repeat (All / One)

Add to Playlist

Add to Favorites

Smooth animation when:

Switching songs

Expanding from mini player

🎛️ Mini Player

Sticky bottom mini player:

Small album art

Song title

Play/pause

Swipe up to expand

❤️ Favorites

Mark songs favorite

Dedicated Favorites section

📑 Playlist System

Create playlist

Edit playlist

Delete playlist

Add/remove songs

Auto create "Recently Played"

🔍 Search

Instant local search

Search by song / artist / album

⏱️ Sleep Timer

15 / 30 / 60 min

Custom timer

🎚️ Equalizer

Basic equalizer

Presets (Bass Boost, Classical, Rock)

Use system equalizer if available

🔒 Background Playback

Works when app closed

Notification controls

Lock screen controls

📲 Notification Controls

Play

Pause

Next

Previous

Album art visible

⚙️ SETTINGS SECTION

Color Theme Picker (Color Wheel)

Equalizer

Sleep Timer

App Version

Privacy Policy

Rate App

Share App

Reset Theme

Default Startup Screen selection

📦 GOOGLE PLAY STORE REQUIREMENTS

Must include:

Proper permission handling

Scoped storage compliance

Background media explanation

Privacy Policy link

No unnecessary permissions

Target latest Android SDK

Proper adaptive app icon

Splash screen

Crash handling

App size optimized (<25MB if possible)

🔥 ANIMATIONS

Smooth fade transitions

Scale animation on button press

Glow pulse on active play button

Gradient lighting effect behind play button

Mini player slide-up animation

Color transition animation

📱 PERFORMANCE REQUIREMENTS

Smooth on low-end Android

No lag while scrolling large music list

Efficient memory usage

Lazy loading for album arts

🧠 OPTIONAL PREMIUM FEATURES (Future Ready)

Lyrics support (offline)

Waveform progress bar

Folder-based browsing

Theme packs

AMOLED true black mode

Backup playlist feature

🎯 USER EXPERIENCE VIBE

The app should feel like:

A luxury minimal music experience

Premium black glass UI

Smooth, modern, futuristic

No clutter

Clean and bold

Like a mix of:

Spotify minimal black

Apple Music smoothness

Neon glowing modern UI

📂 DELIVERABLES REQUIRED

Android APK

Source code

Clean folder architecture

Documentation

Play Store ready build

Proper release build configuration

🔑 SPECIAL INSTRUCTION

Design the entire app using:

ThemeManager
  - primaryAccentColor (dynamic)
  - darkBackground
  - cardBackground
  - typography

All UI components must depend on this central theme system.

Changing color must update entire UI instantly.