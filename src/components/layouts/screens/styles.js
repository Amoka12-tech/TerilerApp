import { StyleSheet } from "react-native";
import { black, secondary, white } from "../../../color";

export default StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        padding: 20,
        flexDirection: 'column',
        backgroundColor: white,
    },

    top_nav_holder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        marginBottom: 20,
    },
    
    top_nav_left_holder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    top_nav_left_title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 24,
        fontWeight: '600',
        fontStyle: 'normal',
        marginLeft: 10,
    },

    top_nav_right_title: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        color: secondary,
    },

    top_nav_right_holder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    profile_holder: {
        display: 'flex',
        width: '100%',
    },

    profile_details_holder: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 20,
    },

    profile_user_name: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18,
        fontWeight: '600',
        fontStyle: 'normal',
        marginBottom: 10,
    },

    profile_user_skill: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 12,
    },

    profile_user_location: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 12,
    },

    middle_details_holder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 31,
        marginLeft: 31,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },

    middle_details_item: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    middle_details_item_value: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '500',
    },

    middle_details_item_title: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
    },

    cameraContainer: {
        flex: 1,
        height: '100%',
        backgroundColor: black,
    },

    top_camera_action: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 58,
    },

    bottom_camera_action: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    bottom_camera_action_text: {
        fontSize: 24,
        fontWeight: '600',
        fontStyle: 'normal',
        color: white,
    },

    bottom_camera_action_text_active: {
        fontSize: 24,
        fontWeight: '600',
        fontStyle: 'normal',
        color: secondary,
    },

    bottom_action_holder: {
        display: 'flex',
        width: '100%',
    },

    bottom_camera_button_holder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    capture_camera_button: {
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    camera_direction_holder: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        paddingRight: 30,
    },

    select_gallary_top_holder: {
        marginTop: 50,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    select_gallary_top_action_left: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
    },

    top_text: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 24,
        fontWeight: '600',
        fontStyle: 'normal'
    },

    next_button: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        backgroundColor: secondary,
        borderRadius: 25,
    },

    next_text: {
        fontSize: 18,
        fontWeight: '600',
        fontStyle: 'normal',
        color: white,
    },

    video_preview: {
        alignSelf: 'center',
        width: '100%',
        height: 320,
    },

    playIcon: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    small_image: {
        display: 'flex',
        width: 81,
        height: 81,
        borderRadius: 6,
        marginRight: 10,
    },

    post_view: {
        display: 'flex',
        width: '100%',
    },

    other_user_action_holder: {
        display: 'flex',
        width: '100%',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    other_user_action_item: {
        display: 'flex',
        width: '45%',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondary,
        borderRadius: 5,
    },

    other_user_action_item_text: {
        fontFamily: 'Poppins_600SemiBold',
        fontWeight: '600',
        fontStyle: 'normal',
        fontSize: 16,
        color: white,
    },

    other_user_action_item_2: {
        display: 'flex',
        width: '45%',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
        borderRadius: 5,
        borderStyle: "solid",
        borderColor: secondary,
        borderWidth: 2,
    },

    other_user_action_item_text_2: {
        fontFamily: 'Poppins_600SemiBold',
        fontWeight: '600',
        fontStyle: 'normal',
        fontSize: 16,
        color: secondary,
    },

    touchable_text: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    touchable_text_item: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        color: secondary,
    },

    profile_input: {
        borderBottomWidth: 0,
        height: 20,
    },

    camera_tile_view: {
        display: 'flex',
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 5,
    },

    chat_container: {
        flex: 1,
        padding: 10,
    },

    chatMessageHolder: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },

    chatBodyPreviewHolder: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 15,
        width: '80%'
    },

    chatBodyPreviewTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chatBodyPreviewTextHolder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 4,
    },

    messageNumberText: {
        display: 'flex',
        color: white,
        backgroundColor: secondary,
        height: 18,
        width: 9,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
