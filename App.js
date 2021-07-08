import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { HomeNav, TimeLine, TopNav } from './src/components/layouts';
import styles from './src/styles'
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';
import LoginPage from './src/components/auth/Login';
import { secondary } from './src/color';
import RegisterPage from './src/components/auth/Register';
import VerificationPage from './src/components/auth/Verification';
import { loadUser, logout } from './src/actions/user';
import { TouchableOpacity } from 'react-native';
import MainTabs from './src/components/navigation/Tabs';
import ProfilePage from './src/components/layouts/screens/Profile';
import Pusher from 'pusher-js/react-native';
import { useFonts, Poppins_900Black, Poppins_900Black_Italic, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({ Poppins_900Black, Poppins_900Black_Italic, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(isLoggedIn === false){
      store.dispatch(loadUser(setIsLoggedIn, setLoading));
      // console.log('effect call');
    }
  }, []);

  const checkStore = () => {
    const useState = store.getState();
    const loggedIn = useState.auth.isLoggedIn;
    const nLoading = useState.auth.loading;
    setIsLoggedIn(loggedIn);
    setLoading(nLoading);
    // console.log('You logged In: ',loggedIn);
    // console.log('You loading: ',nLoading);

  };

  store.subscribe(checkStore);

    const authScreen = {
        Login: LoginPage,
        Register: RegisterPage,
        Verification: VerificationPage,
    };

    const seessionScreen = {
        Home: MainTabs
    };

    if(!fontsLoaded){
      return <View />;
    }else{
      return (
        <Provider store={store}>
          <NavigationContainer>
            <SafeAreaProvider>
              <Spinner
                visible={loading}
                textStyle={{ color: secondary }}
                color={secondary}
              />
              <Stack.Navigator screenOptions={{ headerShown: false }} >
                  {Object.entries({
                    ...(isLoggedIn? seessionScreen : authScreen),
                  }).map(([name, component], index) => (
                    <Stack.Screen key={index} name={name} component={component} />
                  ))}
                </Stack.Navigator>
            </SafeAreaProvider>
          </NavigationContainer>
        </Provider>
      );
    }

}

