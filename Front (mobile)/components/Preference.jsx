import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Preference({ navigation }) {
  const goToProfilePage = () => {
    navigation.navigate("ProfilePage"); // Navigate to the ProfilePage component
  };

  return (
    <View style={styles.main}>
      <Pressable style={styles.header} onPress={goToProfilePage}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profilePicture}
            source={require("../assets/pp.jpeg")}
          />
          <View style={styles.textContainer}>
            <Text style={styles.username}>kaiyzenn</Text>
            <Text style={styles.lightText}>Voir le profil</Text>
          </View>
        </View>
        <AntDesign name="right" size={24} color="grey" style={styles.icon} />
      </Pressable>
      <View style={styles.settings}>
        <Pressable style={styles.pressableCategory}>
          <Text style={styles.category}>Compte</Text>
          <AntDesign name="right" size={24} color="grey" style={styles.icon} />
        </Pressable>
        <Pressable style={styles.pressableCategory}>
          <Text style={styles.category}>Notifications</Text>
          <AntDesign name="right" size={24} color="grey" style={styles.icon} />
        </Pressable>
        <Pressable style={styles.pressableCategory}>
          <Text style={styles.category}>À propos</Text>
          <AntDesign name="right" size={24} color="grey" style={styles.icon} />
        </Pressable>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.disconnect}>Déconnexion</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, flexDirection: "column", padding: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: { width: 60, aspectRatio: 1 / 1, borderRadius: 30 },
  textContainer: { flexDirection: "column", justifyContent: "center", gap: 5 },
  username: { color: "white", fontSize: 16, fontWeight: "500" },
  lightText: { color: "grey" },
  category: { color: "white" },
  icon: { justifyContent: "flex-end" },
  pressableCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    top: "5%",
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    left: "30%",
    top: "50%",
  },
  disconnect: { color: "black", fontWeight: "700" },
});
