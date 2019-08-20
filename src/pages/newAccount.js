import React, { Component } from 'React'

import { View, Text, Button} from 'react-native'

export default class NewAccount extends Component {
  static navigationOptions = {
    title: 'Account new'  
  }

    render() {
        return (
            <View>
                <Text>Página new</Text>
                <Button
                    onPress={() => {this.props.navigation.navigate('Transaction') }}
                    title="New Account"
                    color="#841584"
                    />
            </View>
        );
    }
}