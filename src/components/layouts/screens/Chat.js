import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { secondary } from '../../../color';
import styles from './styles';

export default function ChatPage() {
  const ChatRender = () => {
    return(
      <TouchableOpacity style={styles.chatMessageHolder}>
        <Avatar 
          source={require('../../../img/blank_image.png')}
          size={50}
          rounded
        />
        <View style={styles.chatBodyPreviewHolder}>
          <View style={styles.chatBodyPreviewTitle}>
            <Text>
              Michael Daniel 
            </Text>
            <Text>
              30 mins
            </Text>
          </View>
          <View style={styles.chatBodyPreviewTextHolder}>
            <Text>
            Can you pls how me mail a letter to your school?..... I tried reaching you...
            </Text>
            <Text style={styles.messageNumberText}>
              2
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.chat_container}>
      <View style={styles.top_nav_holder}>
        <Text style={styles.top_text}>Chat</Text>

        <Icon 
          type='ionicon'
          name='search-outline'
          size={25}
          color={secondary}
        />
      </View>

      <ChatRender />
     </View>
  );
}
