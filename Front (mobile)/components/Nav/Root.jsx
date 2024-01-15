import React, { useState } from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNav from "../../BottomNav";
import NoAccHomePage from "../../Page/NoAccountHomePage";
import Register from "../../Page/Register";
import SignIn from "../../Page/SignIn";
import Preferences from "../Preference";
import ProfilePage from "../../Page/ProfilePage";
import ModifyProfile from "../../Page/modifyProfile";

const Stack = createStackNavigator();

export default function Root() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        {isUserLoggedIn ? (
          <>
            <Stack.Screen
              name="BottomNav"
              component={BottomNav}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Group>
              <Stack.Screen name="Preferences" component={Preferences} />
              <Stack.Screen name="ProfilePage" component={ProfilePage} />
              <Stack.Screen name="ModifyProfile" component={ModifyProfile} />
            </Stack.Group>
          </>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="NoAccHomePage"
              component={NoAccHomePage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="SignIn" component={SignIn} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
