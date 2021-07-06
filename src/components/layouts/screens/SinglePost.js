import React, { useRef, useState } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { black, primary } from '../../../color';
import styles from './styles';
import { Avatar, Icon } from 'react-native-elements';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../../actions/comment';

export default function SinglePostPage({ navigation, route }) {
    const inputRef = useRef();
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState('');
    const postID = route.params?.item?._id;
    const allPost = useSelector(state => state.post);
    const post = allPost?.filter((item) => {if(item?._id === postID){
        return item;
    }});
    const comments = post[0]?.comments;
    const user = post[0]?.postBy;

    const postComment =(id, text, ref) => {
        const body = {
          text: text,
        };
        ref.current.clear();
        dispatch(createComment(id, body));
      };

    const commentRender = ({item, index}) => {
        return(
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                marginBottom: 20,
            }}>
                <Avatar 
                    source={item?.commentBy?.photo ? { uri: item?.commentBy?.photo } : require('../../../img/blank_image.png') }
                    size={45}
                    rounded
                    containerStyle={{ marginRight: 10 }}
                />
                <View style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                    <Text style={styles.plainText}>
                        {item?.text}
                    </Text>
                    <Text style={styles.messageTimeText}>
                        {moment(item?.createdAt).fromNow()}
                    </Text>
                </View>
            </View>
        );
    };
  return (
    <View style={styles.container}>
        <View style={styles.top_nav_holder}>
                <View style={styles.top_nav_left_holder}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} size={28} color={black} />
                    </TouchableOpacity>
                    <Text style={styles.top_nav_left_title}>
                        Comments
                    </Text>
                </View>
        </View>

        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <FlatList 
                data={comments}
                renderItem={commentRender}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 5 }}>
              <TextInput 
                ref={inputRef}
                placeholder='Message' 
                style={styles.comment_box}
                placeholderTextColor={primary}
                returnKeyType='send'
                value={commentText}
                onChangeText={(text) => setCommentText(text)}
                onSubmitEditing={(e) => {
                  const message = e.nativeEvent.text;
                  postComment(post[0]?._id, message, inputRef);
                }}
                />

                <TouchableOpacity style={{ marginLeft: '-10%',  width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon 
                        type='feather'
                        name='smile'
                        size={28}
                        color={primary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}
