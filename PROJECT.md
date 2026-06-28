# Drift — Project Specification

## Product Vision

Drift is a mobile social app where users send short anonymous messages into the world. Another user can receive the message, choose to keep it, and start a chat — or pass it forward.

The goal is to create meaningful, low-pressure conversations with strangers without copying Bottled directly.

## MVP Goal

Build a working MVP where users can:

1. Sign up / log in
2. Create a basic profile
3. Send a Drift message
4. Receive a random Drift
5. Keep or pass the Drift
6. Chat in real time after keeping a Drift

## Tech Stack

* React Native
* Expo
* TypeScript
* Supabase
* Supabase Auth
* Supabase Realtime
* Supabase Postgres

## Core Screens

1. LoginScreen
2. ProfileSetupScreen
3. HomeScreen
4. SendDriftScreen
5. IncomingDriftScreen
6. ChatListScreen
7. ChatScreen
8. ProfileScreen

## Core Database Tables

### profiles

Stores user profile information.

Fields:

* id
* display_name
* age
* country
* bio
* created_at

### drifts

Stores anonymous messages sent by users.

Fields:

* id
* sender_id
* content
* status
* current_receiver_id
* created_at

Allowed status values:

* floating
* delivered
* kept
* passed
* expired

### matches

Stores accepted Drift connections.

Fields:

* id
* drift_id
* user_one
* user_two
* created_at

### messages

Stores chat messages.

Fields:

* id
* match_id
* sender_id
* content
* created_at

### reports

Stores safety reports.

Fields:

* id
* reporter_id
* reported_user_id
* drift_id
* match_id
* reason
* created_at

## MVP Rules

* A user must have a profile before using the app.
* A user can send a Drift with text only.
* A Drift should not be delivered back to its sender.
* If a receiver keeps a Drift, a match is created.
* If a receiver passes a Drift, it becomes available again.
* Chat is only available after a match is created.
* Users should be able to log out.

## Coding Standards

* Use TypeScript.
* Avoid `any`.
* Keep components small.
* Put Supabase logic inside service files.
* Keep screens focused on UI.
* Use clear naming.
* Make sure the app compiles after every major change.

## Folder Structure

src/
components/
screens/
navigation/
services/
hooks/
types/
constants/
lib/

## First Milestone

Complete the following:

1. App runs in Expo
2. Supabase client is configured
3. User can sign up
4. User can log in
5. User can create a profile
6. User can send a Drift
7. Drift is saved in Supabase

## Second Milestone

Complete:

1. User can receive a random Drift
2. User can keep or pass the Drift
3. Match is created when kept
4. Users can chat in real time

## Future Features

Not for MVP:

* Voice Drifts
* Image Drifts
* Push notifications
* AI conversation starters
* Mood-based matching
* Interest filters
* Premium features
* Admin dashboard
* Moderation queue
