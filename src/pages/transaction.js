import React, { Component } from 'React'

import { View, Text, Button} from 'react-native'

export default class Transaction extends Component {
  static navigationOptions = {
    title: 'Account transaction'  
  }

    render() {
        return (
            <View>
                <Text>Página transactions</Text>
                <Button
                    onPress={() => {this.props.navigation.navigate('Transaction') }}
                    title="transaction"
                    color="#841584"
                    />
            </View>
        );
    }
}