import Home from "./components/Home";
import Search from "./components/Search";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";
import Library from "./components/Library";
// import audioPlayer from "./components/audioPlayer"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator screenOptions={{}}>
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
        {/* <Tab.Screen name="Écouter" component={Nav} options={{
        tabBarIcon : () => (<Feather name="music" size={24} color="black" />)
      }} /> */}
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: () => <Feather name="search" size={24} color="white" />,
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
                  <Ionicons name="ios-camera-outline" size={24} color="white" />
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
              <MaterialIcons name="my-library-music" size={24} color="white" />
            ),
            header: () => (
              <View
                style={{
                  height: 25,
                  flexDirection: "column",
                  top: 60,
                  alignItems : "center",
                  marginRight: 20,
                  gap : 15
  
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
                    marginLeft : 10
                  }}
                >
                  Bibliothèque
                </Text>

                <View style={{ flexDirection: "row", gap: 20, marginLeft : 100 }}>
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
  profilePicture: { aspectRatio: 1 / 1, width: 30, borderRadius: 15,},
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
  // buttonPodcast: {
  //   width: 150,
  //   height: 30,
  //   borderWidth: 2,
  //   borderColor: "black",
  //   borderRadius: 15,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#404040",
  // },
  mainHeader :{flexDirection : "row",  },
  buttonHeader: { flexDirection: "row", gap: 8, marginRight : 130, },
});
