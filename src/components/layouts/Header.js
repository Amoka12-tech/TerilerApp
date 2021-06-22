import React from 'react';
import { Image } from 'react-native';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../../styles';

export default function HeadNav({ navigation }) {
  return (
    <View style={styles.nav_holder}>
      <View style={styles.nav_side_holder}>
          <Icon 
            type='ionicon'
            name='camera-outline'
            size={30}
          />
          <Icon 
            type='ionicon'
            name='search-outline'
            size={30}
            style={{ marginLeft: 34 }}
          />
      </View>
      <View style={styles.logo_holder}>
      <Image resizeMode='contain' style={styles.logo} source={require('../../../assets/logo.png')} />
      
      </View>
      <View style={styles.nav_side_holder}>
          <Icon 
            type='font-awesome'
            name='sliders'
            size={30}
            style={{ marginRight: 34 }}
          />
          <Icon 
            type='ionicon'
            name='person-circle-outline'
            size={30}
            onPress={() => navigation.navigate('Profile')}
          />
      </View>
    </View>
  );
}
