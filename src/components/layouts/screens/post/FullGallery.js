import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { black, grey, secondary, white } from '../../../../color';
import styles from '../styles';
import * as MediaLibrary from 'expo-media-library';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_MEDIA, REMOVE_ALL_MEDIA, REMOVE_MEDIA, UPDATE_MEDIA } from '../../../../reducers/types';


export default function FullGalleryPage({ navigation }) {
  const dispatch = useDispatch();
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [cameraRollPermission, setCameraRollPermission] = useState(null);

  const itemRef = useRef(null);

  const [listMedia, setListMedia] = useState(null);

  const newMediaArray = useSelector(state => state.media);

  const userState = useSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaLibraryPermission(status === 'granted'? status : false);
    })();
  }, []);

  const getMedia = async () => {
    const mediaData = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo', 'video'],
      sortBy: ['creationTime'],
      first: 50,
    });
    setListMedia(mediaData);
  };

  useEffect(() => {
    getMedia();
  }, []);

  const addToNewMedia = (item) => {
    const checkItem = newMediaArray;
    if(item.mediaType === 'video'){
      if(checkItem?.length > 0){
        const arrayNew = [...newMediaArray]
        const newIndex = arrayNew.findIndex((e) => {
          return e.id === item.id;
        });
        if(newIndex !== -1){
          arrayNew.splice(newIndex, 1);
          dispatch({ type: REMOVE_ALL_MEDIA });
          // console.log('video item remove');
        }else{
          dispatch({type: ADD_MEDIA, payload: [item] });
          // console.log('video item replace');
        }
        
      }else{
        dispatch({type: ADD_MEDIA, payload: [item] });
        console.log('video item added');
        // console.log('Media Data: ', newMediaArray);
        // console.log('UserData: ', userState);
      }
    }else{
      if(checkItem.length > 0){
        const arrayNew = [...newMediaArray]
        const newIndex = arrayNew.findIndex((e) => {
          return e.id === item.id;
        });
        // console.log(newIndex)
        if(newIndex !== -1){
          arrayNew.splice(newIndex, 1);
          dispatch({ type: ADD_MEDIA, payload: arrayNew });
          // console.log('remove');
        }else{
          dispatch({ type: UPDATE_MEDIA, payload: item });
          // console.log('you add this as well');
        }
      }else{
        dispatch({ type: UPDATE_MEDIA, payload: item });
        // console.log('Add');
      }
    }
  };


  const singleMedia = ({item, index}) => {
    return(
      <TouchableOpacity onPress={() => {
        addToNewMedia(item);
      }}>
        <View style={{
          display: 'flex',
          width: 180,
          height: 180,
          borderRadius: 10,
          flexDirection: 'column',
          marginBottom: 10,
        }}>
          <Image resizeMode='cover' source={{ uri: item.uri }} style={{
            width: 180,
            height: 180,
            borderRadius: 10,
          }} />
          
        </View>
          <View 
            style={{
            display: newMediaArray?.findIndex((e) => {
              return e.id === item.id;
            }) !== -1 ? 'flex' : 'none',
            width: 180,
            height: 180,
            marginTop: -190,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: grey,
            opacity: 0.6,
            }} >
            <Icon 
                type='material-community'
                name='check'
                size={60}
                color={black}
              />
          </View>
      </TouchableOpacity>
    );
  };

  return (
      <View style={{ flex: 1, display: 'flex' }}>
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
            <TouchableOpacity>
              <Icon 
                type='material-community'
                name='checkbox-multiple-blank-outline'
                size={24}
                color={secondary}
              />
            </TouchableOpacity>
          </View>
          
          <View style={{ 
                          flex: 1, 
                          display: 'flex', 
                          paddingLeft: 10, 
                          paddingRight: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                           }}>
              <FlatList 
                horizontal={false}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                data={listMedia?.assets}
                columnWrapperStyle={{ justifyContent: 'space-between'}}
                renderItem={singleMedia}
                pagingEnabled={true}
                
              />

              <TouchableOpacity style={styles.next_button}
                onPress={() => navigation.navigate('PostBody')}
              >
                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  fontStyle: 'normal',
                  color: white,
                }}>
                  Next
                </Text>
              </TouchableOpacity>
          </View>
          

        </View>

  );
}
