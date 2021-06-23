import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { Image, LinearProgress } from 'react-native-elements';
import { black, secondary } from '../../../color';
import styles from './styles';

import { useFonts, Poppins_900Black, Poppins_900Black_Italic, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import PostPage from '../parts/Posts';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from 'react-native-elements/dist/input/Input';
import { useDispatch, useSelector } from 'react-redux';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { updateProfilePicture } from '../../../actions/user';

export default function ProfileEditPage({ navigation }) {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.user);
    const [selectImage, setSelectImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progressCount, setProgressCount] = useState('0%');


      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [dateOfBirth, setDateOfBirth] = useState('09-10-2020');
      const [userName, setUserName] = useState('');
      const [email, setEmail] = useState(userData?.user?.email);
      const [location, setLocation] = useState('');

      const [showDatePicker, setShowDatePicker] = useState(false);

      const onChangeDOB = (e, selectedDate) => {
          const currentDate = selectedDate;
          setDateOfBirth(currentDate);
      }

      const configProgress =  {
        onUploadProgress: progressEvent =>  setProgressCount(`${Math.round((100 * progressEvent.loaded) / progressEvent.total)}%`),
      };

      const handleImage = async () => {
          //get camera permissions
          await ImagePicker.requestCameraPermissionsAsync();
          await ImagePicker.requestMediaLibraryPermissionsAsync();
          //Check parmision
          const { status } = await ImagePicker.getCameraPermissionsAsync();
          if(status !== 'granted'){
            alert('Sorry, we need camera roll permissions to make this work!');
          }else{
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                base64: true,
            });
            if(result.cancelled === true){
                const pickResult = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                });
                if(pickResult.cancelled !== true){
                    const thisMedia = `data:image/jpeg;base64,${pickResult.base64}`;
                    const body = {
                        base64media: thisMedia,
                    };
                    setSelectImage(pickResult.uri);
                    dispatch(updateProfilePicture(body, setIsLoading, configProgress));
                }
            }else{
                const thisMedia = `data:image/jpeg;base64,${result.base64}`;
                const body = {
                    base64media: thisMedia,
                };
                setSelectImage(result.uri);
                dispatch(updateProfilePicture(body, setIsLoading, configProgress));
            }
          }
        //   const mediaObject = {
        //     "mediaBinary": thisMedia,
        //     "ContentType": thisMediaExec,
        //   };

        //   const body = {
        //     base64media: mediaObject,
        //   }
      };

      const onProfileEdit = () => {};

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
                    <View style={{
                        display: 'flex',
                        marginBottom: 20,
                        width: 100,
                        height: 100,
                        borderRadius: 5,
                        }}>
                        <Image 
                            source= {selectImage !== null ? { uri: selectImage } : require('../../../img/defaultProfile.png')} 
                            containerStyle={{ 
                                width: 100, 
                                height: 100, 
                                borderRadius: 5,
                                }} />
                        {isLoading && <View style={{
                                width: 100,
                                height: 100,
                                borderRadius: 5,
                                backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
                                position: 'absolute',
                                top: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <LinearProgress style={{
                                width: progressCount,
                            }} 
                                color={secondary}
                                />
                            <Text style={{
                                fontSize: 18,
                                color: secondary,
                                textAlign: 'center',
                            }}>{progressCount}</Text>
                        </View>}
                    </View>
    
                    <TouchableOpacity 
                        disabled={isLoading? true : false}
                        onPress={handleImage}
                        style={styles.touchable_text}>
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
