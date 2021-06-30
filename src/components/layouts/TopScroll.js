import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { View, Text, ScrollView } from 'react-native';
import styles from '../../styles';

export default function TopScroll({ navigation, route }) {
    const routeName = useRoute().name;
    
  return (
      <FlatList 
        style={{ 
            flex: 1, 
            height: 'auto', 
            marginTop: 10, 
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data = {[
            {
                key : '1',
                name : 'MainHome'
            },
            {
                key : '2',
                name : 'Talent'
            },
            {
                key : '3',
                name : 'Work'
            },
            {
                key : '4',
                name : 'Location'
            },
        ]}
        renderItem={({item, index}) => 
            <View key={index} style={styles.top_scroll}>
                
                <TouchableOpacity 
                    style={routeName === item.name? styles.top_scroll_active_item : styles.top_scroll_item}
                    onPress={()=>{
                        if(item.name !== 'MainHome'){
                            if(item.name === 'Talent'){
                                navigation.navigate(item.name);
                            }
                        }else{
                            navigation.navigate('MainHome');
                        }
                    }}
                >
                    <Text style={routeName === item.name? styles.top_scroll_active_item_text : styles.top_scroll_item_text}>
                        {item.name === 'MainHome' ? 'Timeline' : item.name}
                    </Text>
                </TouchableOpacity>
                
            </View>
        }
      />
  );
}
