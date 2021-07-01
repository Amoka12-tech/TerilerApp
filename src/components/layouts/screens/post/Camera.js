import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Image, FlatList } from 'react-native';
import { BottomSheet, Icon } from 'react-native-elements';
import { black, grey, secondary, white } from '../../../../color';
import styles from '../styles';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';

import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_MEDIA, UPDATE_MEDIA } from '../../../../reducers/types';
import { v4 as uuidv4 } from 'uuid';
import { Audio } from 'expo-av';

export default function CameraPage({ navigation }) {
  const dispatch = useDispatch();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off);
  const [canSnap, setCanSnap] = useState(false);
  const [sheetIsVisible, setSheetISVisible] = useState(true);

  const [cameraUse, setCameraUse] = useState('camera');
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      await Audio.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  });

  const selectedImage = useSelector((state) => state.media);

  const onSwipeUp = (gestureState) => {
    navigation.navigate('FullGallery');
  };

  const onSwipeDown = (gestureState) => {
    navigation.navigate('Camera');
  };

  const onSwipe = (gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN} = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        onSwipeUp(gestureState);
        break;
    
      case SWIPE_DOWN:
        onSwipeDown(gestureState);
        break;
    }
  };

  const onCameraSelect = () => {
    setCameraUse('camera');
  };

  const onVideoSelect = () => {
    setCameraUse('video');
  };

  const cameraRef = useRef();

  const isFocused = useIsFocused();

  const _renderSelectedImg = ({item, index}) => {
    return <View style={styles.camera_tile_view}>
      <Image 
        source={{ uri: item.uri }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 5,
        }}
        resizeMode='cover'
      />
      <TouchableOpacity 
        onPress={() => remove_image(item.id)}
        style={{
          width: 24,
          height: 24,
          bottom: 30,
          left: 70,
        }}>
        <Icon 
          type='antdesign'
          name='closecircle'
          color={secondary}
          size={24}
        />
      </TouchableOpacity>
    </View>;
  };

  // Remove Image from selected Image list
  const remove_image = (id) => {
    const newImageArray = [...selectedImage];
    if(selectedImage.length > 0){
      const imageIndex = newImageArray.findIndex((item) => {
        return item.id === id;
      });

      if(imageIndex !== -1){
        newImageArray.splice(imageIndex, 1);
        dispatch({ type: ADD_MEDIA, payload: newImageArray });
        
      }
    }
  };
  
  const snap = async () => {
    if(cameraRef){
      setCanSnap(true);
      if(cameraUse === 'camera'){
        const cameraData = await cameraRef.current.takePictureAsync();
        const fileName = cameraData.uri.substr(cameraData.uri.lastIndexOf("/")+1);
        const imageId = fileName.split('.').shift();
        cameraData.mediaType = 'photo';
        cameraData.filename = fileName;
        cameraData.id = imageId;
        
        dispatch({ type: UPDATE_MEDIA, payload: cameraData });
        setCanSnap(false);
      }else{
        const { status } = await Audio.getPermissionsAsync();
        if(status === 'granted'){
          if(isRecording === false){
            setIsRecording(true);
            const videoData = await cameraRef.current.recordAsync({
              maxDuration: 60,
              quality: Camera.Constants.VideoQuality['360p'],
            });
            const fileName = videoData.uri.substr(videoData.uri.lastIndexOf("/")+1);
            const videoId = fileName.split('.').shift();
            videoData.mediaType = 'video';
            videoData.filename = fileName;
            videoData.id = videoId;
            dispatch({type: ADD_MEDIA, payload: [videoData] });
            setIsRecording(false);
            setCanSnap(false);
          }
        }
      };
    }
  };

  const stopRecording = async () => {
    if(isRecording){
      const videoData = await cameraRef.current.stopRecording();
      setIsRecording(false);
      setCanSnap(false);
    }
  };

  const config ={
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <GestureRecognizer 
      config={config}
      style={{
        flex: 1,
      }}
      onSwipe={(direction, state) => onSwipe(direction, state)}
      >
      <View style={{ flex: 1 }}>
      <View style={{ display: 'flex', backgroundColor: black, flex: 1, justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
        <View style={styles.top_camera_action}>
          <View>
            <Text> </Text>
          </View>
          <TouchableOpacity>
            <Icon 
              type='material-community'
              name= {cameraFlash === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'}
              color={white}
              size={25}
              onPress={() => setCameraFlash( 
                cameraFlash === Camera.Constants.FlashMode.off? 
                Camera.Constants.FlashMode.on : 
                Camera.Constants.FlashMode.off
               )}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => {
              cameraRef.current.pausePreview();
              navigation.navigate('Main');
            }}
          >
            <Icon 
              type='material-community'
              name='close'
              color={white}
              size={25}
            />
          </TouchableOpacity>
        </View>

        <View style={{ 
          flex: 1,

         }}>
          {
            hasCameraPermission === null || 
            hasCameraPermission === false ? 
            <Text> No access to camera </Text> :
            isFocused ? <Camera 
            ref={cameraRef}
            style={{
              flex: 1,
              aspectRatio: 1,
            }}
            type={cameraType}
            flashMode={cameraFlash}
            ratio={'1:1'}
             /> : <Text> Camera stop </Text>
          }
        </View>

        <View style={{
          display: 'flex',
          width: '100%'
        }}>
          <FlatList 
            horizontal
            data={selectedImage}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderSelectedImg}
          />
        </View>
        
        <View style={styles.bottom_action_holder}>
          <View style={styles.bottom_camera_action}>
            <TouchableOpacity onPress={() => navigation.navigate('PostBody')} >
              <Text style={styles.bottom_camera_action_text}>Post</Text>
            </TouchableOpacity>

            {
             cameraUse === 'camera' ? <TouchableOpacity 
                onPress={onCameraSelect}
              >
                <Text style={ cameraUse === 'camera'? styles.bottom_camera_action_text_active : styles.bottom_camera_action_text}>Camera</Text>
              </TouchableOpacity> : 
              <TouchableOpacity 
                onPress={onVideoSelect}
              >
                <Text style={ cameraUse === 'video'? styles.bottom_camera_action_text_active : styles.bottom_camera_action_text}>Video</Text>
              </TouchableOpacity>
            }

{
             cameraUse === 'camera' ? <TouchableOpacity 
             onPress={onVideoSelect}
           >
             <Text style={ cameraUse === 'video'? styles.bottom_camera_action_text_active : styles.bottom_camera_action_text}>Video</Text>
           </TouchableOpacity> : 
              <TouchableOpacity 
              onPress={onCameraSelect}
            >
              <Text style={ cameraUse === 'camera'? styles.bottom_camera_action_text_active : styles.bottom_camera_action_text}>Camera</Text>
            </TouchableOpacity>
            }
          </View>

          <View style={styles.capture_camera_button}>
            <Text> </Text>

            <TouchableOpacity 
              onPress={snap}
              disabled={canSnap}
            >
              <Icon 
                type='material-community'
                name='circle-slice-8'
                size={68}
                color={canSnap? grey : white}
              />
            </TouchableOpacity>

            {isRecording ? <Icon 
              type='ionicon'
              name='md-stop-circle-sharp'
              color={white}
              size={34}
              onPress={stopRecording}
            /> : 
            <Icon 
              type='ionicon'
              name='ios-camera-reverse'
              color={white}
              size={34}
              onPress={() => setCameraType(
                cameraType === Camera.Constants.Type.back? 
                Camera.Constants.Type.front : 
                Camera.Constants.Type.back
              )}
            />}
          </View>

          <TouchableOpacity 
            onPress={() => navigation.navigate('AlbumGallery')}
            style={styles.camera_direction_holder}>
            <Icon 
              type='simple-line-icon'
              name='arrow-up'
              color={white}
              size={40}
            />
            <Icon 
              type='simple-line-icon'
              name='arrow-up'
              color={white}
              size={40}
              containerStyle={{
                marginTop: -30
              }}
            />
            <Icon 
              type='simple-line-icon'
              name='arrow-up'
              color={white}
              size={40}
              containerStyle={{
                marginTop: -30
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Post View */}
      
    </View>
    </GestureRecognizer>
  );
}
