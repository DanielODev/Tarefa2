import React, { Component } from 'React'
//import api from '../services/api'

import { View, Text, Button} from 'react-native'


export default class Main extends Component {
  static navigationOptions = {
    title: 'Account App'  
  }

  render() {
    return (
        <View>
            <View>
              <Button
                onPress={() => {this.props.navigation.navigate('Login') }}
                title="Login"
                color="#841584"
              />
            </View>
            <View>
              <Button
                onPress={() => {this.props.navigation.navigate('NewAccount') }}
                title="New Account"
                color="#841584"
              />
            </View>
        </View>
    );
  }
}