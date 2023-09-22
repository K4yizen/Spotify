import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import SearchGrid from "./SearchGrid";

const TextInputExample = () => {
  const [search, onChangeSearch] = React.useState("");

  return (
    <SafeAreaView>
      <View style={styles.inputBox}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeSearch}
        value={search}
        placeholder="Que souhaitez-vous écouter ?"
        placeholderTextColor="black" 
        keyboardType="numeric"
      />
       <Feather name="search" style={styles.searchIcon} size={24} color="black" />
      </View>
      <Text style={styles.text}>Parcourir tout</Text>
      <SearchGrid/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "white",
    backgroundColor: "white",
    padding: 10,
    paddingLeft : 50,
    top : 50,
    fontSize : 13,
    fontWeight:"bold"
  },
  grid: {
    height: 40,
  },
  text:{color : "white", fontSize : 15, fontWeight : "bold", marginLeft : 10, top : 60},
  inputBox : {},
  searchIcon : {position : "absolute", top : 70, left : 30}

});

export default TextInputExample;

