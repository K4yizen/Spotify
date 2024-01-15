import { useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.inputText}>Adresse e-mail</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
        ></TextInput>
      </View>
      <View>
        <Text style={styles.inputText}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!isPasswordVisible}
        ></TextInput>
          <FontAwesome
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={24}
            color="white"
            style={styles.passwordToggleIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
      </View>
      <Pressable style={styles.button}><Text style={styles.buttonText}>Connexion</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flexDirection: "column", gap: "30" },
  input: {
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "grey",
    backgroundColor: "grey",
    padding: 10,
    top: 50,
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
  inputText: {
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 12,
    top: 45,
  },
  passwordToggleIcon : {alignSelf : "flex-end", right : 20, top : 15},
  button : { backgroundColor :"white", alignSelf :"center", width : 150, height : 45, borderRadius : 125, top : 30 },
  buttonText : {fontSize: 14, fontWeight : "bold" ,textAlign : "center", top : 15},


});
