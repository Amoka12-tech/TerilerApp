import React, { useEffect } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getChats } from '../../../actions/chat';
import { black, secondary } from '../../../color';
import styles from './styles';

export default function ChatPage({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user?.user);
  
  const chats = useSelector(state => state.chat.allChat);
  useEffect(() => {
      dispatch(getChats());
  }, []);
  const chatListRender = ({item, index}) => {
    return(
      <TouchableOpacity 
        onPress={() => navigation.navigate('SingleChat', {
            id: item?.participants[0]?._id === user?._id ? item?.participants[1]?._id : item?.participants[0]?._id,
            user: item?.participants[0]?._id === user?._id ? item?.participants[1] : item?.participants[0]
        })}
        style={styles.chatMessageHolder}>
        <Avatar 
          source={item?.participants.length > 0 ? { uri: item?.participants[0]?._id === user?._id ? item?.participants[1]?.photo : item?.participants[0]?.photo } : require('../../../img/blank_image.png')}
          size={70}
          rounded
        />
        <View style={styles.chatBodyPreviewHolder}>
          <View style={styles.chatBodyPreviewTitle}>
            <Text style={styles.chatNameText}>
              {item?.participants[0]?._id === user?._id ? item?.participants[1]?.username : item?.participants[0]?.username}
            </Text>
            <Text style={styles.chatTimeText}>
              {moment(item?.updatedAt).fromNow()}
            </Text>
          </View>
          <View style={styles.chatBodyPreviewTextHolder}>
            <Text style={styles.chatMessageText}>
              {item?.messages[item?.messages?.length - 1]?.text}
            </Text>
            <View style={styles.messageNumberTextHolder}>
              <Text style={styles.messageNumberText}>
                {item?.messages?.length}
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

      <FlatList 
        style={{ flex: 1 }}
        data={chats}
        keyExtractor={(item, index) => index.toString()}
        renderItem={chatListRender}
        showsVerticalScrollIndicator={false}
      />
     </View>
  );
}
