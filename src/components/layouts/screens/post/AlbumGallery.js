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


export default function AlbumGalleryPage({ navigation }) {
  const dispatch = useDispatch();
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [cameraRollPermission, setCameraRollPermission] = useState(null);

  const itemRef = useRef(null);

  const [albumArray, setAlbumArray] = useState([]);

  const userState = useSelector(state => state.auth);

  const getAlbum = async () => {
    const albumData = await MediaLibrary.getAlbumsAsync();
    for ( const key of Object.keys(albumData)){
         const link = await getMedia(albumData[key].id);
         albumData[key].uri = link;
    }
    setAlbumArray(albumData);
  };

  const getMedia = async (id) => {
      const mediaData = await MediaLibrary.getAssetsAsync({
          album: id,
          mediaType: ['video','photo','audio'],
          sortBy: ['creationTime'],
          first: 1,
      });
      return mediaData?.assets[0]?.uri;
  };

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaLibraryPermission(status === 'granted'? status : false);
      if(status === 'granted'){
          getAlbum();
      }
    })();
  }, []);



  const singleMedia = ({item, index}) => {
    return(
      <TouchableOpacity onPress={() => {
        navigation.navigate('FullGallery', { id: item?.id })
      }}>
        <View style={{
          display: 'flex',
          width: 180,
          height: 180,
          borderRadius: 10,
          flexDirection: 'column',
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
            }}>
          <Image resizeMode='cover' source={{ uri: item?.uri }} style={{
            width: 140,
            height: 140,
            borderRadius: 10,
          }} />

            <Text style={{
              fontSize: 14,
              color: black,
              textAlign: 'center',
            }}>{item?.title}</Text>

            <Text style={{
              fontSize: 14,
              color: black,
              textAlign: 'center',
            }}>{item?.assetCount}</Text>
          
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
                Album
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
                data={albumArray}
                columnWrapperStyle={{ justifyContent: 'space-between'}}
                renderItem={singleMedia}
                pagingEnabled={true}
              />

              
          </View>
          

        </View>

  );
}
