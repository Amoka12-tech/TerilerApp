import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from '../../../actions/chat';
import { black, secondary } from '../../../color';
import styles from './styles';

export default function ChatPage({ navigation, route }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const screen = route.params?.screen;
  const id = route.params?.id;
  
  const chats = useSelector(state => state.chat);
  useEffect(() => {
    if( screen !== undefined || ''){
      navigation.navigate(screen, { id: id });
    }else{
      dispatch(getChats());
    }
  }, []);
  const ChatRender = () => {
    return(
      <TouchableOpacity 
        onPress={() => navigation.navigate('SingleChat')}
        style={styles.chatMessageHolder}>
        <Avatar 
          source={require('../../../img/blank_image.png')}
          size={70}
          rounded
        />
        <View style={styles.chatBodyPreviewHolder}>
          <View style={styles.chatBodyPreviewTitle}>
            <Text style={styles.chatNameText}>
              Michael Daniel 
            </Text>
            <Text style={styles.chatTimeText}>
              30 mins
            </Text>
          </View>
          <View style={styles.chatBodyPreviewTextHolder}>
            <Text style={styles.chatMessageText}>
            Can you pls how me mail a letter to your school?..... I tried reaching you...
            </Text>
            <View style={styles.messageNumberTextHolder}>
              <Text style={styles.messageNumberText}>
                2
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.chat_container}>
      <View style={styles.top_nav_holder}>
        <Text style={styles.top_text}>Chats</Text>

        <Icon 
          type='ionicon'
          name='search-outline'
          size={25}
          color={black}
        />
      </View>

      <ChatRender />
     </View>
  );
}
