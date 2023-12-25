import { StatusBar } from 'react-native';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import Details from './src/screens/ProductDetailScreen';
import Footer from './src/components/Footer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/state/store';
import Toast from 'react-native-toast-message';

export default function App() {
  // Ẩn thanh trạng thái
  StatusBar.setHidden(true);


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <Footer />
      </NavigationContainer>
    </Provider>

  );
}
