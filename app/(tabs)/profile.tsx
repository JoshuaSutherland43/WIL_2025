import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {  // Dummy user data - Updated for South African user
  const user = {
    name: "Johan Pretorius",
    email: "johan.pretorius@example.com",
    joined: "January 1, 2023",
    location: "Port Elizabeth, Eastern Cape",
    bio: "Horse enthusiast and weekend trail rider. Love exploring the beautiful trails of South Africa, especially in the Eastern Cape region.",
    profileImage: "https://via.placeholder.com/150",
    stats: {
      favoriteTrails: 12,
      completedTrails: 28,
      totalDistance: "248 km",
      achievements: 7
    }
  };  // Dummy achievements - Updated with South African context
  const achievements = [
    { id: 1, name: "Eastern Cape Explorer", description: "Completed 5 different trails in Eastern Cape", icon: "ribbon-outline" },
    { id: 2, name: "Mountain Master", description: "Completed 3 hard difficulty trails", icon: "trophy-outline" },
    { id: 3, name: "Safari Rider", description: "Completed a trail near a wildlife reserve", icon: "sunny-outline" },
    { id: 4, name: "Weekend Warrior", description: "Rode trails on 5 consecutive weekends", icon: "calendar-outline" }
  ];
  // Dummy recent activities - Updated with South African trails
  const recentActivities = [
    { id: 1, trail: "Sardinia Bay Beach Trail", date: "May 10, 2025", distance: "7.5 km", time: "1h 15 min" },
    { id: 2, trail: "Hogsback Forest Trail", date: "May 3, 2025", distance: "12 km", time: "2h 45 min" }
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <ThemedText type="title" style={styles.name}>{user.name}</ThemedText>
            <ThemedText style={styles.location}>
              <Ionicons name="location" size={16} /> {user.location}
            </ThemedText>
            <ThemedText style={styles.bio}>{user.bio}</ThemedText>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{user.stats.completedTrails}</ThemedText>
            <ThemedText style={styles.statLabel}>Trails</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{user.stats.favoriteTrails}</ThemedText>
            <ThemedText style={styles.statLabel}>Favorites</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{user.stats.totalDistance}</ThemedText>
            <ThemedText style={styles.statLabel}>Distance</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{user.stats.achievements}</ThemedText>
            <ThemedText style={styles.statLabel}>Badges</ThemedText>
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Achievements</ThemedText>
            <TouchableOpacity>
              <ThemedText style={styles.seeAllText}>See All</ThemedText>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>            {achievements.map(achievement => (
                <View key={achievement.id} style={styles.achievementCard}>
                  <View style={styles.achievementIcon}>
                    {achievement.id === 1 && <Ionicons name="ribbon-outline" size={28} color="#0a7ea4" />}
                    {achievement.id === 2 && <Ionicons name="trophy-outline" size={28} color="#0a7ea4" />}
                    {achievement.id === 3 && <Ionicons name="sunny-outline" size={28} color="#0a7ea4" />}
                    {achievement.id === 4 && <Ionicons name="calendar-outline" size={28} color="#0a7ea4" />}
                  </View>
                  <ThemedText style={styles.achievementName}>{achievement.name}</ThemedText>
                  <ThemedText style={styles.achievementDesc}>{achievement.description}</ThemedText>
                </View>
              ))}
          </ScrollView>
        </View>

        {/* Recent Activities Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Recent Activities</ThemedText>
            <TouchableOpacity>
              <ThemedText style={styles.seeAllText}>See All</ThemedText>
            </TouchableOpacity>
          </View>
          
          {recentActivities.map(activity => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons name="trail-sign" size={24} color="#0a7ea4" />
              </View>
              <View style={styles.activityDetails}>
                <ThemedText style={styles.activityTrail}>{activity.trail}</ThemedText>
                <ThemedText style={styles.activityDate}>{activity.date}</ThemedText>
              </View>
              <View style={styles.activityStats}>
                <ThemedText style={styles.activityDistance}>{activity.distance}</ThemedText>
                <ThemedText style={styles.activityTime}>{activity.time}</ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Settings Options */}
        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingRow}>
            <Ionicons name="settings-outline" size={24} color="#666" />
            <ThemedText style={styles.settingText}>Settings</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Ionicons name="help-circle-outline" size={24} color="#666" />
            <ThemedText style={styles.settingText}>Help & Support</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Ionicons name="log-out-outline" size={24} color="#666" />
            <ThemedText style={styles.settingText}>Log Out</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e1e1e1',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0a7ea4',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  userInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    maxWidth: '80%',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    marginHorizontal: 16,
  },
  statCard: {
    alignItems: 'center',
    minWidth: 80,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  sectionContainer: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    color: '#0a7ea4',
    fontSize: 14,
  },
  achievementCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 150,
    alignItems: 'center',
  },
  achievementIcon: {
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  activityIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityDetails: {
    flex: 1,
    marginLeft: 16,
  },
  activityTrail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityDate: {
    fontSize: 14,
    color: '#666',
  },
  activityStats: {
    alignItems: 'flex-end',
  },
  activityDistance: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
  },
  settingsContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 40,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
});
