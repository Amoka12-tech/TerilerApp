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
import { useDispatch } from 'react-redux';
import { login, testReducer } from '../../actions/auth';
import { END_PROCESS } from '../../reducers/types';
export default function LoginPage({ navigation }) {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(true);
    const [passRightIcon, setPassRightIcon] = useState('eye-slash');
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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
        setEmailError('');
        setPasswordError('');
        if(email === ''){
            setEmailError('Email is required');
        }else if(password === ''){
            setPasswordError('Password is required');
        }else{
            dispatch(login(email, password));
        }
    };
  return (
    <ScrollView contentContainerStyle={styles.auth_container} showsHorizontalScrollIndicator={false}>
        <Header />
        <Text style={styles.auth_header_title}>
            Login to your Account
        </Text>
        <View style={styles.auth_form_holder}>

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
                <Text style={styles.auth_Button_text}>Sign in</Text>
            </TouchableOpacity>

            <Text style={styles.auth_buttom_text}>
                -Or sign in with-
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
                    Don't have an account?  
                </Text>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('Register')}
                >
                    <Text style={styles.auth_other_text_right}>
                        Sign up
                    </Text>
                </TouchableOpacity>
            </View>
            
        </View>
    </ScrollView>
  );
}
