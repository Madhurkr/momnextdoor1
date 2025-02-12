import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heart, Search } from "lucide-react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    checkLoginStatus();
    fetchChefs();
  }, []);

  // Check if user is logged in
  const checkLoginStatus = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
    } else {
      setIsAuthenticated(true);
    }
  };

  // Fetch Chefs from Dummy Data
  const fetchChefs = async () => {
    try {
      const dummyData = {
        chefs: [
          {
            id: 1,
            name: "Chef John Doe",
            image_url: "https://via.placeholder.com/150",
            location: "Haslet, Texas",
            cuisine: "Asian food",
            rating: 4.3,
            price_per_night: "$200/night",
            favorite: true
          },
          {
            id: 2,
            name: "Chef Jane Smith",
            image_url: "https://via.placeholder.com/150",
            location: "Dallas, Texas",
            cuisine: "Korean food",
            rating: 4.2,
            price_per_night: "$300/night",
            favorite: false
          },
          {
            id: 3,
            name: "Chef Alan Brown",
            image_url: "https://via.placeholder.com/150",
            location: "Haslet, Texas",
            cuisine: "Pakistani food",
            rating: 5.0,
            price_per_night: "$300/night",
            favorite: false
          }
        ]
      };
      setChefs(dummyData.chefs);
    } catch (error) {
      console.error("Error fetching chefs:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}><Text style={styles.logoText}>Logo</Text></View>
          <Text style={styles.welcomeText}>Welcome Page</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Search size={20} color="#888" />
          <TextInput placeholder="Where | Check in | Check out | Guests" style={styles.searchInput} />
        </View>

        {/* Title */}
        <Text style={styles.title}>CHEFS</Text>

        {/* Chef Cards */}
        {chefs.map((chef) => (
          <View key={chef.id} style={[styles.chefCard, { backgroundColor: chef.favorite ? 'green' : 'gray' }]}> 
            <Image source={{ uri: chef.image_url }} style={styles.chefImage} />
            <TouchableOpacity style={styles.heartIcon}>
              <Heart color={chef.favorite ? 'white' : 'black'} fill={chef.favorite ? 'red' : 'none'} />
            </TouchableOpacity>
            <Text style={styles.chefText}>{chef.location}</Text>
            <Text style={styles.chefText}>{chef.cuisine}</Text>
            <Text style={styles.chefText}>⭐ {chef.rating}</Text>
            <Text style={styles.chefText}>{chef.price_per_night}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}><Feather name="search" size={24} /><Text>Explore</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Feather name="heart" size={24} /><Text>Wishlist</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Feather name="sliders" size={24} /><Text>Filters</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", padding: 16 },
  logo: { backgroundColor: "#4A90E2", padding: 20, borderRadius: 50 },
  logoText: { color: "white", fontSize: 18, fontWeight: "bold" },
  welcomeText: { fontSize: 16, marginTop: 10 },
  searchBar: { flexDirection: "row", alignItems: "center", marginHorizontal: 16, borderWidth: 1, borderRadius: 8, padding: 8 },
  searchInput: { flex: 1, marginLeft: 8 },
  title: { fontSize: 18, fontWeight: "bold", margin: 16 },
  chefCard: { margin: 16, borderRadius: 12, padding: 16 },
  chefImage: { width: "100%", height: 150, borderRadius: 8 },
  heartIcon: { position: "absolute", top: 10, right: 10 },
  chefText: { color: "white", marginTop: 8 },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", padding: 16, borderTopWidth: 1, backgroundColor: "#fff" },
  navItem: { alignItems: "center" },
});

export default HomeScreen;
