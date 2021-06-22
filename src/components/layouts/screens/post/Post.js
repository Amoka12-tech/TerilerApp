import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { BottomSheet, Icon, Input, Image, LinearProgress } from 'react-native-elements';
import { black, grey, secondary, white } from '../../../../color';
import styles from '../styles';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../../../actions/post';
import Axios from 'axios';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export default function PostPage({ navigation }) {
  const dispatch = useDispatch();
  const [hideCameraView, setHideCameraView] = useState('flex');
  const [hidePostView, setHidePostView] = useState('none');

  const [sheetIsVisible, setSheetISVisible] = useState(true);
  
  const [postBody, setPostBody] = useState("");
  const [postTags, setPostTags] = useState(["banger", "new york", "michinga city"]);
  const [postCategory, setPostCategory] = ('update');
  const [progressCount, setProgressCount] = useState('0%');
  const [isProgress, setIsProgress] = useState(false);

  const config ={
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  const selectedImage = useSelector(state => state.media);
  const userData = useSelector(state => state.auth);

  
  // console.log(selectedImage);

  const _renderImage = ({item, index}) => {
    return (
      <View style={styles.small_image}>
        <Image 
          containerStyle={{
            width: 81,
            height: 81,
          }}
          source={{
            uri: item.uri
          }} 
          />
      </View>
    );
  };

  const convertFile = async (file) => {
    const base64File = await FileSystem.readAsStringAsync(file, { encoding: FileSystem.EncodingType.Base64 });
    return base64File;
  };

  //On Click Submit here
  const onSubmit = async () => {
    let mediaArray = [];

    if(selectedImage.length > 0){
      for(const key of Object.keys(selectedImage)){
        const thisMedia = await convertFile(selectedImage[key].uri);
        const thisMediaType = selectedImage[key].mediaType;
        const thisMediaExec = selectedImage[key].filename.split('.').pop();
        console.log(thisMediaType,'/',thisMediaExec);
        mediaArray.push({
          "mediaBinary": thisMedia,
          "ContentType": thisMediaExec,
        });
      }

      // console.log("Base64 Array",mediaArray);

      const body = {
      caption: postBody,
      postTags: ["post", "general"],
      postCategory: 'update',
      base64media: mediaArray,
      };

      const configProgress =  {
        onUploadProgress: progressEvent =>  setProgressCount(`${Math.round((100 * progressEvent.loaded) / progressEvent.total)}%`),
      };

      dispatch(createPost(body, navigation, configProgress, setIsProgress));
      
    }else{
      alert("Please select at least a media file")
    }
    
  };

  return (
    <View style={{ flex: 1 }}>

          <View style={styles.select_gallary_top_holder}>
            <View style={styles.select_gallary_top_action_left}>
              <Icon 
                type='font-awesome-5'
                name='arrow-left'
                color={black}
                size={20}
                onPress={() => navigation.goBack()}
                containerStyle={{ marginRight: 20 }}
              />

              <Text style={styles.top_text}>
                Upload
              </Text>
            </View>
            {/* End view left */}
            <TouchableOpacity>
              <Icon 
                type='material-community'
                name='checkbox-multiple-blank-outline'
                size={24}
                color={secondary}
              />
            </TouchableOpacity>
          </View>
          
          <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <View style={{
              width: '100%',
              display: 'flex',
              }}>
              <Input 
                value={postBody}
                onChangeText={(value) => setPostBody(value)}
                maxLength={50}
                multiline={true}
                numberOfLines={10}
                placeholder='Write a cation...'
                containerStyle={{
                  height: 200,
                }}
                />
            </View>

            <View style={{ 
                flex: 1,
                display: 'flex',
                marginTop: 20,
                paddingLeft: 10,
                }}>
                <FlatList
                  horizontal
                  style={{
                    display: 'flex',
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  data={selectedImage}
                  renderItem={_renderImage}
                />
                
            </View>

            <View 
            style={{
              display: 'flex',
              width: '100%',
              bottom: 20,
              flexDirection: 'row',
              }}>
            <LinearProgress 
              style={{
                width: progressCount,
                }}
              color={secondary}
              />
              <Text style={{ fontSize: 25 }}>
                {progressCount}
              </Text>
            </View>
          </View>

          

        <View style={{
          marginRight: 20,
          marginLeft: 20,
        }}>
          <TouchableOpacity 
            onPress={onSubmit}
            style={styles.next_button}>
            <Text style={styles.next_text}>Post</Text>
          </TouchableOpacity>
        </View>

    </View>
  );
}
