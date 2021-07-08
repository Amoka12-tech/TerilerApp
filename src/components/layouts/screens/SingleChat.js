import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Text, FlatList, TextInput } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { createChat, getSingleChat } from '../../../actions/chat';
import { black, primary, secondary, white } from '../../../color';
import styles from './styles';
import Pusher from 'pusher-js/react-native';

export default function SingleChatPage({ route, navigation }) {
    const id = route.params?.id;
    const otherUser = route.params?.user;
    const userID = 1;
    const dispatch = useDispatch();
    const chats = useSelector(state => state.chat.chat);
    const [isVisit, setIsVisit] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        // console.log("Check: ",otherUser);
        dispatch(getSingleChat(id));
    }, []);

    const postChat = (message) => {
        // console.log("ReciverID: ",id);
        const body = {
            text: message,
        };
        dispatch(createChat(id, body));
        setTimeout(() => {
            inputRef.current.clear();
        }, 500);
    };
    const chatMessages = chats?.messages;

    const TopHeader = () => {
        return(
            <View style={styles.topChatHolder}>
                <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', width: 40, height: 40, marginRight: 15 }} 
                    onPress={() => navigation.navigate('ChatMain')}>
                    <Icon 
                        type='antdesign'
                        name='arrowleft'
                        size={35}
                        color={black}
                    />
                </TouchableOpacity>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Avatar 
                        source={!!otherUser && otherUser.photo ? { uri: otherUser.photo } : require('../../../img/blank_image.png')}
                        size={50}
                        rounded 
                        containerStyle={{ marginRight: 20}}
                    />

                    <View style={styles.chatPersonHolder}>
                        <Text style={styles.chatPersonName}>{!!otherUser && otherUser?.username && otherUser?.username}</Text>
                        <Text style={styles.chatPersonTime}>Active {moment(chats?.updatedAt).fromNow()}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderMessages = ({item, index}) => {
        return(
            <View style={{ display: 'flex', alignItems: item?.sender === userID? 'flex-end' : 'flex-start', width: '100%', flexDirection: 'column', marginTop: 10 }}>
                <View style={item?.sender === userID ? styles.currentUserViewMessage : styles.otherUserViewMessage}>
                    <Text style={item?.sender === userID ? styles.currentUserMessageText : styles.otherUserMessageText}>
                        {item?.text}
                    </Text>
                </View>
                <Text style={styles.messageTimeText}>
                    {item?.createdAt}
                </Text>
            </View>
        );
    };

    // Pusher.logToConsole = true;

    // var pusher = new Pusher('08a4bfa9673a763def41', {
    //     cluster: 'eu',
    //     forceTLS: true,
    // });
    
    // var channel = pusher.subscribe('my-channel');
    // channel.bind('my-event', function(data){
    //     console.log(JSON.stringify(data));
    // });

  return (
    <View style={{ 
        flex: 1, 
        padding: 10, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        backgroundColor: white, }}>
            
      <TopHeader />
      <FlatList 
        style={{ flex: 1 }}
        data={chatMessages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessages}
        showsVerticalScrollIndicator={false}
      />

      <View style={{ 
          display: 'flex', 
          width: '100%', 
          paddingLeft: 20, 
          paddingRight: 20, 
          flexDirection: 'row',
          alignItems: 'center',
           }}>
          <TextInput 
            ref={inputRef}
            multiline={true}
            style={styles.chatInput}
            placeholder='Message..'
            placeholderTextColor={primary}
            returnKeyType='send'
            returnKeyLabel='Send'
            onSubmitEditing={(e) => postChat(e.nativeEvent.text)}
            />
          <View style={styles.roundMicHolder}>
              <Icon 
                type='material'
                name='keyboard-voice'
                color={white}
                size={20}
              />
          </View>
          <TouchableOpacity style={{ marginLeft: '65%',  width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Icon 
                type='feather'
                name='smile'
                size={28}
                color={primary}
              />
          </TouchableOpacity>

          <TouchableOpacity style={{ marginLeft: '5%',  width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Icon 
                type='feather'
                name='camera'
                size={28}
                color={primary}
              />
          </TouchableOpacity>
      </View>
     </View>
  );
}
