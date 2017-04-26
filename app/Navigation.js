/**
 * Created by usamaahmed on 4/6/17.
 */

import { StackNavigator } from 'react-navigation';
import HomeScreenWithData from './screens/HomeScreen'
import HomeFlatListWithData from './screens/HomeFlatList'
import LoginScreenWithData from './screens/login/LoginScreen'
import ItemCreateWithData from './screens/item/ItemCreate';
import VideoContent from './screens/video/VideoContent';
import ItemShow from './screens/item/ItemShow';
import Contactus from './screens/contactus/Contactus';
import Aboutus from './screens/aboutus/Aboutus';
import UserCard from './screens/user/UserCard';


const navigationOptions = {
    headerMode: 'screen'
}

const Navigation = StackNavigator({
    Home: {
        screen: HomeScreenWithData,
        navigationOptions: {
            title : 'HomeScreen Title',
        }
    },
    HomeFlatList: {
        screen: HomeFlatListWithData,
        navigationOptions: {
            title : () =>'HomeFlatList Title'
        }
    },
    LoginScreen: {
        screen: LoginScreenWithData,
        navigationOptions: {
            title : () =>'Login Screen',
        },
    },
    VideoContent: {
        screen: VideoContent,
        navigationOptions: () => ({
            title : 'VideoContent',
            headerVisible: false
        })
    },
    //VideoLiveStream: {screen: VideoLiveStream},
    ItemCreate: {
        screen: ItemCreateWithData,
        navigationOptions: {
            title : () =>'Item create ? !!!'
        }
    },
    UserCard: {
        screen: UserCard,
        navigationOptions: ({navigation}) => ({
            title : "User Cards :)"
        })
    },
    ItemShow: {screen: ItemShow},
    Contactus: {screen: Contactus},
    Aboutus: {screen: Aboutus},
});


export default Navigation;