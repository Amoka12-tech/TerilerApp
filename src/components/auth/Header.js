import React, { useEffect } from 'react';
import { Image, Text } from 'react-native';
import { View } from 'react-native';
import { primary, secondary } from '../../color';
import styles from '../../styles';
import { useFonts, Poppins } from '@expo-google-fonts/inter';
import { useDispatch } from 'react-redux';
import { END_PROCESS, START_PROCESS } from '../../reducers/types';

export default function HeaderPage() {
    const dispatch = useDispatch()
    let [fontsLoaded] = useFonts({
        Poppins,
    });
    useEffect(() => {
      if(!fontsLoaded)
      dispatch({type: START_PROCESS});
      dispatch({type: END_PROCESS});
    }, [])
  return (
    <View style={styles.auth_header}>
        <Image resizeMode='center' style={{ width: 50, height: 50 }} source={require('../../../assets/teriler.png')} />
        
    </View>
  );
}
