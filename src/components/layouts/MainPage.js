import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, Text, ScrollView } from 'react-native';
import { Avatar, Icon, Image, Tooltip, BottomSheet } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getAllPost } from '../../actions/post';
import { logout } from '../../actions/user';
import { black, grey, overlayColor, secondary, white } from '../../color';
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
import TopScroll from './TopScroll';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { SliderBox } from 'react-native-image-slider-box';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function MainPage({ navigation }) {

    
    const getItemLayout = (data, index) => {
      return { length: 400, offset: 400 * index, index };
    };
  
    // console.log('User',user);
    // console.log('Post',postInfo);

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


    

    const HomeStack = createStackNavigator();  
    const [selectTop, setSelectTop] = useState(0);

    const scrollToIndexFailed = (error) => {
      const offset = error.averageItemLength * error.index;
      flatListRef.scrollToOffset({offset});
    }    

    let numIn = null;

    const postToggle = (index) => {
      if(numIn === index){
        numIn = null;
        flatListRef.current.scrollToIndex({  animated: true, index: index+1 });
      }else{
        numIn = index;
        flatListRef.current.scrollToIndex({  animated: true, index: index });
      }
    };


    function Home() {
      const dispatch = useDispatch();
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

      useEffect(() => {
        setTimeout(() => {
          dispatch(getAllPost());
        }, 3000);
      }, []);

      const _renderData = ({item, index}) => {
        return(
          <View 
            key={index}
            style={styles.post_holder}
            >
            
            {/* Image Name Post time */}
            <View style={styles.post_person_holder}>
              <View style={styles.post_person_details}>
                <Avatar 
                  source={require('../../img/stories/stories4.png')}
                  size={50}
                  rounded
                  containerStyle={{
                    marginRight: 12,
                  }}
                />
                <View style={styles.post_person_name_holder}>
                  <Text>{item?.postBy?.username}</Text>
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
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <Video 
                    ref={videoRef}
                    style={styles.post_video}
                    source={{ 
                      uri: item?.media[0]
                    }}
                    useNativeControls={false}
                    resizeMode='contain'
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
                          type='font-awesome'
                          name='play'
                          size={25}
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
                <Text style={styles.post_actions_text}>
                  {item?.postViewBy?.length} Views
                </Text>
              </View>
              <View style={styles.post_actions_right}>
                <TouchableOpacity style={styles.post_actions_right_item}>
                  <FontAwesomeIcon 
                    icon={faHeart}
                    size={20}
                    color={secondary}
                  />
                  <Text style={styles.post_actions_text, {color: secondary}}>
                    0 Likes
                  </Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.post_actions_right_item}>
                  <Icon 
                    type='entypo'
                    name='retweet'
                    size={25}
                    color={grey}
                  />
                  <Text style={styles.post_actions_text}>
                    {item?.repostBy?.length} Repost
                  </Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.post_actions_right_item}>
                  <Icon 
                    type='fontisto'
                    name='comment'
                    size={20}
                    color={grey}
                  />
                  <Text style={styles.post_actions_text}>
                    {item?.comments?.length} Comments
                  </Text>
                </TouchableOpacity>
              </View>
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
            keyExtractor={(item, index) => index.toString()}
            pagingEnabled
            initialNumToRender={5}
            ListHeaderComponent={() => {
              return (
                <View>
                  <CarouselPage content={items} setActiveIndex={setActiveIndex} activeIndex={activeIndex} />

                  <View style={styles.stories_scroll_holder}>
                    <Text style={styles.stories_scroll_header}>Stories</Text>
                    <StoriesPage listItem={stories} />
                  </View>
                </View>
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
            <TopScroll navigation={navigation} selectTop={selectTop} setSelectTop={setSelectTop} />
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
