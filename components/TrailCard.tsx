/**
 * TrailCard Component
 * Displays information about a trail in a card format
 * Enhanced to support South African trail information
 * 
 * TODO: Add support for South African trail permit requirements
 * TODO: Show seasonal information relevant to South African climate
 * TODO: Add integration with local South African trail rating systems
 * TODO: Include conservation status for trails in protected areas
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export interface Trail {
  id: string;
  name: string;
  length: string;
  difficulty: string;
  image?: string;
  elevation?: string;
  rating?: number;
  terrain?: string;
  location?: string; // Added location field for South African trails
  description?: string; // Added description field
  // TODO: Add fields for seasonality, permit requirements, and facilities
  // TODO: Add field for trail conservation status
}

interface TrailCardProps {
  trail: Trail;
  onPress?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export default function TrailCard({ trail, onPress, onFavorite, isFavorite = false }: TrailCardProps) {
  // Helper to render difficulty indicator with appropriate color
  const renderDifficulty = () => {
    const color = 
      trail.difficulty === 'Easy' ? '#4CAF50' : 
      trail.difficulty === 'Moderate' ? '#FF9800' : 
      '#F44336';
      
    return (
      <View style={[styles.difficultyBadge, { backgroundColor: color }]}>
        <ThemedText style={styles.difficultyText}>{trail.difficulty}</ThemedText>
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer} activeOpacity={0.8}>
      <ThemedView style={styles.card}>
        <View style={styles.imageContainer}>
          {trail.image && (
            <Image 
              source={{ uri: trail.image }} 
              style={styles.image}
              contentFit="cover"
              transition={300}
            />
          )}
          {renderDifficulty()}
          {onFavorite && (
            <TouchableOpacity style={styles.favoriteButton} onPress={onFavorite}>
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={22} 
                color={isFavorite ? "#ff375f" : "#fff"} 
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.infoContainer}>
          <ThemedText type="subtitle" style={styles.name}>{trail.name}</ThemedText>
          
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Ionicons name="trail-sign-outline" size={16} color="#666" />
              <ThemedText style={styles.detail}>{trail.length}</ThemedText>
            </View>
            
            {trail.elevation && (
              <View style={styles.detailItem}>
                <Ionicons name="trending-up-outline" size={16} color="#666" />
                <ThemedText style={styles.detail}>{trail.elevation}</ThemedText>
              </View>
            )}
          </View>
          
          {trail.terrain && (
            <View style={styles.detailItem}>
              <Ionicons name="leaf-outline" size={16} color="#666" />
              <ThemedText style={styles.detail}>{trail.terrain}</ThemedText>
            </View>
          )}
          
          {/* Added location display for South African trails */}
          {trail.location && (
            <View style={styles.detailItem}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <ThemedText style={styles.detail}>{trail.location}</ThemedText>
            </View>
          )}
          
          {trail.rating && (
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(i => (
                <Ionicons 
                  key={i}
                  name={i <= trail.rating! ? "star" : "star-outline"} 
                  size={18} 
                  color="#FFD700" 
                />
              ))}
            </View>
          )}
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '48%', 
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4,
    elevation: 5,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
  },
  difficultyBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 20,
  },
  infoContainer: {
    padding: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    marginLeft: 4,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
});
