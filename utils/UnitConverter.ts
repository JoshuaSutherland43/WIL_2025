/**
 * UnitConverter.ts
 * Utility functions for converting between different units
 * Primarily for supporting South African localization
 * 
 * TODO: Add more comprehensive unit conversion functions
 * TODO: Support user preferences for unit display
 * TODO: Add currency conversion for South African Rand
 */

// Temperature conversion
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return Math.round((fahrenheit - 32) * 5 / 9);
};

export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round(celsius * 9 / 5 + 32);
};

// Distance conversion
export const milesToKilometers = (miles: number): number => {
  return Math.round(miles * 1.60934 * 10) / 10;
};

export const kilometersToMiles = (kilometers: number): number => {
  return Math.round(kilometers / 1.60934 * 10) / 10;
};

// TODO: Add yards to meters conversion for horse jumping measurements
// TODO: Add hands to meters conversion for horse height measurements

// Elevation conversion
export const feetToMeters = (feet: number): number => {
  return Math.round(feet * 0.3048);
};

export const metersToFeet = (meters: number): number => {
  return Math.round(meters / 0.3048);
};

// Format temperature string with proper unit
export const formatTemperature = (value: number, unit: 'C' | 'F'): string => {
  return `${value}°${unit}`;
};

// Format distance string with proper unit
export const formatDistance = (value: number, unit: 'km' | 'mi'): string => {
  return `${value} ${unit}`;
};

// TODO: Add formatting functions for South African date formats (dd/mm/yyyy)
// TODO: Add formatting for South African phone numbers

// Parse distance string and extract numeric value
export const parseDistanceValue = (distanceString: string): number | null => {
  const match = distanceString.match(/(\d+(\.\d+)?)/);
  if (match) {
    return parseFloat(match[0]);
  }
  return null;
};

// Convert a distance string from one unit to another
export const convertDistanceString = (
  distanceString: string, 
  fromUnit: 'km' | 'mi', 
  toUnit: 'km' | 'mi'
): string => {
  const value = parseDistanceValue(distanceString);
  if (value === null) return distanceString;
  
  if (fromUnit === 'mi' && toUnit === 'km') {
    return `${milesToKilometers(value)} km`;
  } else if (fromUnit === 'km' && toUnit === 'mi') {
    return `${kilometersToMiles(value)} mi`;
  }
  
  return distanceString;
};

// TODO: Add conversion for horse speed measurements (hands/height)
// TODO: Add functions for calculating pace and trail difficulty based on elevation changes
// TODO: Add South African-specific weather condition descriptions
