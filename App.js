import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as screens from "./screens/index";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={screens.Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={screens.Login}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Signup"
          component={screens.Signup}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Home"
          component={screens.Home}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CreateEditRecipe"
          component={screens.CreateEdit}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
