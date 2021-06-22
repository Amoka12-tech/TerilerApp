import { faHeart, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, FlatList } from 'react-native';
import { Avatar,Image } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { grey, secondary } from '../../../color';
import styles from '../../../styles';
import moment from 'moment';

export default function PostsPage({postDatas}) {
    const _renderData = (item, index) => {
        return(
          <View 
            key={index}
            style={styles.post_holder}
          >
            {/* Image Name Post time */}
            <View style={styles.post_person_holder}>
              <View style={styles.post_person_details}>
                <Avatar 
                  source={require('../../../img/stories/stories4.png')}
                  size={50}
                  rounded
                  containerStyle={{
                    marginRight: 12,
                  }}
                />
                <View style={styles.post_person_name_holder}>
                  <Text>{item?.postBy?.email}</Text>
                  <Text>{moment(item?.createdAt).fromNow()}</Text>
                </View>
              </View>

              <Icon
                type='material-community'
                name='dots-vertical'
                size={25}
                color={grey}
              />
            </View>

            <View style={styles.post_body_holder}>
              <Text>
                {item?.caption}
              </Text>
              <Image 
                containerStyle={styles.postImage}
                source={{ uri: item?.media[0] }}
                resizeMode='cover'
              />
            </View>

            <View style={styles.post_actions_holder}>
              <View style={styles.post_actions_left}>
                <Text style={styles.post_actions_text}>
                  {/* {item.postViews} */}0
                </Text>
              </View>
              <View style={styles.post_actions_right}>
                <TouchableOpacity style={styles.post_actions_right_item}>
                  <FontAwesomeIcon 
                    icon={faHeart}
                    size={20}
                    color={secondary}
                  />
                  <Text style={styles.post_actions_text, {color: secondary}}>
                    {/* {item.postLikes} */}0
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.post_actions_right_item}>
                  <Icon 
                    type='entypo'
                    name='retweet'
                    size={25}
                    color={grey}
                  />
                  <Text style={styles.post_actions_text}>
                    {/* {item.postReposts} */}0
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.post_actions_right_item}>
                  <Icon 
                    type='fontisto'
                    name='comment'
                    size={20}
                    color={grey}
                  />
                  <Text style={styles.post_actions_text}>
                    {/* {item.postReposts} */}0
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
        );
    }
  return (
    <View>
      {postDatas.map((item, index) => _renderData(item, index))}
    </View>
  );
}
