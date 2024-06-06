import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { TextInput, Text, Button } from "react-native-paper";
import AuthContext from "../Auth/AuthContext";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

const Register = ({ navigation }) => {
  const { registerUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handlePasswordChange = (text) => {
    // Check password strength
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (strongRegex.test(text)) {
      setPassword(text);
      setPasswordError("");
    } else {
      setPasswordError(
        "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters."
      );
    }
  };

  const handlePassword2Change = (text) => {
    setPassword2(text);
    if (text !== password) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleSubmit = async () => {
    if (password !== password2) {
      setPasswordMatchError("Passwords do not match.");
      return;
    }
    try {
      await registerUser(email, username, password, password2);
      console.log("Username:", username);
      console.log("Email:", email);
      console.log("Password 1:", password);
      console.log("Password 2:", password2);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "You have successfully registered an account. Redirecting to Login",
      });
      setTimeout(() => {
        navigation.navigate("Login");
      }, 3000);
    } catch (error) {
      console.log("Error: ", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "DANGER",
        textBody: "There is something wrong.",
      });
    }
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
          <Text
            variant="titleMedium"
            style={{
              right: "25%",
              padding: 10,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            Login Form:
          </Text>
          <TextInput
            label="Username: "
            style={styles.input}
            onChangeText={setUsername}
          />

          <TextInput
            label="Email Address: "
            style={styles.input}
            onChangeText={setEmail}
          />

          <TextInput
            label="Password: "
            style={styles.input}
            secureTextEntry
            onChangeText={handlePasswordChange}
          />
          {passwordError && (
            <Text
              style={{ color: "red", padding: 5, backgroundColor: "white" }}
            >
              {passwordError}
            </Text>
          )}
          <TextInput
            label="Confirm Password: "
            style={styles.input}
            secureTextEntry
            onChangeText={handlePassword2Change}
          />
          {passwordMatchError && (
            <Text
              style={{ color: "red", padding: 5, backgroundColor: "white" }}
            >
              {passwordMatchError}
            </Text>
          )}
          <View
            style={{ backgroundColor: "white", padding: 5, borderRadius: 10 }}
          >
            <Text variant="bodyLarge">
              Already have an account?{" "}
              <Text
                variant="bodyLarge"
                style={styles.register}
                onPress={() => navigation.navigate("Login")}
              >
                Login here
              </Text>
            </Text>
          </View>
          <View style={styles.loginButton}>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={{ color: "white" }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default Register;

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
    marginTop: "50%",
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
