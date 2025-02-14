import React, { useEffect, useState } from "react";
import { 
  View, Text, StyleSheet, Alert, ScrollView, 
  Image, TouchableOpacity, TextInput, Modal, Platform 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heart, Search } from "lucide-react-native";
import { Feather } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [chefs, setChefs] = useState([]);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    checkLoginStatus();
    fetchChefs();
  }, []);

  // Check if user is logged in
  const checkLoginStatus = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
    }
  };

  // Logout Function
  const handleLogout = async () => {
    setLogoutModalVisible(false);
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userId");
    Alert.alert("Logged Out", "You have been logged out successfully.");
    navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
  };

  // Fetch Chefs from Dummy Data
  const fetchChefs = async () => {
    try {
      const dummyData = {
        chefs: [
          { id: 1, name: "Chef John Doe", image_url: "https://via.placeholder.com/150", location: "Haslet, Texas", cuisine: "Asian food", rating: 4.3, price_per_night: "$200/night", favorite: true },
          { id: 2, name: "Chef Jane Smith", image_url: "https://via.placeholder.com/150", location: "Dallas, Texas", cuisine: "Korean food", rating: 4.2, price_per_night: "$300/night", favorite: false },
          { id: 3, name: "Chef Alan Brown", image_url: "https://via.placeholder.com/150", location: "Haslet, Texas", cuisine: "Pakistani food", rating: 5.0, price_per_night: "$300/night", favorite: false },
          { id: 4, name: "Chef Lisa Green", image_url: "https://via.placeholder.com/150", location: "New York, NY", cuisine: "Italian food", rating: 4.7, price_per_night: "$350/night", favorite: true },
          { id: 5, name: "Chef Michael White", image_url: "https://via.placeholder.com/150", location: "Los Angeles, CA", cuisine: "French food", rating: 4.8, price_per_night: "$400/night", favorite: false }
        ]
      };
      setChefs(dummyData.chefs);
    } catch (error) {
      console.error("Error fetching chefs:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
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

        {/* Chef List - FIXED SCROLLING for Web & Mobile */}
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={true}
          style={Platform.OS === "web" ? { height: "100vh", overflow: "scroll" } : { flex: 1 }}
        >
          {chefs.map((chef) => (
            <View key={chef.id} style={[styles.chefCard, { backgroundColor: chef.favorite ? 'green' : 'gray' }]}> 
              <Image source={{ uri: chef.image_url }} style={styles.chefImage} />
              <TouchableOpacity style={styles.heartIcon}>
                <Heart color={chef.favorite ? 'white' : 'black'} fill={chef.favorite ? 'red' : 'none'} />
              </TouchableOpacity>
              <Text style={styles.chefName}>{chef.name}</Text>
              <Text style={styles.chefText}>{chef.location}</Text>
              <Text style={styles.chefText}>{chef.cuisine}</Text>
              <Text style={styles.chefText}>⭐ {chef.rating}</Text>
              <Text style={styles.chefText}>{chef.price_per_night}</Text>
            </View>
          ))}
      

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Feather name="search" size={24} />
            <Text>Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Feather name="sliders" size={24} />
            <Text>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setLogoutModalVisible(true)}>
            <Feather name="log-out" size={24} color="red" />
            <Text style={{ color: "red" }}>Logout</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>

        {/* Logout Confirmation Modal */}
  <Modal animationType="fade" transparent={true} visible={logoutModalVisible}>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Logout</Text>
      <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>

      {/* Buttons */}
      <View style={styles.modalButtons}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => setLogoutModalVisible(false)}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={handleLogout}
        >
          <Text style={styles.confirmText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
        
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
  scrollContainer: { flexGrow: 1, paddingBottom: 220 },
  chefCard: { margin: 16, borderRadius: 12, padding: 16 },
  chefImage: { width: "100%", height: 150, borderRadius: 8 },
  chefName: { fontSize: 16, fontWeight: "bold", marginTop: 8, color: "white" },
  chefText: { color: "white", marginTop: 4 },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", padding: 16, borderTopWidth: 1, backgroundColor: "#fff" },
  navItem: { alignItems: "center" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Adds a dim background effect
  },
  modalContent: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // Adds a subtle shadow effect for Android
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalMessage: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ddd",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#ff4d4d",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HomeScreen;
