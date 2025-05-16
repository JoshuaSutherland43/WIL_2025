import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SOUTH_AFRICAN_TRAILS } from '@/constants/Localization';

// Placeholder for the actual map component
const MapPlaceholder = () => (
  <View style={styles.mapPlaceholder}>
    <ThemedText style={styles.mapText}>South Africa Map</ThemedText>
    <View style={styles.mapOverlay}>
      {/* South African map markers */}
      <View style={[styles.mapMarker, { top: '60%', left: '70%' }]}>
        <View style={styles.markerDot} />
      </View>
      <View style={[styles.mapMarker, { top: '65%', left: '30%' }]}>
        <View style={styles.markerDot} />
      </View>
      <View style={[styles.mapMarker, { top: '40%', left: '55%' }]}>
        <View style={styles.markerDot} />
      </View>
      <View style={[styles.mapMarker, { top: '20%', left: '65%' }]}>
        <View style={styles.markerDot} />
      </View>
      {/* Path simulation */}
      <View style={styles.pathLine} />
    </View>
  </View>
);

export default function MapsScreen() {
  const [selectedTrailId, setSelectedTrailId] = useState<string | null>(null);
  
  // Using South African trails from localization
  const trails = SOUTH_AFRICAN_TRAILS;

  return (
    <ThemedView style={styles.container}>
      {/* Map search and tools header */}
      <View style={styles.mapHeader}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <ThemedText style={styles.searchText}>Find a trail in South Africa...</ThemedText>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color="#0a7ea4" />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapPlaceholder />

      {/* Map Legend */}
      <View style={styles.legendContainer}>
        <ThemedText style={styles.legendTitle}>Legend</ThemedText>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
          <ThemedText style={styles.legendText}>Easy Trails</ThemedText>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: '#FF9800' }]} />
          <ThemedText style={styles.legendText}>Moderate Trails</ThemedText>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
          <ThemedText style={styles.legendText}>Hard Trails</ThemedText>
        </View>
      </View>

      {/* Trail List - Updated with South African trails */}
      <View style={styles.trailListContainer}>
        <ThemedText style={styles.trailListTitle}>Popular South African Trails</ThemedText>
        
        {trails.map(trail => (
          <TouchableOpacity 
            key={trail.id} 
            style={[
              styles.trailItem,
              selectedTrailId === trail.id && styles.selectedTrail
            ]}
            onPress={() => setSelectedTrailId(trail.id)}
          >
            <View style={styles.trailItemContent}>
              <View>
                <ThemedText style={styles.trailName}>{trail.name}</ThemedText>
                <ThemedText style={styles.trailMeta}>
                  {trail.length} • {trail.difficulty} • {trail.location || 'South Africa'}
                </ThemedText>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color="#0a7ea4" 
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Bottom toolbar */}
      <View style={styles.mapToolbar}>
        <TouchableOpacity style={styles.toolbarButton}>
          <Ionicons name="locate-outline" size={24} color="#0a7ea4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton}>
          <Ionicons name="trail-sign-outline" size={24} color="#0a7ea4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton}>
          <Ionicons name="heart-outline" size={24} color="#0a7ea4" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
  },
  searchText: {
    marginLeft: 8,
    color: '#999',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholder: {
    height: 250,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapMarker: {
    position: 'absolute',
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(10, 126, 164, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0a7ea4',
  },
  pathLine: {
    position: 'absolute',
    top: '45%',
    left: '30%',
    width: '40%',
    height: 3,
    backgroundColor: '#0a7ea4',
    borderRadius: 2,
  },
  legendContainer: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
  },
  trailListContainer: {
    flex: 1,
  },
  trailListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  trailItem: {
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    borderColor: '#eee',
    borderWidth: 1,
  },
  selectedTrail: {
    borderColor: '#0a7ea4',
    borderWidth: 2,
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
  },
  trailItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trailName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trailMeta: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  mapToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 30,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toolbarButton: {
    padding: 10,
  }
});
