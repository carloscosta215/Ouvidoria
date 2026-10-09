import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRoutes from './src/routes/AppRoutes';


const Stack = createNativeStackNavigator();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#20B77A',
    primaryContainer: '#D1F4E5',
    onPrimaryContainer: '#0F573A',
    secondaryContainer: '#D1F4E5',
    onSecondaryContainer: '#0F573A',
    secondary: '#000000',
    inverseSurface: '#333333',
    inverseOnSurface: '#FFFFFF',
    error: '#FF3333',
    background: '#FFFFFF',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}