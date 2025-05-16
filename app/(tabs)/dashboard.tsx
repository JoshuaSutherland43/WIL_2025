import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TrailCard from '@/components/TrailCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SOUTH_AFRICAN_TRAILS } from '@/constants/Localization';

export default function DashboardScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Using South African trails
  const trails = SOUTH_AFRICAN_TRAILS;

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  // Filter trails based on search query
  const filteredTrails = trails.filter(trail => 
    trail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trail.difficulty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trail.terrain?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trail.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Featured trail (first one with highest rating)
  const featuredTrail = [...trails].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedText type="title" style={styles.title}>South African Horse Trails</ThemedText>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search trails..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <Ionicons 
              name="close-circle" 
              size={20} 
              color="#666" 
              style={styles.clearIcon}
              onPress={() => setSearchQuery('')}
            />
          )}
        </View>
        
        {/* Featured Trail */}
        {!searchQuery && (
          <>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Featured Trail
            </ThemedText>
            <View style={styles.featuredContainer}>
              <TrailCard 
                trail={featuredTrail} 
                isFavorite={favorites.includes(featuredTrail.id)}
                onFavorite={() => toggleFavorite(featuredTrail.id)}
              />
            </View>
          </>
        )}
        
        {/* Filter Pills */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          <View style={[styles.filterPill, styles.activeFilter]}>
            <ThemedText style={styles.activeFilterText}>All</ThemedText>
          </View>
          <View style={styles.filterPill}>
            <ThemedText style={styles.filterText}>Easy</ThemedText>
          </View>
          <View style={styles.filterPill}>
            <ThemedText style={styles.filterText}>Moderate</ThemedText>
          </View>
          <View style={styles.filterPill}>
            <ThemedText style={styles.filterText}>Hard</ThemedText>
          </View>          <View style={styles.filterPill}>
            <ThemedText style={styles.filterText}>Short (&lt;5km)</ThemedText>
          </View>
        </ScrollView>
        
        {/* Trail Cards */}
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          {searchQuery ? "Search Results" : "All Trails"}
        </ThemedText>
        <View style={styles.cardsContainer}>
          {filteredTrails.map((trail) => (
            <TrailCard 
              key={trail.id} 
              trail={trail} 
              isFavorite={favorites.includes(trail.id)}
              onFavorite={() => toggleFavorite(trail.id)}
            />
          ))}
        </View>
        
        {filteredTrails.length === 0 && (
          <View style={styles.noResults}>
            <Ionicons name="search" size={50} color="#ccc" />
            <ThemedText style={styles.noResultsText}>No trails found</ThemedText>
          </View>
        )}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 20,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearIcon: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 12,
    marginLeft: 4,
  },
  featuredContainer: {
    marginBottom: 20,
    width: '100%',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingHorizontal: 4,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#0a7ea4',
  },
  filterText: {
    color: '#555',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    color: '#999',
    marginTop: 12,
  },
});
