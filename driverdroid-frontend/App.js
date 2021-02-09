import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#666666"
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#666666"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_password}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.sign_up}>New user? Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sign_in}>
        <Text style={styles.sign_in_text}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FF",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    height: 100,
    paddingBottom: 10,
    fontSize: 42,
    fontWeight: "bold",
    color: "#59499E",
  },

  inputView: {
    backgroundColor: "#EEEEF8",
    borderRadius: 6,
    width: "80%",
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontSize: 14,
  },

  forgot_password: {
    height: 30,
    marginBottom: 10,
    fontSize: 15,
  },

  sign_up: {
    height: 30,
    marginBottom: 10,
    fontSize: 15,
  },

  sign_in: {
    width: "80%",
    borderRadius: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#35BEE0",
  },

  sign_in_text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Open Sans",
  },
});