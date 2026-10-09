import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavigationBar from '../navigation/NavigationBar';
import LoginScreen from '../screens/LoginScreen';
import NovaManifestacaoScreen from '../screens/NovaManifestacaoScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Cadastro' }}
      />

      <Stack.Screen
        name="Home"
        component={NavigationBar}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NovaManifestacao"
        component={NovaManifestacaoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}