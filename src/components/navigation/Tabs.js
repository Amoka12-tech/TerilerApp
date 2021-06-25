import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TimeLine } from '../layouts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faCameraRetro, faComment, faCommentAlt, faEnvelope, faHome, faInbox, faPhotoVideo, faSms, faVideo } from '@fortawesome/free-solid-svg-icons';
import { secondary, white } from '../../color';
import MessagePage from '../layouts/screens/Messaeg';
import PostPage from '../layouts/screens/post/Post';
import ChatPage from '../layouts/screens/Chat';
import NotificationPage from '../layouts/screens/Notification';
import ProfilePage from '../layouts/screens/Profile';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import CameraPage from '../layouts/screens/post/Camera';
import GalleryPage from '../layouts/screens/post/Gallery';
import FullGalleryPage from '../layouts/screens/post/FullGallery';
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const PostStack = createStackNavigator();

const PostStackScreen = () => {
    return(
        <PostStack.Navigator mode="modal" screenOptions={{ 
            headerShown: false
         }} >
             <PostStack.Screen 
                name="Camera"
                component = {CameraPage}
             />
             <PostStack.Screen 
                name="PostBody"
                component = {PostPage}
             />
             <PostStack.Screen 
                name = "Gallery"
                component = {GalleryPage}
             />
             <PostStack.Screen 
                name = "FullGallery"
                component = {FullGalleryPage}
             />
         </PostStack.Navigator>
    );
};

export default function MainTabs() {
     return (
    <Tab.Navigator 
        tabBarOptions={{
            showLabel: false,
        }}
        >
        <Tab.Screen 
            name='Main'
            component={TimeLine}
            options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: focused? secondary : white,
                            borderRadius: 50,
                            position : 'absolute',
                            bottom : focused? 20 : 0,
                        }}
                    >
                        <Icon 
                            type='entypo'
                            name='home'
                            size={30}
                            color={ focused? white : secondary }
                        />
                    </View>
                )
            }}
        />

<Tab.Screen 
            name='Message'
            component={MessagePage}
            options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: focused? secondary : white,
                            borderRadius: 50,
                            position : 'absolute',
                            bottom : focused? 20 : 0,
                        }}
                    >
                        <Icon 
                            type='fontisto'
                            name='email'
                            size={25}
                            color={ focused? white : secondary }
                        />
                    </View>
                )
            }}
        />

<Tab.Screen 
            name='Post'
            component={PostStackScreen}
            options={{
                tabBarVisible: false,
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: focused? secondary : white,
                            borderRadius: 50,
                            position : 'absolute',
                            bottom : focused? 0 : 0,
                        }}
                    >
                        <Icon 
                            type='material-community'
                            name='video-plus'
                            size={35}
                            color={ focused? white : secondary }
                        />
                    </View>
                )
            }}
        />

<Tab.Screen 
            name='Chat'
            component={ChatPage}
            options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: focused? secondary : white,
                            borderRadius: 50,
                            position : 'absolute',
                            bottom : focused? 20 : 0,
                        }}
                    >
                        <Icon 
                            type='ionicon'
                            name='chatbubble-outline'
                            size={25}
                            color={ focused? white : secondary }
                        />
                    </View>
                )
            }}
        />

<Tab.Screen 
            name='Notification'
            component={NotificationPage}
            options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: focused? secondary : white,
                            borderRadius: 50,
                            position : 'absolute',
                            bottom : focused? 20 : 0,
                        }}
                    >
                        <Icon 
                            type='material-community'
                            name='bell-outline'
                            size={30}
                            color={ focused? white : secondary }
                        />
                        
                    </View>
                )
            }}
        />
    </Tab.Navigator>
  );
}
