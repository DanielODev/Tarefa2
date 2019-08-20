import React, { Component } from 'React'

import { View, Text, Button} from 'react-native'

export default class Login extends Component {
  static navigationOptions = {
    title: 'Account Login'  
  }

    render() {
        return (
            <View>
                <Text>Página Login</Text>
                <Button
                    onPress={() => {this.props.navigation.navigate('Transaction') }}
                    title="Transaction"
                    color="#841584"
                    />
            </View>
        );
    }
}