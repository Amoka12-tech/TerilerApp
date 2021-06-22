import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';
import { black } from '../../../color';
import styles from './styles';

import { useFonts, Poppins_900Black, Poppins_900Black_Italic, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import PostPage from '../parts/Posts';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from 'react-native-elements/dist/input/Input';
import { useSelector } from 'react-redux';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function ProfileEditPage({ navigation }) {
    const userData = useSelector((state) => state.auth.user);


    const postDatas = [
        {
          authorID: {
            _id: '0',
            name: 'Amoka Abdulmutalib',
            image: require('../../../img/stories/stories6.png'),
          },
          bodyText: 'We are application developers',
          bodyFile: require('../../../img/sliders/slide2.png'),
          bodyFileType: 'img',
          postViews: '2K Views',
          postLikes: '148',
          postReposts: '245',
          postComments: '120',
        },
        {
          authorID: {
            _id: '1',
            name: 'Ibrahim Sanni',
            image: require('../../../img/stories/stories2.png'),
          },
          bodyText: '',
          bodyFile: require('../../../img/sliders/slide1.png'),
          bodyFileType: 'img',
          postViews: '2K Views',
          postLikes: '148',
          postReposts: '245',
          postComments: '120',
        },
        {
          authorID: {
            _id: '2',
            name: 'Amoka Abdulmutalib',
            image: require('../../../img/stories/stories6.png'),
          },
          bodyText: '',
          bodyFile: require('../../../img/sliders/slide2.png'),
          bodyFileType: 'img',
          postViews: '2K Views',
          postLikes: '148',
          postReposts: '245',
          postComments: '120',
        },
        {
          authorID: {
            _id: '3',
            name: 'Usman Habib',
            image: require('../../../img/stories/stories4.png'),
          },
          bodyText: '',
          bodyFile: require('../../../img/sliders/slide1.png'),
          bodyFileType: 'img',
          postViews: '2K Views',
          postLikes: '148',
          postReposts: '245',
          postComments: '120',
        },
      ];

      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [dateOfBirth, setDateOfBirth] = useState(new Date().toDateString());
      const [userName, setUserName] = useState('');
      const [email, setEmail] = useState(userData?.user?.email);
      const [location, setLocation] = useState('');

      const [showDatePicker, setShowDatePicker] = useState(false);

      const onChangeDOB = (e, selectedDate) => {
          const currentDate = selectedDate;
          setDateOfBirth(currentDate);
      }

    return (
        <View style={styles.container}>
            <View style={styles.top_nav_holder}>
                <View style={styles.top_nav_left_holder}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} size={28} color={black} />
                    </TouchableOpacity>
                    <Text style={styles.top_nav_left_title}>
                        Edit Profile
                    </Text>
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
    
                    <TouchableOpacity style={styles.touchable_text}>
                        <Text style={styles.touchable_text_item}>
                            Change profile picture
                        </Text>
                    </TouchableOpacity>
    
                </View>

    
    
                <View style={styles.post_view}>
                    {/* Edit form here */}
                    <Input 
                        value={firstName}
                        onChangeText={(value) => setFirstName(value)}
                        placeholder='FirstName'
                    />
                    
                    <Input
                        value={lastName}
                        onChangeText={(value) => setLastName(value)}
                        placeholder='LastName'
                    />

                    <Input
                        value={dateOfBirth}
                        placeholder='Date of Birth'
                        onFocus={() => setShowDatePicker(!showDatePicker)}
                    />

                    <Input 
                        value={userName}
                        onChangeText={(value) => setUserName(value)}
                        placeholder='Username'
                    />

                    <Input 
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        placeholder='Email address'
                    />

                    <Input 
                        value={location}
                        onChangeText={(value) => setLocation(value)}
                        textContentType='addressCityAndState'
                        placeholder='State/Country'
                    />
                </View>
                
            </ScrollView>

            <TouchableOpacity style={styles.next_button}>
                <Text style={styles.next_text}>Save</Text>
            </TouchableOpacity>
            
         </View>
      );
  
}
