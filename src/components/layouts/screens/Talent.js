import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, ScrollView, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../../actions/user';
import { secondary } from '../../../color';
import styles from '../../../styles';
import HeadNav from '../Header';
import TopScroll from '../TopScroll';

export default function TalentPage({ navigation }) {
  const dispatch = useDispatch();

  const talents = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const render_talent = ({item, index}) => {
    return (
      <View style={styles.talent_holder_item}>
        <View style={styles.talent_name_holder}>
          <Text style={styles.talent_name_text}>
            {item.name}
          </Text>
          <Icon
            type='material'
            name='verified'
            size={24}
            color={secondary}
          />
        </View>
        <Text style={styles.talent_skill_text}>
          {item.skill}
        </Text>
        <Image 
          source={require('../../../img/blank_image.png')} 
          style={{
            width: 170,
            height: 170,
            marginBottom: 27,
          }}
          resizeMode='cover'
          />

          <View style={styles.talent_follow_holder}>
            <TouchableOpacity style={styles.talent_touchable}>
              <Text style={styles.talent_touchable_text}>
                Follow
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.talent_holder}>
          <FlatList
            horizontal={false}
            numColumns={2}
            data={[
              {
                name: 'George Jude',
                skill: 'Driver',
              },
              {
                name: 'Amaka Smith',
                skill: 'Fashion Designer',
              }
            ]}
            renderItem={render_talent}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
     </View>
  );
}
