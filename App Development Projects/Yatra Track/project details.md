🟠 Project Name:

YatraTrack – Smart Pilgrimage Travel Management App

🎯 Project Goal

Build a modern Android travel management app for a pilgrimage tour company that:

Allows users (pilgrims) to share live location with the company

Allows admin to track every person

Allows all users to track bus locations

Prevents users from seeing each other’s locations

Works smoothly for elderly users

Has premium UI like a luxury travel company

Built with latest Android tech and easily publishable on Play Store

🏗️ TECH STACK REQUIREMENTS

Build with:

Frontend: React Native (Expo latest stable) OR Flutter (latest stable)

Backend: Node.js + Express

Database: MongoDB Atlas

Authentication: Firebase Auth (Phone OTP preferred for elderly users)

Maps & Location: Google Maps SDK + Google Location Services

Real-time tracking: Firebase Realtime Database or Socket.io

Push Notifications: Firebase Cloud Messaging (FCM)

Admin Panel: Web-based dashboard (Next.js or React + Tailwind)

Deployment-ready structure

Clean folder architecture

Must follow:

MVVM or clean architecture

Scalable structure

Environment variables handling

Proper error handling

Secure APIs

🎨 DESIGN SYSTEM (VERY IMPORTANT)
🎨 Primary Color:

Rich Orange (#FF6B00 or premium saffron tone)

🎨 Secondary:

Deep Navy (#1E2A38)

Light Cream background (#FFF7ED)

Soft Gray (#F5F5F5)

UI Style:

Premium travel company look

Rounded 16px cards

Soft shadows

Clean typography (Inter / Poppins)

Large buttons for elderly users

Accessible font sizes

Clear contrast

Icon-based navigation

UX Principles:

1-tap important actions

Simple onboarding

Minimal confusion

High readability for seniors

👤 USER APP FEATURES
🔐 Authentication

Phone number login (OTP based)

Emergency contact details

Profile completion required before joining trip

🧭 Home Dashboard

Welcome message

Current Trip Card

Bus number assigned

Bus status (Moving / Stopped)

Driver contact button

Emergency button

🚌 Live Bus Tracking (All Users Can See)

Map screen

Show 3–4 buses

Each bus has:

Bus Name (Bus 1, Bus 2, etc.)

Color-coded marker

Live speed

ETA to next stop

Only bus locations visible to users

Users CANNOT see other users’ locations

📍 User Location Sharing

Background location sharing enabled during trip

User grants permission

Live updates every 10–20 seconds

If location off → Admin gets alert

If battery low → Admin notified

🧳 Trips Section
Trips Screen Includes:

Upcoming Trips

Ongoing Trip

Past Trips

Trip Details Page:

Trip Name (e.g., Char Dham Yatra 2026)

Dates

Route

Bus Assignment

Important Contacts

Schedule timeline

Emergency numbers

Hotel details

👤 User Profile

Name

Age

Blood Group

Medical Notes

Emergency Contact

Bus Assigned

Trip History

Logout

🚨 Emergency Button

Big red emergency button:

Sends:

Live location

User details

Alert to admin dashboard

Optional: Call tour manager directly

🛠️ ADMIN PANEL (inside app)
🔑 Admin Login

Secure email/password login

Role-based access (Super Admin / Staff)

🗺️ Live Map Dashboard (Most Important)

Google Maps full screen

Show:

All users (small dots)

All buses (big icons)

Filters:

Filter by Bus

Filter by Trip
I
Search by Name

Click user → View:

Live location

Battery %

Last active time

Medical info

Call button

🚌 Bus Management

Add bus

Assign driver

Assign passengers

Enable bus tracking device

👥 User Management

Add / Edit pilgrims

Assign to trip

Assign to bus

Remove

View live tracking history

🧳 Trip Management

Create new trip

Add dates

Add route

Add bus allocation

Upload documents

Upload itinerary PDF

📊 Analytics Dashboard

Total pilgrims

Active trips

Live tracking count

Alerts triggered

Location offline alerts

🚨 Alerts Section

---

🏁 **Project Plan & Milestones**

1. **Phase 1 – Initialization**
   - Finalize tech stack decisions (done).
   - Scaffold repository structure (backend, mobile, admin).
   - Create initial README and basic package setups.

2. **Phase 2 – Core Backend APIs**
   - Authentication (Firebase OTP + JWT middleware).
   - User, trip, bus schemas and CRUD endpoints.
   - Real-time tracking endpoints (socket or Firebase).
   - Alert generation logic (location off, battery low, emergency).

3. **Phase 3 – Mobile MVP**
   - OTP login flow and profile completion.
   - Home dashboard with trip card and emergency button.
   - Background location sharing integration.
   - Map view displaying bus markers and live speed/ETA.

4. **Phase 4 – Admin Web Dashboard**
   - Secure login and role-based access.
   - Live map showing all users and buses with filters.
   - Bus/trip/user management interfaces.
   - Alerts and analytics panels.

5. **Phase 5 – Polish & Release Prep**
   - UI/UX refinements using design system.
   - Performance optimizations and battery considerations.
   - Play Store and web deployment configurations.
   - Documentation and deployment guides.

6. **Phase 6 – Future Enhancements**
   - Multi-tenant support for multiple companies.
   - Additional premium features (voice, gallery, offline).
   - SaaS subscription model readiness.

This document will serve as the single source of truth throughout development.

User out of radius alert

User location disabled alert

Emergency triggered alert

Bus stopped unusually long

🔒 SECURITY & PRIVACY RULES

Very important:

Users can only:

See their own profile

See bus locations

Users CANNOT:

See other users

See admin dashboard

Admin can see everything

Secure JWT authentication

Encrypted API routes

GDPR-style location consent popup

📱 EXTRA FEATURES (Premium Feel)

Trip countdown timer

Daily darshan notification

Voice announcement option

Photo gallery upload by admin

Trip memories section

WhatsApp quick contact button

Offline mode fallback

⚙️ PERFORMANCE REQUIREMENTS

Optimized for low-end Android phones

Minimal battery drain

Efficient background tracking

Location accuracy balance

📦 PLAY STORE READY REQUIREMENTS

Proper app name

App icon (Orange + Bus icon)

Splash screen

Privacy policy page

Location usage explanation

Background location disclosure

🧠 FUTURE SCALABILITY (Optional Mention)

Structure backend in a way that:

Multiple travel companies can use same platform

Multi-tenant architecture ready

Subscription-ready SaaS model

📂 DELIVERABLES REQUIRED

Android APK

Admin web panel

Backend deployed

Complete documentation

Clean commented code

Deployment guide

🎯 EXPERIENCE FEEL

The app should feel like:

A premium pilgrimage management system

Professional travel company

Safe and trustworthy

Simple for elderly

Advanced for admin

🟠 FINAL IMPORTANT LOGIC

3–4 buses per trip

All users see buses

Admin sees:

All buses

All users

Users DO NOT see each other

Real-time tracking mandatory

Emergency alerts system