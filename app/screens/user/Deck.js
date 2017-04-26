/**
 * Created by usamaahmed on 4/25/17.
 */
import React , { Component } from 'react';
import { View , Text , Animated , PanResponder , Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const swipHold = screenWidth * 0.25;
export default class Deck extends Component {
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({x: gesture.dx, y: gesture.dy})
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > swipHold) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -swipHold) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });
        this.state = {panResponder, position};
    }

    forceSwipe(direction) {
        Animated.timing(this.state.position, {
            toValue: {x: (direction === 'right') ? screenWidth * 1.25 : - screenWidth * 1.25, y: 0},
            duration : 250
        }).start(() => {
            this.onSwipeComplete(direction);
        });
    }

    onSwipeComplete(direction) {
        const { onSwipeRight , onSwipLeft } = this.props;
        direction === 'right' ? onSwipeRight() : onSwipLeft();
    }

    getLayoutStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-screenWidth * 1.5, 0, screenWidth * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });
        return ({
            ...position.getLayout(),
            transform: [{rotate}]

        })
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: {x: 0, y: 0}
        }).start();
    }

    renderElements() {
        return this.props.data.map((item, index) => {
            if (index === 0) {
                return <Animated.View
                    key={item.id}
                    style={this.getLayoutStyle()}
                    {...this.state.panResponder.panHandlers}>
                    {this.props.renderElement(item)}
                </Animated.View>
            }
            return this.props.renderElement(item);
        });
    }

    render() {
        return (
            <View>
                { this.renderElements() }
            </View>
        );
    }
}