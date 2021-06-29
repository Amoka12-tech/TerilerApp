import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { View, Text, ScrollView } from 'react-native';
import styles from '../../styles';

export default function TopScroll({ navigation, selectTop, setSelectTop }) {
    
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
                name : 'Timeline'
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
                    style={selectTop === index? styles.top_scroll_active_item : styles.top_scroll_item}
                    onPress={()=>{
                        setSelectTop(index);
                        if(item.name !== 'Timeline'){
                            if(item.name === 'Talent'){
                                navigation.navigate(item.name);
                            }
                        }else{
                            navigation.navigate('MainHome');
                        }
                    }}
                >
                    <Text style={selectTop === index? styles.top_scroll_active_item_text : styles.top_scroll_item_text}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
                
            </View>
        }
      />
  );
}
