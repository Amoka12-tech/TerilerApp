import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { BottomSheet, Icon, Image } from 'react-native-elements';
import { black, grey, secondary, white } from '../../../../color';
import styles from '../styles';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { StatusBar } from 'expo-status-bar';
import * as MediaLibrary from 'expo-media-library';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function GalleryPage({ navigation }) {
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [cameraRollPermission, setCameraRollPermission] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [listMedia, setListMedia] = useState(null);

  const [newMediaArray, setNewMediaArray] = useState([]);
  
  const onSwipeUp = (gestureState) => {
    navigation.navigate('Gallery');
  };

  const onSwipeDown = (gestureState) => {
    navigation.navigate('PostBody');
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


  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaLibraryPermission(status === 'granted'? status : false);
    })();
  }, []);

  useEffect(() => {
    refRBSheet.current.open();
    getMedia();
  }, [])

  const config ={
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  const getMedia = async () => {
    const mediaData = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo', 'video'],
      sortBy: ['creationTime'],
      first: 2,
    });
    setListMedia(mediaData);
  };

  const addToNewMedia = (item) => {
    const checkItem = newMediaArray.find((value) => { return value.id === item.id; });
    if(!!checkItem){
      newMediaArray.splice(newMediaArray.findIndex((data) => {
        return data.id === item.id;
      }), 1);
      console.log("Item Removed");
    }else{
      newMediaArray.push(item);
      console.log("Add");
      console.log(newMediaArray);
    }
    // setNewMediaArray(item);
  };

  const singleMedia = ({item, index}) => {
    return(
      <TouchableOpacity onPress={() => addToNewMedia(item)}>
        <Image resizeMode='cover' source={{ uri: item.uri }} style={{
          width: 180,
          height: 180,
          borderRadius: 10,
        }} />
      </TouchableOpacity>
    );
  };

  const refRBSheet = useRef();
  const videoRef = React.useRef(null);

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      backgroundColor: white,
      }}>

      <View style={styles.select_gallary_top_holder}>
            <View style={styles.select_gallary_top_action_left}>
              <Icon 
                type='font-awesome-5'
                name='arrow-left'
                color={black}
                size={20}
                onPress={() => navigation.navigate('Camera')}
                containerStyle={{ marginRight: 20 }}
              />

              <Text style={styles.top_text}>
                Upload
              </Text>
            </View>
            <TouchableOpacity>
              <Icon 
                type='material-community'
                name='checkbox-multiple-blank-outline'
                size={24}
                color={secondary}
                onPress={() => navigation.navigate('FullGallery')}
              />
            </TouchableOpacity>
      </View>
      <View style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: grey,
      }} >

              <Video 
                ref={videoRef}
                style={styles.video_preview}
                source={{ uri: newMediaArray[0]?.uri}}
                useNativeControls={true}
                resizeMode="contain"
                isLooping
                shouldPlay={isPlaying}
              />
              
              {/* <Image 
              width={100}
              height={100}
              source={{ uri: newMediaArray[0]?.uri }}
              style={styles.video_preview}
              resizeMode="contain"
            /> */}

            <TouchableOpacity style={styles.playIcon} 
              onPress={() => console.log('here')}
              >
              <Text>Play</Text>
            </TouchableOpacity>
        
      </View>
      
        
      <RBSheet 
        ref={refRBSheet}
        height={300}
        customStyles={{
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: 20,
          },
          wrapper: {
            backgroundColor: "transparent",
            padding: 0,
            alignItems: 'center',
            borderRadius: 20,
          },
          draggableIcon: {
            backgroundColor: grey
          }
        }}
      >
        <FlatList 
          horizontal={false} 
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          data={listMedia?.assets}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={singleMedia}
        />

        <TouchableOpacity style={styles.next_button}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            fontStyle: 'normal',
            color: white,
          }}>Next</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
}
