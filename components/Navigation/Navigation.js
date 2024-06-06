import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Forms/Login";
import Register from "../Forms/Register";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "../Pages/Dashboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Projects from "../Pages/Projects";
import Tasks from "../Pages/Tasks";
import Groups from "../Pages/Groups";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "../Auth/AuthContext";
import DropDownPicker from "react-native-dropdown-picker";
import AuthContext from "../Auth/AuthContext";

const BottomTabsNavigator = ({ navigation }) => {
  const { logoutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Account", value: "Account" },
    { label: "Logout", value: "Logout" },
  ]);
  const handleItemPress = (item) => {
    if (item.value === "Logout") {
      logoutUser();
      console.log("Logout Account");
    }
  };

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }) => ({
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <FontAwesome
                name="user"
                size={32}
                color="black"
                style={{ marginRight: 20 }}
                onPress={() => setOpen((prevOpen) => !prevOpen)}
              />
              {open && (
                <DropDownPicker
                  open={open}
                  items={items}
                  value={value}
                  setOpen={setOpen}
                  setItems={setItems}
                  containerStyle={styles.dropdownContainer}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  onSelectItem={handleItemPress}
                />
              )}
            </View>
          ),
          tabBarIcon: () => (
            <MaterialIcons name="dashboard" size={24} color="black" />
          ),
        })}
      />
      <Tab.Screen
        name="Projects"
        component={Projects}
        options={({ navigation }) => ({
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <FontAwesome
                name="user"
                size={32}
                color="black"
                style={{ marginRight: 20 }}
                onPress={() => setOpen((prevOpen) => !prevOpen)}
              />
              {open && (
                <DropDownPicker
                  open={open}
                  items={items}
                  value={value}
                  setOpen={setOpen}
                  setItems={setItems}
                  containerStyle={styles.dropdownContainer}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  onSelectItem={handleItemPress}
                />
              )}
            </View>
          ),
          tabBarIcon: () => (
            <MaterialIcons name="featured-play-list" size={24} color="black" />
          ),
        })}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={({ navigation }) => ({
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <FontAwesome
                name="user"
                size={32}
                color="black"
                style={{ marginRight: 20 }}
                onPress={() => setOpen((prevOpen) => !prevOpen)}
              />
              {open && (
                <DropDownPicker
                  open={open}
                  items={items}
                  value={value}
                  setOpen={setOpen}
                  setItems={setItems}
                  containerStyle={styles.dropdownContainer}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  onSelectItem={handleItemPress}
                />
              )}
            </View>
          ),
          tabBarIcon: () => (
            <FontAwesome name="list-alt" size={24} color="black" />
          ),
        })}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={({ navigation }) => ({
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <FontAwesome
                name="user"
                size={32}
                color="black"
                style={{ marginRight: 20 }}
                onPress={() => setOpen((prevOpen) => !prevOpen)}
              />
              {open && (
                <DropDownPicker
                  open={open}
                  items={items}
                  value={value}
                  setOpen={setOpen}
                  setItems={setItems}
                  containerStyle={styles.dropdownContainer}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  onSelectItem={handleItemPress}
                />
              )}
            </View>
          ),
          tabBarIcon: () => (
            <FontAwesome name="group" size={24} color="black" />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const Stack = createStackNavigator();
  const { authTokens } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); // Set loading to false once auth context is initialized
  }, []);

  if (isLoading) {
    return null; // Return null or loading indicator while loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!authTokens ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="BottomTabsNavigator"
            component={BottomTabsNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  headerRightContainer: {
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  dropdownContainer: {
    position: "absolute",
    top: 30,
    right: 0,
    width: 150,
  },
  dropdown: {
    zIndex: 1000, // Ensure the dropdown appears above other elements
  },
  dropDownContainerStyle: {
    zIndex: 1000,
  },
});
