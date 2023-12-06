import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function ProfilePage({ navigation }) {
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Image
          style={styles.profilePicture}
          source={require("../assets/pp.jpeg")}
        />
        <View style={styles.userInfo}>
          <View style={styles.usernameRow}>
            <Text style={styles.username}>kaiyzenn</Text>
          </View>
          <View style={styles.followRow}>
            <Text style={styles.followCount}>3</Text>
            <Text style={styles.profileText}>abonnés</Text>
            <Text style={styles.followCount}>1</Text>
            <Text style={styles.profileText}>Followed</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonArea}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("ModifyProfile")}
        >
          <Text style={styles.buttonText}>Modifier</Text>
        </Pressable>
        <Pressable>
          <Entypo name="share-alternative" size={20} color="grey" />
        </Pressable>
        <Pressable>
          <Entypo name="dots-three-horizontal" size={20} color="grey" />
        </Pressable>
      </View>

      <View style={styles.playlistSection}>
        <Text style={styles.playlistText}>Playlist</Text>
        <View style={styles.playlistItem}>
          <Image style={styles.playlistImage} />
          <Text>La découpe</Text>
          <Text>0 like</Text>
        </View>
        {/* Add more playlist items here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, flexDirection: "column" },
  header: { flexDirection: "row", alignItems: "center" },
  profilePicture: { width: 60, aspectRatio: 1 / 1, borderRadius: 30 },
  userInfo: { marginLeft: 10, flex: 1 },
  usernameRow: { flexDirection: "row", alignItems: "center" },
  username: { color: "white", fontSize: 20, fontWeight: "900" },
  followRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  followCount: { color: "white", marginRight: 5 },
  profileText: { color: "grey" },
  buttonArea: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
    gap: 10,
  },
  button: {
    width: 80,
    height: 25,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  buttonText: { color: "white", fontWeight: "600" },
  playlistSection: { marginTop: 20 },
  playlistItem: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  playlistImage: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  playlistText: { color: "white", fontSize: "18", fontWeight: "700" },
});
