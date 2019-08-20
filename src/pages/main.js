import React, { Component } from 'React'
import api from '../services/api'

import { View, Text, Button} from 'react-native'


export default class Main extends Component {
  static navigationOptions = {
    title: 'Account App'  
  }

//   componentDidMount() {
//       this.load
//   }
          
    render() {
        console.log('Navigation ==>>>',this.props.navigation)
        return (
            <View>
                <Text>Página main</Text>
                <Button
                    onPress={() => {this.props.navigation.navigate('Login') }}
                    title="Login"
                    color="#841584"
                    />
                    <Button
                    onPress={() => {this.props.navigation.navigate('NewAccount') }}
                    title="New Account"
                    color="#841584"
                    />
            </View>
        );
    }
}