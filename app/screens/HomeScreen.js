/**
 * Created by usamaahmed on 4/6/17.
 */
import React , { Component } from 'react';
import { View , StyleSheet , CustomText , NetInfo } from 'react-native';
import { graphql } from 'react-apollo';
import { Container, Content, List, ListItem, Text , Spinner , Button , Icon ,H2, H3 } from 'native-base';
import ItemListViewWithData from './partials/ItemListView';
import I18n from 'react-native-i18n'
import I18nTrans from '../I18n';
import { UserIndex , Item} from '../queries/queries';
import _ from 'lodash';
import { getAuthToken , setAuthToken } from '../helpers/auth';
import Ball from './partials/Ball';
import UserCard from '../screens/user/UserCard';

class HomeScreen extends Component {
    static propTypes = {
        data: React.PropTypes.shape({
            loading: React.PropTypes.bool,
            error: React.PropTypes.object,
            users: React.PropTypes.array,
        })
    }

    constructor(props, context) {
        super(props, context);
        this.state = {token: null};
    }

    componentWillMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });
        function handleFirstConnectivityChange(isConnected) {
            console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
            NetInfo.isConnected.removeEventListener(
                'change',
                handleFirstConnectivityChange
            );
        }

        NetInfo.isConnected.addEventListener(
            'change',
            handleFirstConnectivityChange
        );
        getAuthToken().then(t => this.setState({token: t}));
        console.log(this.state.token);
    }

    logout() {
        setAuthToken('').then(() => this.setState({token: null}));
        alert('you logged out');
    }

    setArLocale() {
        I18n.locale = 'ar';
        this.forceUpdate();
    }

    setEnLocale() {
        I18n.locale = 'en';
        this.forceUpdate();
    }


    render() {
        return <Container>
            <Content>
                <View>
                    <Ball />
                    <Button onPress={ () => this.props.navigation.navigate('VideoContent')}
                            info>
                        <Text>{ I18n.t('video_content') }</Text>
                    </Button>

                    <Button onPress={ () => this.setArLocale()}
                            info>
                        <Text>change language to arabic</Text>
                    </Button>
                    <Button onPress={ () => this.setEnLocale()}
                            info>
                        <Text>change language to english</Text>
                    </Button>
                    <Button onPress={ () => this.props.navigation.navigate('HomeFlatList')}
                            info>
                        <Text>HomeFlatList</Text>
                    </Button>
                    { !this.props.data.loading ?
                        <Button
                            onPress={ () => this.props.navigation.navigate('UserCard',{ users : this.props.data.users})}
                            warning>
                            <Text>UserCard</Text>
                        </Button>
                        : null
                    }
                    <Button onPress={ () => this.props.navigation.navigate('VideoLiveStream')}
                            info>
                        <Text>live stream</Text>
                    </Button>
                    {
                        (this.state.token == null) ?
                            <Button onPress={ () => this.props.navigation.navigate('LoginScreen')} outlined bordered
                                    success>
                                <Text>login</Text>
                            </Button>
                            :
                            <View>
                                <Text>
                                    you logged in
                                </Text>
                                <Button onPress={ () => this.logout()} outlined bordered
                                        success>
                                    <Text>logout</Text>
                                </Button>
                            </View>
                    }
                </View>
                <Button onPress={ () => this.props.navigation.navigate('ItemCreate')}>
                    <Text>press</Text>
                </Button>
                {
                    (!this.props.data.loading) ?
                        this.props.data.users.map(u =>
                            <List key={u.id}>
                                <ListItem itemDivider bordered key={u.id}
                                          onPress={ () => this.props.navigation.navigate('UserShow', { user : u})}>
                                    <H2>{u.name}</H2>
                                    <H3>{`user_id : ${u.id}`}</H3>
                                </ListItem>
                                {
                                    (_.size(u.items) > 0) ?
                                        <ItemListViewWithData items={u.items} {...this.props}/>
                                        : null
                                }
                            </List>)
                        : <Spinner color='grey' style={{ alignItems : 'center'}}/>
                }
            </Content>
        </Container>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const HomeScreenWithData = graphql(UserIndex)(HomeScreen);

//const HomeScreenWithData = graphql(Item,{
//    options: {
//        variables : {
//            firstId : 2,
//            secondId : 5
//        }
//    }
//})
//(HomeScreen);

export default HomeScreenWithData;
