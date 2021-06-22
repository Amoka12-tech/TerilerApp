import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import styles from '../../styles';
import Header from './Header';
import { facebookIcon, googleIcon } from '../../img';
import { black } from '../../color';
export default function VerificationPage({ navigation }) {
    const [isVisible, setIsVisible] = useState(true);
    const [passRightIcon, setPassRightIcon] = useState('eye-slash');
    
    const [otp, setOtp] = useState('');
    
    const [otpError, setOtpError] = useState('');
   
    const togglePassword = () => {
        if(isVisible){
            setIsVisible(!isVisible);
            setPassRightIcon('eye');
        }else{
            setIsVisible(!isVisible);
            setPassRightIcon('eye-slash')
        }
    }
  return (
    <ScrollView contentContainerStyle={styles.auth_container} showsHorizontalScrollIndicator={false}>
        <Header />
        <Text style={styles.auth_header_title}>
            Verify your Account
        </Text>
        <View style={styles.auth_form_holder}>

            <Input 
                containerStyle={styles.auth_form_input}
                textContentType='oneTimeCode'
                placeholder='OTP'
                keyboardType='number-pad'
                value={otp}
                onChangeText={(value) => setOtp(value)}
                errorMessage={otpError}
            />
            

            <TouchableOpacity style={styles.auth_Button}
                onPress={() => alert('Verify')}
            >
                <Text style={styles.auth_Button_text}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ marginTop: -20, marginBottom: 40 }}
            >
                <Text style={styles.auth_buttom_resend}>
                    resend OTP
                </Text>
            </TouchableOpacity>


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
