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
          name="CreateRecipe"
          component={screens.CreateEdit}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="RecipeDetails"
          component={screens.RecipeDetails}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="User"
          component={screens.User}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="RecoverPassword"
          component={screens.RecoverPassword}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
