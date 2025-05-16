/**
 * Home Screen
 * Main landing screen for authenticated users
 * Displays featured horse trails, recommended routes, and recent activities
 * Localized for South African users
 * 
 * TODO: Implement dynamic trail recommendations based on user location in South Africa
 * TODO: Add actual South African trail images instead of placeholders
 * TODO: Connect with local South African weather API for accurate forecasts
 * TODO: Add seasonal trail recommendations based on South African climate
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import TrailCard from '@/components/TrailCard';
import { SOUTH_AFRICAN_TRAILS, SOUTH_AFRICAN_EVENTS } from '@/constants/Localization';

export default function HomeScreen() {
  const { user } = useAuth();
  
  // Using South African trails data
  // TODO: Implement filtering based on user preferences and location
  const featuredTrails = SOUTH_AFRICAN_TRAILS.slice(0, 3);
  
  // Using South African events
  // TODO: Implement date sorting and filtering for upcoming events
  const upcomingEvents = SOUTH_AFRICAN_EVENTS;
  
  // Weather data (Using Celsius for South African users)
  // TODO: Connect to South African weather service API
  const weatherData = {
    condition: 'Sunny',
    temperature: '22°C',
    wind: '8 km/h',
    icon: 'sunny-outline'
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Header */}
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.greeting}>Welcome back,</ThemedText>
            <ThemedText type="title" style={styles.userName}>{user?.firstName || 'Rider'}</ThemedText>
          </View>
          <View style={styles.weatherCard}>
            <Ionicons name={weatherData.icon as any} size={24} color="#0a7ea4" />
            <ThemedText style={styles.temperature}>{weatherData.temperature}</ThemedText>
            <ThemedText style={styles.weatherCondition}>{weatherData.condition}</ThemedText>
          </View>
        </View>
        
        {/* Today's Recommendation - Updated for South Africa */}
        <View style={styles.recommendationContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/800x400?text=Sardinia+Bay+Horse+Trail' }} 
            style={styles.recommendationImage}
          />
          <View style={styles.recommendationOverlay}>
            <ThemedText style={styles.perfectDay}>Perfect day for riding!</ThemedText>
            <ThemedText style={styles.recommendationText}>We recommend Sardinia Bay Beach Trail today</ThemedText>
            <TouchableOpacity style={styles.viewTrailButton}>
              <ThemedText style={styles.viewTrailText}>View Trail</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Featured Trails - South African trails */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Featured Trails</ThemedText>
            <TouchableOpacity>
              <ThemedText style={styles.seeAllText}>See All</ThemedText>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContainer}
          >
            {featuredTrails.map(trail => (
              <View key={trail.id} style={styles.featuredCard}>
                <TrailCard trail={trail} />
              </View>
            ))}
          </ScrollView>
        </View>
        
        {/* Upcoming Events - South African events */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Upcoming Events</ThemedText>
            <TouchableOpacity>
              <ThemedText style={styles.seeAllText}>See All</ThemedText>
            </TouchableOpacity>
          </View>
          
          {upcomingEvents.map(event => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <View style={styles.eventDateContainer}>
                <ThemedText style={styles.eventMonth}>
                  {new Date(event.date).toLocaleString('default', { month: 'short' })}
                </ThemedText>
                <ThemedText style={styles.eventDay}>
                  {new Date(event.date).getDate()}
                </ThemedText>
              </View>
              
              <View style={styles.eventDetails}>
                <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
                <View style={styles.eventLocation}>
                  <Ionicons name="location-outline" size={16} color="#666" />
                  <ThemedText style={styles.eventLocationText}>{event.location}</ThemedText>
                </View>
              </View>
              
              <View style={styles.eventParticipants}>
                <View style={styles.participantsBadge}>
                  <ThemedText style={styles.participantsText}>{event.participants}</ThemedText>
                </View>
                <ThemedText style={styles.participantsLabel}>Riders</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="search-outline" size={24} color="#0a7ea4" />
            </View>
            <ThemedText style={styles.quickActionText}>Find Trails</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="calendar-outline" size={24} color="#0a7ea4" />
            </View>
            <ThemedText style={styles.quickActionText}>Plan Ride</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="people-outline" size={24} color="#0a7ea4" />
            </View>
            <ThemedText style={styles.quickActionText}>Find Riders</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  weatherCard: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  temperature: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  weatherCondition: {
    fontSize: 12,
    color: '#666',
  },
  recommendationContainer: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
  },
  recommendationImage: {
    width: '100%',
    height: '100%',
  },
  recommendationOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  perfectDay: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  recommendationText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 12,
  },
  viewTrailButton: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  viewTrailText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#0a7ea4',
    fontSize: 14,
    fontWeight: '500',
  },
  featuredContainer: {
    paddingRight: 16,
  },
  featuredCard: {
    width: 280,
    marginRight: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  eventDateContainer: {
    width: 50,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventMonth: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  eventDay: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  eventDetails: {
    flex: 1,
    marginLeft: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  eventParticipants: {
    alignItems: 'center',
  },
  participantsBadge: {
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  participantsText: {
    color: '#0a7ea4',
    fontWeight: 'bold',
  },
  participantsLabel: {
    fontSize: 12,
    color: '#666',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  quickActionButton: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    color: '#333',
  },
});
