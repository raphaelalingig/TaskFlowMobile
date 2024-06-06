import React, { useState, useContext } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import AuthContext from "../Auth/AuthContext";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

const Login = ({ navigation }) => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await loginUser(email, password);

      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Invalid Account Email/Password",
      });
    } catch (error) {}
  };

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <Image
          style={styles.backgroundPicture}
          source={require("../../assets/pictures/loginPicture.jpg")}
        />
        <View style={styles.logo}>
          <Image
            style={styles.logoImage}
            source={require("../../assets/pictures/taskflowLogo.png")}
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            label="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            label="Password"
            style={styles.input}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <View
            style={{ backgroundColor: "white", padding: 5, borderRadius: 10 }}
          >
            <Text variant="bodyLarge">
              Don't have an account?{" "}
              <Text
                variant="bodyLarge"
                style={styles.register}
                onPress={() => navigation.navigate("Register")}
              >
                Register here
              </Text>
            </Text>
          </View>
          <View style={styles.loginButton}>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  logo: {
    position: "absolute",
    zIndex: 1,
  },
  backgroundPicture: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    zIndex: 0,
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  inputs: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    gap: 10,
    marginTop: "80%",
  },
  input: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
  },
  loginButton: {
    backgroundColor: "#1a56db",
    marginLeft: "65%",
    padding: 15,
    borderRadius: 10,
  },
  register: {
    color: "blue",
  },
});
