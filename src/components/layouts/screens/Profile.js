import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';
import { black } from '../../../color';
import styles from './styles';

import { useFonts, Poppins_900Black, Poppins_900Black_Italic, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import PostPage from '../parts/Posts';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

export default function ProfilePage({ navigation }) {
    const postDatas = useSelector((state) => state.post);

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
                    <TouchableOpacity onPress={()=>navigation.navigate('ProfileEdit')}>
                        <FontAwesomeIcon icon={faEdit} size={28} color={black} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={styles.profile_holder}>
                
                <View style={styles.profile_details_holder}>
                    <Image 
                        source={require('../../../img/defaultProfile.png')} 
                        containerStyle={{ 
                            width: 100, 
                            height: 100, 
                            borderRadius: 5,
                            marginBottom: 20,
                            }} />
    
                    <Text style={styles.profile_user_name}>
                        Israel Ayemere
                    </Text>
    
                    <Text style={styles.profile_user_skill}>
                        UI/UX $ Product Designer
                    </Text>
                    <Text style={styles.profile_user_location}>
                        Abuja, Nigeria
                    </Text>
                </View>

                <View style={styles.other_user_action_holder}>
                    <TouchableOpacity style={styles.other_user_action_item}>
                        <Text style={styles.other_user_action_item_text}>
                            Follow
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.other_user_action_item_2}>
                        <Text style={styles.other_user_action_item_text_2}>
                            Message
                        </Text>
                    </TouchableOpacity>
                </View>
    
                <View style={styles.middle_details_holder}>
                    <View style={styles.middle_details_item}>
                        <Text style={styles.middle_details_item_value}>0</Text>
                        <Text style={styles.middle_details_item_title}>Followers</Text>
                    </View>
    
                    <View style={styles.middle_details_item}>
                        <Text style={styles.middle_details_item_value}>0</Text>
                        <Text style={styles.middle_details_item_title}>Posts</Text>
                    </View>
    
                    <View style={styles.middle_details_item}>
                        <Text style={styles.middle_details_item_value}>0</Text>
                        <Text style={styles.middle_details_item_title}>Following</Text>
                    </View>
                </View>
    
                <View style={styles.post_view}>
                    {/* <PostPage /> */}
                </View>
            </ScrollView>
         </View>
      );
  
}
