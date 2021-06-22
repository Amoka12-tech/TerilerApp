import { StyleSheet } from "react-native";
import { black, grey, primary, secondary, white } from "../color";
import { Pop } from '@expo-google-fonts/inter';
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";
export default StyleSheet.create({
    //Status Bar Style
    statusBar: {
        backgroundColor: 'transparent',
        color: black
    },

    divider: {
        width: '100%',
        height: 3,
        backgroundColor: white,
        paddingLeft: 2,
        paddingRight: 2,
    },
    //Header Style
    nav_holder: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 38.67,
        paddingLeft: 13,
        paddingRight: 13,
    },
    nav_side_holder: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo_holder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 107,
        height: 40
    },
    logo_title: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '800',
        color: primary,
    },

    //Top Scroll
    top_scroll: {
        padding: 13,
    },
    top_scroll_active_item: {
        width: 100,
        height: 40,
        backgroundColor: secondary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    top_scroll_active_item_text: {
        color: white,
        fontWeight: '600',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 20
    },
    top_scroll_item: {
        width: 100,
        height: 40,
        backgroundColor: white,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: secondary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    top_scroll_item_text: {
        color: secondary,
        fontWeight: '600',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 20
    },

    //Auth
    auth_header: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 91,
    },
    auth_header_title: {
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 20,
        color: black,
        marginTop: 40.32,
    },
    auth_container: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    auth_form_holder: {
        marginTop: 40
    },
    auth_form_input: {
        marginBottom: 20
    },

    auth_Button: {
        width: '100%',
        backgroundColor: secondary,
        borderRadius: 10,
        height: 60,
        marginBottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },

    auth_Button_text: {
        color: white,
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        fontStyle: 'normal'
    },

    auth_buttom_text: {
        fontWeight: '500',
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        marginTop: -10,
    },

    auth_social_icon_holder: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
    },

    auth_Icon: {
        width: 30,
        height: 30,
    },

    auth_other_text_holder: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 65,
    },

    auth_other_text_right: {
        fontWeight: '600',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 20,
        color: secondary,
    },
    auth_other_text_left: {
        fontWeight: '600',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 20,
        marginRight: 10,
    },

    auth_buttom_resend: {
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        marginTop: -10,
        color: secondary,
    },

    stories_scroll_holder: {
        marginTop: 20,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },

    stories_scroll_header: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 20,
    },

    stories_item: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },

    post_holder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 20,
    },

    post_person_holder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 22,
    },

    post_person_details: {
        display: 'flex',
        flexDirection: 'row',
    },

    post_person_name_holder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    post_body_holder: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10,
        width: '100%',
    },

    postImage: {
        width: '100%',
        height: ScreenWidth/2,
        borderRadius: 10,
        marginTop: 10,
    },

    postText: {
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },

    post_actions_holder: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    post_actions_text: {
        fontSize: 14,
        fontWeight: '500',
        fontStyle: 'normal',
        color: grey,
    },

    post_actions_left: {
        paddingLeft: 10,
    },

    post_actions_right: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    post_actions_right_item: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 10,
    },

    post_bs_view_holder: {
        display: 'flex',
        width: '100%',
        height: ScreenHeight/2,
        flexDirection: 'column',
        backgroundColor: white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
    },

    post_bs_view_touch: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        marginBottom: 10,
    },

    post_bs_view_details: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 5,
    },

    post_bs_view_details_text: {
        fontSize: 12,
        fontFamily: 'Poppins_500Medium',
        fontWeight: '400',
        fontStyle: 'normal',
        color: black,
    },

    post_bs_view_details_text_span: {
        fontSize: 10,
        fontFamily: 'Poppins_500Medium',
        fontWeight: '400',
        fontStyle: 'normal',
        color: black,
    },

    post_video: {
        alignSelf: 'center',
        width: '100%',
        height: 220,
    },

    post_video_icon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
        height: 220,
        top: 0,
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 1,
    },

    talent_holder: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

    talent_holder_item: {
        display: 'flex',
        width: 180,
        height: 303,
        borderRadius: 10,
        flexDirection: 'column',
        marginBottom: 10,
    },

    talent_name_holder:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    talent_name_text: {
        fontSize: 14,
        fontStyle: 'normal',
        fontFamily: 'Poppins_600SemiBold',
        marginRight: 5,
    },

    talent_skill_text: {
        fontSize: 10,
        fontWeight: '600',
        fontStyle: 'normal',
        fontFamily: 'Poppins_600SemiBold'
    },

    talent_follow_holder: {
        display: 'flex',
        width: 180,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },

    talent_touchable: {
        display: 'flex',
        width: 100,
        height: 32,
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: secondary,
        backgroundColor: white,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },

    talent_touchable_text: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        fontStyle: 'normal',
        fontWeight: '600',
        color: secondary,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    talent_touchable_2: {
        display: 'flex',
        width: 100,
        height: 32,
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: secondary,
        backgroundColor: white,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },

    talent_touchable_text_2: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        fontStyle: 'normal',
        fontWeight: '600',
        color: secondary,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    container: {
        flex: 1,
        backgroundColor: white,
        padding: 10,
    },
});