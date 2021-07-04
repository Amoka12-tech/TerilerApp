import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import styles from '../../styles';
import Header from './Header';
import { facebookIcon, googleIcon } from '../../img';
import { black } from '../../color';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/auth';
import * as Network from 'expo-network';
import getLocation from '../../actions/others';

export default function RegisterPage({ navigation }) {
    const userData = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(true);
    const [passRightIcon, setPassRightIcon] = useState('eye-slash');
    
    const [fullName, setFullName] = useState('');
    const [locationName, setLocationName] = useState('');
    const [skill, setSkill] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [fullNameError, setFullNameError] = useState('');
    const [locationNameError, setLocationNameError] = useState('');
    const [skillError, setSkillError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if(!!userData){
          navigation.navigate('Login');
      }
    //   getLocation(setLocationName);
    }, [userData]);


    const togglePassword = () => {
        if(isVisible){
            setIsVisible(!isVisible);
            setPassRightIcon('eye');
        }else{
            setIsVisible(!isVisible);
            setPassRightIcon('eye-slash')
        }
    };
    const onSubmit = () => {
        setFullNameError('');
        setEmailError('');
        setPasswordError('');
        if(fullName === ''){
            setFullNameError('Your name is required');
        }else if(email === ''){
            setEmailError('Please provide an email address');
        }else if(password === ''){
            setPasswordError('Please provide a secure password');
        }else{
            const body = {
                "username": fullName,
                "email": email,
                "password": password,
            };
            dispatch(register(body));
        }
    };
  return (
    <ScrollView contentContainerStyle={styles.auth_container} showsHorizontalScrollIndicator={false}>
        <Header />
        <Text style={styles.auth_header_title}>
            Create your Account
        </Text>
        <View style={styles.auth_form_holder}>
            <Input 
                containerStyle={styles.auth_form_input}
                textContentType='username'
                placeholder="Username"
                value={fullName}
                onChangeText={(value) => setFullName(value)}
                errorMessage={fullNameError}
            />

            <Input 
                containerStyle={styles.auth_form_input}
                textContentType='emailAddress'
                placeholder='Email'
                keyboardType='email-address'
                value={email}
                onChangeText={(value) => setEmail(value)}
                errorMessage={emailError}
            />
            <Input
                containerStyle={styles.auth_form_input}
                textContentType='password'
                placeholder="Password"
                keyboardType='default'
                value={password}
                onChangeText={(value) => setPassword(value)}
                errorMessage={passwordError}
                secureTextEntry={isVisible}
                rightIcon={
                    <Icon 
                        name={passRightIcon}
                        type='font-awesome'
                        color={black}
                        onPress={togglePassword}
                    />
                }
            />

            <TouchableOpacity style={styles.auth_Button}
                onPress={onSubmit}
            >
                <Text style={styles.auth_Button_text}>Signup</Text>
            </TouchableOpacity>

            <Text style={styles.auth_buttom_text}>
                -Or sign up with-
            </Text>

            <View style={styles.auth_social_icon_holder}>
                <TouchableOpacity style={{ marginRight: 79 }}>
                    <Image style={styles.auth_Icon} resizeMode='contain' source={facebookIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.auth_Icon} source={googleIcon} resizeMode='contain' />
                </TouchableOpacity>
            </View>

            <View style={styles.auth_other_text_holder}>
                <Text style={styles.auth_other_text_left}>
                    Have an account? 
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.auth_other_text_right}>
                        Sign in
                    </Text>
                </TouchableOpacity>
            </View>
            
        </View>
    </ScrollView>
  );
}
