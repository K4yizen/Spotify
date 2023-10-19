import React, { useState } from "react";
import NoAccountHome from "./components/NoAccountHomePage";
import Home from "./components/Home";
import Search from "./components/Search";
import Library from "./components/Library";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import ProfilePage from "./components/profilePage";
import Register from "./components/Register";

// Create the bottom tab navigator and stack navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  // State to track user login status
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  return (
    <NavigationContainer theme={DarkTheme}>
      {isUserLoggedIn ? (
        <Tab.Navigator screenOptions={{}}>
          {/* Authenticated screens */}
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: () => (
                <Ionicons name="home-outline" size={24} color="white" />
              ),
              header: () => (
                <View
                  style={{
                    height: 100,
                    flexDirection: "row",
                    top: 60,
                    justifyContent: "space-between",
                    marginRight: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 23,
                      fontWeight: "bold",
                      marginLeft: 20,
                      color: "white",
                    }}
                  >
                    Bonjour
                  </Text>
                  <View style={{ flexDirection: "row", gap: 20 }}>
                    <Feather name="bell" size={30} color="white" />
                    <Ionicons
                      name="md-settings-outline"
                      size={30}
                      color="white"
                    />
                  </View>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              tabBarIcon: () => (
                <Feather name="search" size={24} color="white" />
              ),
              header: () => (
                <View
                  style={{
                    height: 25,
                    flexDirection: "row",
                    top: 60,
                    justifyContent: "space-between",
                    marginRight: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 23,
                      fontWeight: "bold",
                      marginLeft: 20,
                      color: "white",
                    }}
                  >
                    Rechercher
                  </Text>
                  <View style={{ flexDirection: "row", gap: 20 }}>
                    <Ionicons
                      name="ios-camera-outline"
                      size={24}
                      color="white"
                    />
                  </View>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Librairie"
            component={Library}
            options={{
              tabBarIcon: () => (
                <MaterialIcons
                  name="my-library-music"
                  size={24}
                  color="white"
                />
              ),
              header: () => (
                <View
                  style={{
                    height: 25,
                    flexDirection: "column",
                    top: 60,
                    alignItems: "center",
                    marginRight: 20,
                    gap: 15,
                  }}
                >
                  <View style={styles.mainHeader}>
                    <Image
                      style={styles.profilePicture}
                      source={require("./assets/pp.jpeg")}
                    />
                    <Text
                      style={{
                        fontSize: 23,
                        fontWeight: "bold",
                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      Bibliothèque
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        gap: 20,
                        marginLeft: 100,
                      }}
                    >
                      <Feather name="search" size={24} color="white" />
                      <Feather name="plus" size={24} color="white" />
                    </View>
                  </View>

                  <View style={styles.buttonHeader}>
                    <Pressable style={styles.button}>
                      <Text style={{ color: "white" }}>Playlists</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                      <Text style={{ color: "white" }}>Téléchargé</Text>
                    </Pressable>
                  </View>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Accueil"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
              <Stack.Screen
            name="Register"
            component={Register}
            options={{
              tabBarIcon: () => (
                <Ionicons name="home-outline" size={24} color="white" />
              ),
              header: () => (
                <View
                  style={{
                    height: 100,
                    flexDirection: "row",
                    top: 60,
                    justifyContent: "space-between",
                    marginRight: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 23,
                      fontWeight: "bold",
                      marginLeft: 20,
                      color: "white",
                    }}
                  >
                    Bonjour
                  </Text>
                  <View style={{ flexDirection: "row", gap: 20 }}>
                    <Feather name="bell" size={30} color="white" />
                    <Ionicons
                      name="md-settings-outline"
                      size={30}
                      color="white"
                    />
                  </View>
                </View>
              ),
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicture: { aspectRatio: 1 / 1, width: 30, borderRadius: 15 },
  button: {
    width: 100,
    height: 30,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#404040",
    marginLeft: "3%",
  },
  mainHeader: { flexDirection: "row" },
  buttonHeader: { flexDirection: "row", gap: 8, marginRight: 130 },
});
