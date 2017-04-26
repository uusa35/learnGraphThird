import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApolloClient , { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import configureStore from './app/redux/store';
import NavWithData from './app/Navigation';
import { initialState } from './app/Contstants'
import { server, graphRoute } from 'react-native-dotenv';

let store = configureStore(initialState);

const networkInterface = createNetworkInterface({uri: graphRoute});

//networkInterface.use([{
//    applyMiddleware: async (req, next) => {
//        if (!req.options.headers) {
//            req.options.headers = {};  // Create the header object if needed.
//        }
//        //const token = await AsyncStorage.get('token');
//        //req.options.headers.token = token || null;
//        next();
//    },
//}]);

const client = new ApolloClient({
    dataIdFromObject: o => o.id,
    networkInterface,
});

const App = () =>
    <ApolloProvider client={client} store={store}>
        <NavWithData />
    </ApolloProvider>

Expo.registerRootComponent(App);