import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../Auth/AuthContext";
import Login from "../Forms/Login";

const Stack = createStackNavigator();

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen name="ProtectedComponent" options={{ headerShown: false }}>
        {(props) => (user ? <Component {...props} /> : <Login {...props} />)}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default PrivateRoute;
