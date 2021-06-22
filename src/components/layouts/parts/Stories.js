import React from 'react';
import { FlatList } from 'react-native';
import { View, Text, Image } from 'react-native';
import styles from '../../../styles';

export default function StoriesPage({ listItem }) {
    
  return (
    <FlatList 
        data={listItem}
        renderItem={({item, index})=> 
                <View key={item.key} style={styles.stories_item}>
        <Image 
            resizeMode='cover' 
            width={80}
            height={80}
            source={item.image} />
      </View>
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            display: 'flex',
            height: 80,
            marginTop: 20,
        }}
    />
  );
}
