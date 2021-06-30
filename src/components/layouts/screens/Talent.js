import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, ScrollView, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, getAllUser, unFollowUser } from '../../../actions/user';
import { secondary } from '../../../color';
import styles from '../../../styles';
import HeadNav from '../Header';
import TopScroll from '../TopScroll';
import { useIsFocused } from '@react-navigation/native';

export default function TalentPage({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const talents = useSelector(state => state.user);
  const currentUser = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(getAllUser());
    console.log("Talents: ",talents);
  }, []);

  const render_talent = ({item, index}) => {
    return (
      <View style={styles.talent_holder_item}>
        <View style={styles.talent_name_holder}>
          <Text style={styles.talent_name_text}>
            {item?.username}
          </Text>
          {item?.accountVerified && <Icon
            type='material'
            name='verified'
            size={24}
            color={secondary}
          />}
        </View>
        <Text style={styles.talent_skill_text}>
          {item?.skill?.map(e => e)}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { userData: { user: item} })}>
          <Image 
            source={item?.photo ? {uri: item?.photo} : require('../../../img/blank_image.png')} 
            style={{
              width: 170,
              height: 170,
              marginBottom: 27,
            }}
            resizeMode='cover'
            />
        </TouchableOpacity>

          {item?._id !== currentUser?.user?._id && <View style={styles.talent_follow_holder}>
            {currentUser?.user?.following?.includes(item?._id) ?
              <TouchableOpacity 
                onPress={() => dispatch(unFollowUser(item?._id))}
                style={styles.talent_touchable}> 
                <Text style={styles.talent_touchable_text}>
                  Unfollow
                </Text>
              </TouchableOpacity> : 
              <TouchableOpacity 
                onPress={() => dispatch(followUser(item?._id))}
                style={styles.talent_touchable_2}> 
              <Text style={styles.talent_touchable_text_2}>
                Follow
              </Text>
            </TouchableOpacity>
            }
          </View>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.talent_holder}>
          {isFocused && <FlatList
            horizontal={false}
            numColumns={2}
            data={talents}
            renderItem={render_talent}
            keyExtractor={(item, index) => index.toString()}
          />}
        </View>
     </View>
  );
}
