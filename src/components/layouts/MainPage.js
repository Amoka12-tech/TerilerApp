import React, { useEffect, useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { 
          FlatList, 
          TextInput,
          TouchableOpacity,
          View, 
          Text, 
          ScrollView, 
          ActivityIndicator,
          RefreshControl
         } from 'react-native';
import { Avatar, Icon, Image, Tooltip, BottomSheet } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getAllPost, likePost, loadMorePost, refreshAllPost } from '../../actions/post';
import { logout } from '../../actions/user';
import { black, grey, overlayColor, primary, secondary, white } from '../../color';
import styles from '../../styles';
import HeadNav from './Header';
import CarouselPage from './parts/carousel';
import PostsPage from './parts/Posts';
import StoriesPage from './parts/Stories';
import ProfileEditPage from './screens/Edit';
import LocationPage from './screens/Location';
import ProfilePage from './screens/Profile';
import TalentPage from './screens/Talent';
import WorkPage from './screens/Work';
import ChatPage from './screens/Chat';
import TopScroll from './TopScroll';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import { SliderBox } from 'react-native-image-slider-box';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useRoute, useIsFocused } from '@react-navigation/native';
import { createComment } from '../../actions/comment';

export default function MainPage({ navigation, route }) {

    
    const getItemLayout = (data, index) => {
      return { length: 400, offset: 400 * index, index };
    };
  
    // console.log('User',user);
    // console.log('Post',postInfo);

    const HomeStack = createStackNavigator();  
    const [selectTop, setSelectTop] = useState(0);


    function Home({ navigation, route }) {
      const items = [
        {
          text : 'First Slide',
          image : require('../../img/sliders/slide1.png')
        },
        {
          text : 'Second Slide',
          image : require('../../img/sliders/slide2.png')
        },
        {
          text : 'Fourth Slide',
          image : require('../../img/sliders/slide1.png')
        },
        {
          text : 'Last Slide',
          image : require('../../img/sliders/slide2.png')
        },
      ];
  
  
      //Array of latest stories
      const stories = [
        {
          key : '0',
          image : require('../../img/stories/stories6.png')
        },
        {
          key : '1',
          image : require('../../img/stories/stories1.png')
        },
        {
          key : '2',
          image : require('../../img/stories/stories2.png')
        },
        {
          key : '3',
          image : require('../../img/stories/stories3.png')
        },
        {
          key : '4',
          image : require('../../img/stories/stories4.png')
        },
        {
          key : '5',
          image : require('../../img/stories/stories5.png')
        },
        {
          key : '6',
          image : require('../../img/stories/stories6.png')
        },
      ];

      const dispatch = useDispatch();
      const routeName = route.name;
      const routeFocused = useIsFocused();
      const [selectPostID, setSelectPostID] = useState('');
      const [selectPostByID, setSelectPostByID] = useState('');
      const [bsIsVisible, setBsIsVisible] = useState(false);

      const [activeIndex, setActiveIndex] = useState(0);

      const [videoStatus, setVideoStatus] = useState({});
      const [videoSelectIndex, setVideoSelectIndex] = useState(null);

      const user = useSelector(state => state.auth.user);
      const postInfo = useSelector(state => state.post);

      const flatListRef = useRef();
      const videoRef = useRef();

      const [postSkip, setPostSkip] = useState(0);
      const [postLimit, setPostLimit] = useState(5);
      const [postLoad, setPostLoad] = useState(false);
      const [loadingMore, setLoadingMore] = useState(false);
      const [isRefreshing, setIsRefreshing] = useState(false);

      useEffect(() => {
        if(postLoad === false){
          setTimeout(() => {
            dispatch(getAllPost(postSkip, setPostSkip, postLimit, setPostLimit));
            setPostLoad(true);
          }, 3000);
        }
      }, []);

      const postComment =(id, text) => {
        const body = {
          text: text,
        };
        dispatch(createComment(id, body));
      }

      const onRefresh = React.useCallback(() => {
        const skip = 0;
        const limit = 5;
        if(!isRefreshing){
          dispatch(refreshAllPost(skip, setPostSkip, limit, setPostLimit, setIsRefreshing));
        }
      });

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
                  onPress={() => navigation.navigate('Profile', { userData: { user: item?.postBy} })}
                >
                  <Avatar 
                    source={item?.postBy?.photo ? { uri: item?.postBy?.photo } : require('../../img/stories/stories4.png')}
                    size={50}
                    rounded
                    containerStyle={{
                      marginRight: 12,
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.post_person_name_holder}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'Poppins_600SemiBold', }}>{item?.postBy?.username}</Text>
                  <Text>{moment(item?.createdAt).fromNow()}</Text>
                </View>
              </View>
  
  
              <TouchableOpacity
                onPress={() => {
                  setSelectPostID(item?._id);
                  setSelectPostByID(item?.postBy?._id);
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
                      height: ScreenWidth,
                      padding: 0,
                    }}
                    resizeMode={Video.RESIZE_MODE_CONTAIN}
                    isLooping={false}
                    onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
                    status={{ shouldPlay: videoSelectIndex === index ? true : false }}
                  />
                  

                  <TouchableOpacity 
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
                          type='antdesign'
                          name='play'
                          size={45}
                          color={secondary}
                        />
                    }
                  </TouchableOpacity>

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
                placeholder='Message' 
                style={styles.comment_box} 
                placeholderTextColor={primary}
                returnKeyType='send'
                onSubmitEditing={(e) => {
                  const message = e.nativeEvent.text;
                  postComment(item?._id, message);
                }}
                />
            </View>
        </View>
        );
    }
    // End of render View for post inside homw


      return (
        <View style={styles.container}>
          <FlatList 
            style={{
              flex: 1,
            }}
            ref={flatListRef}
            data={postInfo}
            renderItem={_renderData}
            refreshControl={
              <RefreshControl 
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor={secondary}
                colors={[secondary]}
                title="Pull to refresh"
                titleColor={secondary}
              />
            }
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if(loadingMore === false && postInfo.length > 0){
                dispatch(loadMorePost(postSkip, setPostSkip, postLimit, setPostLimit, setLoadingMore));
              }
            }}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            onScrollToTop={() => console.log('we want refresh')}
            ListHeaderComponent={() => {
              return (
                <View>
                  <SliderBox 
                    images={items.map(e => e.image)}
                    ImageComponentStyle={{
                      height: 80, 
                      borderColor: secondary, 
                      borderWidth: 5
                    }}
                  />

                  <View style={styles.stories_scroll_holder}>
                    <Text style={styles.stories_scroll_header}>Stories</Text>
                    <StoriesPage listItem={stories} />
                  </View>
                </View>
              );
            }}
            ListFooterComponent={() => {
              return (
                postLoad !== false ? <View style={styles.load_more_holder}>
                  <View>
                    {loadingMore ? <ActivityIndicator size="large" color={secondary} /> : 
                    <ActivityIndicator size="large" color={secondary} />
                    }
                  </View>
                </View>
                : <View />
              );
            }}
          />

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
                  onPress={() => navigation.navigate('Chat', {
                    screen: user?.user?._id === selectPostByID ? '' : 'SingleChat',
                    id: selectPostByID,
                  })}
                  style={styles.post_bs_view_touch}>
                  <Icon 
                    type='ionicon'
                    name='chatbubble-outline'
                    size={30}
                    color={black}
                  />
                  <View 
                    style={styles.post_bs_view_details}>
                    <Text 
                      style={styles.post_bs_view_details_text}>
                      Chat
                    </Text>
                    <Text style={styles.post_bs_view_details_text_span}>
                      This function allow you to chat with user
                    </Text>
                  </View>
                </TouchableOpacity>
            </View>
            
          </BottomSheet>
          
        </View>
      );
    };

  return (
    <HomeStack.Navigator  screenOptions={{ 
      headerShown: true,
      header: ({ navigation }) => {
        return (
          <View style={{ 
              display: 'flex', 
              width: '100%', 
              height: 150, 
              backgroundColor: white,
               }}>
            <HeadNav navigation={navigation} />
            <TopScroll navigation={navigation} route={route} />
          </View>
        );
      }
     }}>
      <HomeStack.Screen name='MainHome' component={Home} />
      <HomeStack.Screen name='Profile' options={{ headerShown: false }} component={ProfilePage} />
      <HomeStack.Screen name='ProfileEdit' options={{ headerShown: false }} component={ProfileEditPage} />
      <HomeStack.Screen name='Talent' component={TalentPage}  />
      <HomeStack.Screen name='Work' component={WorkPage} />
      <HomeStack.Screen name='Location' component={LocationPage} />
    </HomeStack.Navigator>
  );
}
