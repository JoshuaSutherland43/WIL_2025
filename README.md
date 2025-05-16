# Sardinia Bay Horse App

A React Native mobile application for horse trail enthusiasts in South Africa. Built with Expo and React Native, this application showcases South African horse trails with a focus on the Eastern Cape region.

## Features

- Authentication with ASP.NET 8 Web API backend
- South African localization (Celsius, kilometers, local trails)
- Interactive trail maps
- User profiles and activity tracking
- Event scheduling

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Development

This project uses Expo Router for file-based routing. The main sections include:

- Authentication screens in `/app/auth`
- Main app tabs in `/app/(tabs)`
- Localization constants in `/constants/Localization.ts`

## South African Localization

The app has been localized for South African users with:
- Temperature displayed in Celsius
- Distances in kilometers
- Local South African horse trails and locations
- South African event listings

## Authentication

Authentication is handled through an ASP.NET 8 Web API backend, with features including:
- Login/Register
- Two-factor authentication
- Password reset
- Google sign-in
