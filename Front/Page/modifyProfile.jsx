import React from "react";
import { View, StyleSheet, Text, Image, TextInput } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function ModifyProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Image
          style={styles.profilePicture}
          source={require("../assets/pp.jpeg")}
        />
        <View style={styles.iconContainer}>
          <Feather name="edit-2" size={24} color="black" style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            placeholder="kaiyzenn"
            placeholderTextColor="white"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    alignItems: "center",
  },
  profilePicture: {
    width: 125,
    height: 125,
    borderRadius: 65,
  },
  inputContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    top: "1%",
  },
  input: {
    width: 200,
    height: 40,
    marginLeft: 60,
    marginTop: 5,
    paddingHorizontal: 10,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
