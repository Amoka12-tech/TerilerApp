import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList, TextInput } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { createChat, getSingleChat } from '../../../actions/chat';
import { black, primary, secondary, white } from '../../../color';
import styles from './styles';

export default function SingleChatPage({ navigation, route }) {
    const receiverID = route?.params?.id;
    const userID = 1;
    const dispatch = useDispatch();
    const chats = useSelector(state => state.chat);

    useEffect(() => {
        dispatch(getSingleChat(receiverID));
    }, []);

    const postChat = (message) => {
        const body = {
            text: message,
        };
        dispatch(createChat(receiverID, body));
    };
    const chatMessages = [
        {
            id: 1,
            message: "Can you pls how me mail a letter to your school?..... I tried reaching you.r Teacher",
            time: "12:07",
        },
        {
            id: 2,
            message: "Can you pls how me mail a letter to your school?..... I tried reaching you.r Teacher",
            time: "12:11",
        },
        {
            id: 1,
            message: "Can you pls how me mail a letter to your school?..... I tried reaching you.r Teacher",
            time: "12:17",
        },
        {
            id: 2,
            message: "Can you pls how me mail a letter to your school?..... I tried reaching you.r Teacher",
            time: "01:07",
        },
        {
            id: 1,
            message: "Can you pls how me mail a letter to your school?..... I tried reaching you.r Teacher",
            time: "12:17",
        },
        {
            id: 2,
            message: "Can you pls how me mail a letter to your school?..... I tried reaching you.r Teacher",
            time: "01:07",
        },
    ];

    const TopHeader = () => {
        return(
            <View style={styles.topChatHolder}>
                <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', width: 40, height: 40, marginRight: 15 }} 
                    onPress={() => navigation.goBack()}>
                    <Icon 
                        type='antdesign'
                        name='arrowleft'
                        size={35}
                        color={black}
                    />
                </TouchableOpacity>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Avatar 
                        source={require('../../../img/blank_image.png')}
                        size={50}
                        rounded 
                        containerStyle={{ marginRight: 20}}
                    />

                    <View style={styles.chatPersonHolder}>
                        <Text style={styles.chatPersonName}>Michael Daniel</Text>
                        <Text style={styles.chatPersonTime}>Active 40mins ago</Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderMessages = ({item, index}) => {
        return(
            <View style={{ display: 'flex', alignItems: item?.id === userID? 'flex-end' : 'flex-start', width: '100%', flexDirection: 'column', marginTop: 35 }}>
                <View style={item?.id === userID ? styles.currentUserViewMessage : styles.otherUserViewMessage}>
                    <Text style={item?.id === userID ? styles.currentUserMessageText : styles.otherUserMessageText}>
                        {item?.message}
                    </Text>
                </View>
                <Text style={styles.messageTimeText}>
                    {item?.time}
                </Text>
            </View>
        );
    };
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
