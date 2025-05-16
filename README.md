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

# Unfinished Features


## API & Backend Integration
- Replace localhost URL with actual production API endpoint before deployment
- Add endpoints for refreshing tokens
- Add endpoints for user profile management
- Implement request caching for offline use in remote areas
- Add request queuing system for poor connectivity areas
- Implement proper error handling and retry logic

## Authentication
- Replace placeholder values with actual Google OAuth credentials
- Implement token refresh mechanisms
- Add offline authentication capabilities
- Implement robust error handling for auth flows
- Add proper input validation for auth forms
- Integrate proper Google OAuth flow
- Implement token expiration checking
- Add secure storage for credentials
- Implement biometric authentication options for South African users

## Configuration & Environment
- Consider using environment variables for different environments (dev/staging/prod)
- Add keys for storing user preferences and app settings

## South African Localization
- Expand trail database with more South African locations
- Add support for multiple South African languages
- Add more regional data (provinces, cities)
- Integrate with South African weather APIs
- Implement comprehensive unit conversions
- Add support for South African date formats and phone numbers
- Include horse-specific measurements

## UI/UX & Features
- Add South African trail permit requirements
- Include seasonal information for trails
- Implement local rating systems
- Add conservation status details for trails
- Create dynamic trail recommendations based on user location
- Use actual trail images instead of placeholders
- Improve navigation flow after removing explore tab
- Consider South African-specific tabs
- Implement deep linking
- Add error boundaries for crash handling
- Implement offline support for remote areas
- Add accessibility features for all users
- Add analytics for South African usage patterns
