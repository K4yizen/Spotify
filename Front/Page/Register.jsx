import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";

export default function Register() {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const formData = [
    {
      label : "Quelle est votre pseudo ?",
      minLength : 3,
      field : "username",
    },
    {
      label: "Quel est votre prénom ?",
      minLength: 3,
      field: "firstname",
    },
    {
      label : "Quelle est votre nom ?",
      minLength :3,
      field : "lastname"
    },
    {
      label: "Quelle est votre adresse e-mail ?",
      field: "email",
      validator: (value) => {
        return /\S+@\S+\.\S+/.test(value) ? "" : "Format d'e-mail invalide";
      },
    },
    {
      label: "Choisissez un mot de passe :",
      minLength: 8,
      field: "password",
      validator: (value) => {
        return value.length >= 8
          ? ""
          : "Le mot de passe doit avoir au moins 8 caractères";
      },
    },
  ];


  async function createUser(user) {
    try {
      const reponse = await fetch("http://192.168.1.16:8888/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      const res = await reponse.json();
      console.log("Réussite :", res);
    } catch (err) {
      console.error("Erreur :", err);
    }
  }
  

  

  const handleNextStep = () => {
    const currentField = formData[step];

    const error = currentField.validator
      ? currentField.validator(user[currentField.field])
      : "";

    const updatedFormData = [...formData];
    updatedFormData[step].error = error;

    if (error) {
      // Handle the error as needed (e.g., display an error message).
      // You can choose how to handle errors based on your requirements.
      // For now, I'm leaving this part as is.
    } else if (step < formData.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Formulaire soumis :", user);
      // Now, you can send the 'user' data to your server using an HTTP request.
      // Example code for sending user data to the server:
      createUser(user);
    }
  };

  const renderFormField = (field, index) => {
    return (
      <View key={index} style={styles.main}>
        <Text style={styles.inputText}>{field.label}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setUser({ ...user, [field.field]: text });
          }}
          value={user[field.field]}
        />
        {field.error && <Text style={styles.errorText}>{field.error}</Text>}
      </View>
    );
  };

  return (
    <View>
      {renderFormField(formData[step], step)}
      <Pressable style={styles.button} onPress={handleNextStep}>
        <Text style={styles.buttonText}>
          {step === formData.length - 1 ? "Créer un compte" : "Suivant"}
        </Text>
      </Pressable>
    </View>
  );
}




const styles = StyleSheet.create({
  main: { flexDirection: "column", gap: 30 },
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
  errorText: {
    color: "red",
    fontSize: 14,
  },
  passwordToggleIcon: {
    alignSelf: "flex-end",
    right: 20,
    top: 15,
  },
  button: {
    backgroundColor: "white",
    alignSelf: "center",
    width: 150,
    height: 45,
    borderRadius: 125,
    top: 30,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    top: 15,
  },
});
