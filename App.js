import { StatusBar } from 'react-native';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import Details from './src/screens/ProductDetailScreen';
import Footer from './src/components/Footer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Toast from 'react-native-toast-message';



import { AuthProvider } from './src/utils/AuthProvider';
export default function App() {
  // Ẩn thanh trạng thái
  StatusBar.setHidden(true);


  return (
    <AuthProvider>
      <NavigationContainer>

        <Footer />
      </NavigationContainer>
    </AuthProvider>

  );
}
