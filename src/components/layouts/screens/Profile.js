import React, { useEffect } from 'react';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { black } from '../../../color';
import styles from './styles';

import { useFonts, Poppins_900Black, Poppins_900Black_Italic, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import PostPage from '../parts/Posts';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../actions/user';

export default function ProfilePage({ route, navigation }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    const getPostData = useSelector(state => state.user);
    const { userData } = route.params;
    useEffect(() => {
        dispatch(getUser(userData?.user?._id));
        // console.log(userData?.user?._id);
    }, []);
    
    const postDatas = getPostData;
    // console.log("Post: ",postDatas?.posts);

    const postTopView = () => {
        return <>
            <View style={styles.profile_details_holder}>
                    <Image 
                        source={postDatas?.photo ? {uri: postDatas?.photo} : require('../../../img/blank_image.png')} 
                        containerStyle={{ 
                            width: 100, 
                            height: 100, 
                            borderRadius: 5,
                            marginBottom: 20,
                            }} />
    
                    <Text style={styles.profile_user_name}>
                        {postDatas?.firstname && postDatas?.firstname} {`  `} {postDatas?.lastname && postDatas?.lastname}
                    </Text>
    
                    <Text style={styles.profile_user_skill}>
                        {postDatas?.skill && postDatas?.skill}
                    </Text>
                    <Text style={styles.profile_user_location}>
                        {postDatas.location && postDatas?.location?.city} {`/`} {postDatas.location && postDatas?.location?.country}
                    </Text>
                </View>
                

                {postDatas?._id !== currentUser?.user?._id && <View style={styles.other_user_action_holder}>
                    <TouchableOpacity style={styles.other_user_action_item}>
                        {postDatas?.followers?.includes(currentUser?.user?._id) ? 
                            <Text style={styles.other_user_action_item_text}>
                                Unfollow
                            </Text> :
                            <Text style={styles.other_user_action_item_text}>
                                Follow
                            </Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.other_user_action_item_2}>
                        <Text style={styles.other_user_action_item_text_2}>
                            Message
                        </Text>
                    </TouchableOpacity>
                </View>}
    
                <View style={styles.middle_details_holder}>
                    <View style={styles.middle_details_item}>
                        <Text style={styles.middle_details_item_value}>
                            {postDatas?.followers?.length}
                        </Text>
                        <Text style={styles.middle_details_item_title}>Followers</Text>
                    </View>
    
                    <View style={styles.middle_details_item}>
                        <Text style={styles.middle_details_item_value}>
                            {postDatas?.posts?.length}
                        </Text>
                        <Text style={styles.middle_details_item_title}>Posts</Text>
                    </View>
    
                    <View style={styles.middle_details_item}>
                        <Text style={styles.middle_details_item_value}>
                            {postDatas?.followers?.length}
                        </Text>
                        <Text style={styles.middle_details_item_title}>Following</Text>
                    </View>
                </View>
        </>
    };

    return (
        <View style={styles.container}>
            <View style={styles.top_nav_holder}>
                <View style={styles.top_nav_left_holder}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainHome')}>
                        <FontAwesomeIcon icon={faArrowLeft} size={28} color={black} />
                    </TouchableOpacity>
                    <Text style={styles.top_nav_left_title}>
                        Profile
                    </Text>
                </View>
                <View style={styles.top_nav_right_holder}>
                    {postDatas?._id === currentUser?.user?._id &&
                        <TouchableOpacity onPress={()=>navigation.navigate('ProfileEdit')}>
                        <FontAwesomeIcon icon={faEdit} size={28} color={black} />
                    </TouchableOpacity>}
                </View>
            </View>
                <PostPage postDatas={postDatas} postTopView={postTopView} />
         </View>
      );
  
};
