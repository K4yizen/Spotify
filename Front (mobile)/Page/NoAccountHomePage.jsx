import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NoAccHomePage() {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <Image
        style={styles.logo}
        source={require("../assets/spotifyLogo.jpeg")}
      />
      <Text style={styles.homeText}>{`Des millions de titres. \nGratuits sur SoundMe.`}</Text>
      <View style={styles.buttonArea}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.buttonText}>S'inscrire gratuitement</Text>
        </Pressable>
        <Pressable
          style={styles.buttonGoogle}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.buttonTextGoogle}>Continuer avec Google</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.buttonTextGoogle}>Se connecter</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { height: 200, top: 300, gap: 30 },
  logo: { aspectRatio: 1 / 1, height: 40, alignSelf: "center" },
  homeText: { textAlign: "center", fontSize: 22, fontWeight: "bold", color: "white" },
  buttonArea: { gap: 10 },
  button: { backgroundColor: "green", alignSelf: "center", width: 350, height: 50, borderRadius: 125 },
  buttonGoogle: { alignSelf: "center", width: 350, height: 50, borderRadius: 125, borderWidth: 1, borderColor: "grey" },
  buttonText: { fontSize: 14, fontWeight: "bold", textAlign: "center", top: 15 },
  buttonTextGoogle: { fontSize: 14, fontWeight: "bold", textAlign: "center", top: 15, color: "white" },
});
