/**
 * Created by usamaahmed on 4/13/17.
 */
import React , { Component } from 'react';
import { View , Text, Button } from 'native-base';
import { graphql } from 'react-apollo';
import { Authenticate } from '../../queries/mutations';
import { setAuthToken } from '../../helpers/auth';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {token: null}
    }

    login() {
        console.log('login started');
        this.props.mutate({
            variables: {
                //email: "mertie.kassulke@example.net",
                email: "qgoldner@example.org",
                password: "secret"
            }
        }).then((response) => {
            setAuthToken(response.data.authenticate)
            this.setState({token: response.data.authenticate});
            return this.props.navigation.goBack({token: this.state.token});
        }).catch(e => console.log(e));
    }

    render() {
        return (
            <View>
                <Button onPress={ () => this.login()} outlined bordered success>
                    <Text>login</Text>
                </Button>
            </View>
        );
    }
}

const LoginScreenWithData = graphql(Authenticate)(LoginScreen);

export default LoginScreenWithData;