import { faEye, faHeart, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { View, Text, FlatList } from 'react-native';
import { Avatar, BottomSheet, Image, } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { black, grey, primary, secondary, white } from '../../../color';
import styles from '../../../styles';
import moment from 'moment';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import { SliderBox } from 'react-native-image-slider-box';
import { Video, AVPlaybackStatus } from 'expo-av';
import { deletePost, likePost } from '../../../actions/post';
import StoriesPage from './Stories';
import CarouselPage from './carousel';
import { useDispatch, useSelector } from 'react-redux';

export default function PostsPage({ postDatas, postTopView }) {
      const dispatch = useDispatch();
      const [selectPostID, setSelectPostID] = useState('');
      const [selectPostByID, setSelectPostByID] = useState('');
      const [bsIsVisible, setBsIsVisible] = useState(false);

      const [activeIndex, setActiveIndex] = useState(0);

      const [videoStatus, setVideoStatus] = useState({});
      const [videoSelectIndex, setVideoSelectIndex] = useState(null);

      const user = useSelector(state => state.auth.user);

      const flatListRef = useRef();
      const videoRef = useRef();

      const [postLimit, setPostLimit] = useState(0);

      const postsArray = postDatas?.posts;
      const inputRef = useRef();

    
  const _renderData = ({item, index}) => {
    return(
      <View 
            key={index}
            style={styles.post_holder}
            >
            
            {/* Image Name Post time */}
            <View style={styles.post_person_holder}>
              <View style={styles.post_person_details}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile', { userData: postDatas })}
                >
                  <Avatar 
                    source={ 
                        postDatas?.photo ? { uri: postDatas?.photo } : require('../../../img/stories/stories4.png') 
                      }
                    size={50}
                    rounded
                    containerStyle={{
                      marginRight: 12,
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.post_person_name_holder}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'Poppins_600SemiBold', }}>{postDatas?.username}</Text>
                  <Text>{moment(item?.createdAt).fromNow()}</Text>
                </View>
              </View>
  
  
              <TouchableOpacity
                onPress={() => {
                  setSelectPostID(item?._id);
                  setSelectPostByID(postDatas?._id);
                  setBsIsVisible(!bsIsVisible);
                }}
              >
                <Icon
                    type='material-community'
                    name='dots-vertical'
                    size={25}
                    color={grey}
                  />
              </TouchableOpacity>
              
            </View>
  
            <View style={styles.post_body_holder}>
              <Text>
                {item?.caption}
              </Text>
              {
                item.media[0].split(".").pop() === 'mp4' ? 
                
                <View style={{
                  flex: 1,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <Video 
                    ref={videoRef}
                    source={{ 
                      uri: item?.media[0]
                    }}
                    style={{
                      display: 'flex',
                      width: ScreenWidth,
                      height: (ScreenWidth * 21) /16,
                      padding: 0,
                    }}
                    useNativeControls={true}
                    resizeMode={Video.RESIZE_MODE_COVER}
                    isLooping={false}
                    onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
                    status={{ shouldPlay: videoSelectIndex === index ? true : false }}
                  />
                  

                  {/* <TouchableOpacity 
                    onPress={() => {
                      if(videoSelectIndex === index){
                        setVideoSelectIndex(null);
                      }else{
                        setVideoSelectIndex(index);
                      }
                    }}
                    style={styles.post_video_icon}>
                    {
                      videoSelectIndex !== index && 
                      
                        <Icon 
                          type='font-awesome'
                          name='play'
                          size={25}
                          color={secondary}
                        />
                    }
                  </TouchableOpacity> */}

                </View>
                
                : 
                <SliderBox 
                  images={item?.media}
                />
              }
            </View>
  
            <View style={styles.post_actions_holder}>
              <View style={styles.post_actions_left}>
                <FontAwesomeIcon 
                  icon={faEye}
                  size={20}
                  color={grey}
                />
                <Text style={styles.post_actions_text}>
                  {item?.postViewBy?.length} Views
                </Text>
              </View>
              <View style={styles.post_actions_right}>
                <TouchableOpacity 
                  onPress={() => dispatch(likePost(item?._id))}
                  style={styles.post_actions_right_item}>
                  <FontAwesomeIcon 
                    icon={faHeart}
                    size={20}
                    color={secondary}
                  />
                  <Text style={styles.post_actions_text, {color: secondary, marginLeft: 5}}>
                    {item?.postLikeBy?.length} 
                  </Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.post_actions_right_item}>
                  <Icon 
                    type='evilicon'
                    name='retweet'
                    size={25}
                    color={grey}
                  />
                  <Text style={styles.post_actions_text}>
                    {item?.repostBy?.length}
                  </Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.post_actions_right_item}>
                  <Icon 
                    type='ionicon'
                    name='chatbubble-outline'
                    containerStyle={{
                      transform: [{scaleX: -1}]
                    }}
                    size={20}
                    color={grey}
                  />
                  <Text style={styles.post_actions_text}>
                    {item?.comments?.length}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={{ display: 'flex', width: '100%', marginTop: 5 }}>
              <TextInput 
                ref={inputRef}
                placeholder='Message' 
                style={styles.comment_box} 
                placeholderTextColor={primary}
                returnKeyType='send'
                onSubmitEditing={(e) => console.log(e.nativeEvent.text)}
                onKeyPress={(e) => {
                  if(e.nativeEvent.key == 'Enter'){
                      console.log('here');
                  }
                }}
                />
            </View>
        </View>
    );
}
// End of render View for post inside homw  


  return (
    <View style={{ flex: 1, backgroundColor: white }}>
          {postsArray !== 'undefined' && <FlatList 
            style={{
              flex: 1,
            }}
            ListHeaderComponent={postTopView}
            ref={flatListRef}
            data={postsArray !== 'undefined' ? postsArray : []}
            renderItem={_renderData}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={5}
            showsVerticalScrollIndicator={false}
          />}

          <BottomSheet 
            isVisible={bsIsVisible}
            containerStyle={{
              backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
              minHeight: '100%',
            }}
          >
            <TouchableOpacity
              onPress={()=> setBsIsVisible(!bsIsVisible)}
              style={{
                display: 'flex',
                width: '100%',
                height: ScreenHeight/2,
              }}
              >
              <View 
              style={{ 
                display: 'flex',
                width: '100%',
                height: '100%',
                 }} ></View>
            </TouchableOpacity>

            <View style={styles.post_bs_view_holder}>
                {
                  user?.user?._id === selectPostByID && <TouchableOpacity 
                  onPress={() => dispatch(deletePost(selectPostID, setBsIsVisible))}
                  style={styles.post_bs_view_touch}>
                  <Icon 
                    type='antdesign'
                    name='delete'
                    size={30}
                    color={black}
                  />
                  <View 
                    style={styles.post_bs_view_details}>
                    <Text 
                      style={styles.post_bs_view_details_text}>
                      Delete this post
                    </Text>
                    <Text style={styles.post_bs_view_details_text_span}>
                      This function delete your post parmanently
                    </Text>
                  </View>
                </TouchableOpacity>
                }

                <TouchableOpacity 
                  onPress={() => console.log('Another action')}
                  style={styles.post_bs_view_touch}>
                  <Icon 
                    type='feather'
                    name='activity'
                    size={30}
                    color={black}
                  />
                  <View 
                    style={styles.post_bs_view_details}>
                    <Text 
                      style={styles.post_bs_view_details_text}>
                      Another Action
                    </Text>
                    <Text style={styles.post_bs_view_details_text_span}>
                      This function take another action
                    </Text>
                  </View>
                </TouchableOpacity>
            </View>
            
          </BottomSheet>
          
        </View>
  );
}
