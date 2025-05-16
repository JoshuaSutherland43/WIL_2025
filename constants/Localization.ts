/**
 * Localization Constants for South African Users
 * Contains location data, unit preferences, and terminology for South African locale
 * 
 * TODO: Expand trail database with more South African locations
 * TODO: Add support for multiple languages (English, Afrikaans, Zulu)
 * TODO: Add more specific region data for different South African provinces
 * TODO: Consider integrating with local weather APIs for more accurate forecasts
 */

// TODO: Expand with more detailed horse trail locations across South Africa
// Location Data
export const SOUTH_AFRICAN_LOCATIONS = {
  // Notable horse trail locations in South Africa
  FEATURED_LOCATIONS: [
    'Sardinia Bay Horse Trails',
    'Cape Winelands',
    'Drakensberg Mountain Trails',
    'Wild Coast Horse Trails',
    'Noordhoek Beach',
  ],
  
  // Major cities/areas for reference
  MAJOR_CITIES: [
    'Port Elizabeth',
    'Cape Town',
    'Johannesburg',
    'Durban',
    'Pretoria',
    'Bloemfontein',
  ],
  
  // States/provinces
  PROVINCES: [
    'Eastern Cape',
    'Western Cape',
    'Northern Cape',
    'KwaZulu-Natal',
    'Free State',
    'North West',
    'Gauteng',
    'Mpumalanga',
    'Limpopo',
  ],
};

// Unit preferences
// TODO: Add support for user-configurable unit preferences while maintaining South African defaults
export const UNIT_PREFERENCES = {
  TEMPERATURE: 'Celsius', // South Africa uses Celsius
  DISTANCE: 'kilometers', // South Africa uses metric system
  ELEVATION: 'meters',
  SPEED: 'km/h',
};

// TODO: Expand trail database with actual GPS coordinates and more detailed information
// TODO: Include seasonal information for each trail (best time to visit)
// South African horse trails data
export const SOUTH_AFRICAN_TRAILS = [
  { 
    id: 'sa1', 
    name: 'Sardinia Bay Beach Trail', 
    length: '7.5 km', 
    difficulty: 'Moderate',
    elevation: '45m',
    terrain: 'Beach, coastal',
    rating: 4.9,
    location: 'Eastern Cape',
    image: 'https://via.placeholder.com/500x300?text=Sardinia+Bay+Beach+Trail',
    description: 'A beautiful coastal trail with stunning views of the Indian Ocean.'
  },
  { 
    id: 'sa2', 
    name: 'Hogsback Forest Trail', 
    length: '12 km', 
    difficulty: 'Challenging',
    elevation: '320m',
    terrain: 'Forest, mountain',
    rating: 4.7,
    location: 'Eastern Cape',
    image: 'https://via.placeholder.com/500x300?text=Hogsback+Forest+Trail',
    description: 'A magical forest trail through the mist-shrouded mountains of Hogsback.'
  },
  { 
    id: 'sa3', 
    name: 'Addo Elephant Park Perimeter', 
    length: '15 km', 
    difficulty: 'Moderate',
    elevation: '120m',
    terrain: 'Savanna, bush',
    rating: 4.8,
    location: 'Eastern Cape',
    image: 'https://via.placeholder.com/500x300?text=Addo+Elephant+Park',
    description: 'Ride along the perimeter of the famous Addo Elephant National Park.'
  },
  { 
    id: 'sa4', 
    name: 'Cape Winelands Trail', 
    length: '9 km', 
    difficulty: 'Easy',
    elevation: '85m',
    terrain: 'Vineyard, countryside',
    rating: 4.6,
    location: 'Western Cape',
    image: 'https://via.placeholder.com/500x300?text=Cape+Winelands+Trail',
    description: 'A gentle ride through scenic vineyards in the heart of the Winelands.'
  },
  { 
    id: 'sa5', 
    name: 'Storms River Trail', 
    length: '14 km', 
    difficulty: 'Challenging',
    elevation: '250m',
    terrain: 'Forest, river, gorge',
    rating: 4.9,
    location: 'Eastern Cape',
    image: 'https://via.placeholder.com/500x300?text=Storms+River+Trail',
    description: 'An adventurous trail through the Storms River gorge and indigenous forest.'
  },
];

// TODO: Add actual event details including contact information for organizers
// TODO: Include pricing information for South African events
// South African events
export const SOUTH_AFRICAN_EVENTS = [
  {
    id: 'sae1',
    title: 'Sardinia Bay Annual Ride',
    date: 'October 15, 2025',
    location: 'Sardinia Bay Horse Trails',
    participants: 45,
  },
  {
    id: 'sae2',
    title: 'Eastern Cape Trail Challenge',
    date: 'September 8, 2025',
    location: 'Hogsback',
    participants: 28,
  },
  {
    id: 'sae3',
    title: 'Beach Moonlight Ride',
    date: 'November 2, 2025',
    location: 'Sardinia Bay Beach',
    participants: 20,
  },
];

// TODO: Add South African horse breeds information
// TODO: Add local stable and rental information for tourists
// TODO: Add emergency contact numbers specific to South African equestrian activities
