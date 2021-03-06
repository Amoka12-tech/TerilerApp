import React, { useEffect, useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { 
          FlatList, 
          TextInput,
          TouchableOpacity,
          View, 
          Text,
          ActivityIndicator,
          RefreshControl
         } from 'react-native';
import { Avatar, Icon, Image, Tooltip, BottomSheet } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getAllPost, likePost, loadMorePost, refreshAllPost, rePost } from '../../actions/post';
import { black, grey, overlayColor, primary, secondary, white } from '../../color';
import styles from '../../styles';
import HeadNav from './Header';
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
import SinglePostPage from './screens/SinglePost';

export default function MainPage({ navigation, route }) {

    const HomeStack = createStackNavigator();  
    const [selectTop, setSelectTop] = useState(0);

    //Home Component
    function Home({ navigation, route }) {

      //Dommy array for top slides
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
      const [selectUser, setSelectUser] = useState(null);
      const [bsIsVisible, setBsIsVisible] = useState(false);

      const [activeIndex, setActiveIndex] = useState(0);

      const [videoStatus, setVideoStatus] = useState({});
      const [videoSelectIndex, setVideoSelectIndex] = useState(null);

      const user = useSelector(state => state.auth.user);
      const postInfo = useSelector(state => state.post);

      const flatListRef = useRef();
      const videoRef = useRef();
      const inputRef = useRef();

      const [postSkip, setPostSkip] = useState(0);
      const [postLimit, setPostLimit] = useState(5);
      const [postLoad, setPostLoad] = useState(false);
      const [loadingMore, setLoadingMore] = useState(false);
      const [isRefreshing, setIsRefreshing] = useState(false);

      //Use effect to load post first time
      useEffect(() => {
        if(postLoad === false){
          setTimeout(() => {
            dispatch(getAllPost(postSkip, setPostSkip, postLimit, setPostLimit));
            setPostLoad(true);
          }, 3000);
        }
      }, []);

      //Send comment on post
      const postComment =(item, text, ref) => {
        const body = {
          text: text,
        };
        ref.current.clear();
        dispatch(createComment(item._id, body));
      };

      // get Update All post list from Api
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
            
            {/* Image Name PostBy time */}
            <View style={styles.post_person_holder}>
              <View style={styles.post_person_details}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile', { userData: { user: item?.postBy} })}
                >
                  <Avatar 
                    source={item?.postBy?.photo ? { uri: item?.postBy?.photo } : require('../../img/blank_image.png')}
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
                  setSelectUser(item?.postBy);
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
            
            {/* Post Original Author Holder if repost */}
            {!!item?.originalAuthor && <View style={styles.post_person_holder, { marginBottom: 5 }}>
              <View style={styles.post_person_details}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile', { userData: { user: item?.postBy} })}
                >
                  <Avatar 
                    source={item?.originalAuthor?.photo ? { uri: item?.originalAuthor?.photo } : require('../../img/blank_image.png')}
                    size={30}
                    rounded
                    containerStyle={{
                      marginRight: 12,
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.post_person_name_holder}>
                  <Text style={{ fontWeight: 'bold', fontSize: 11, fontFamily: 'Poppins_600SemiBold', }}>{item?.originalAuthor?.username}</Text>
                </View>
              </View>
  
              
            </View>}
            
            {/* Post body Holder */}
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
            
            {/* Post Action key Holder */}
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
  
                <TouchableOpacity 
                  onPress={() => dispatch(rePost(item?._id))}
                  style={styles.post_actions_right_item}>
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
  
                <TouchableOpacity 
                  onPress={() => navigation.navigate('SinglePost', { item })}
                  style={styles.post_actions_right_item}>
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
            
            {/* Post Comment Box Holder */}
            <View style={{ display: 'flex', width: '100%', marginTop: 5 }}>
              <TextInput 
                ref={inputRef}
                placeholder='Message' 
                style={styles.comment_box} 
                placeholderTextColor={primary}
                returnKeyType='send'
                onSubmitEditing={(e) => {
                  const message = e.nativeEvent.text;
                  postComment(item, message, inputRef);
                }}
                />
            </View>
        </View>
        );
    }
    // End of render View for post inside homw


      return (
        <View style={styles.container}>
          {/* FlatList component */}
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

          {/* Eact Post BottomSheet Component with set postBy ID */}
          <BottomSheet 
            isVisible={bsIsVisible}
            containerStyle={{
              backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
              minHeight: '100%',
            }}
          >
            {/* Touch ovaley to dismissed ButtomSheet */}
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

              {/* Touchable to delete selected post if postByID is logged in ID */}
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

                {/* Touchable to open chat list if selected postByID not logged In ID open Single Chat */}
                <TouchableOpacity 
                  onPress={() => {
                    navigation.navigate('Chat', {
                      screen: user?.user?._id === selectPostByID ? 'ChatMain' : 'SingleChat',
                      params: { 
                                id: selectPostByID,
                                user: selectUser,
                              },
                    });
                  }}
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
      <HomeStack.Screen name='SinglePost' options={{ headerShown: false }} component={SinglePostPage} />
      <HomeStack.Screen name='Talent' component={TalentPage}  />
      <HomeStack.Screen name='Work' component={WorkPage} />
      <HomeStack.Screen name='Location' component={LocationPage} />
    </HomeStack.Navigator>
  );
}
