import React, { Component } from 'React'

import { View, Text, Button} from 'react-native'
import styles from './styles'

export default class Main extends Component {
  static navigationOptions = {
    title: 'Account App'  
  }

  render() {
    return (
        <View>
            <View style={{ padding:10}}>
              <Button style={styles.button}
                onPress={() => {this.props.navigation.navigate('Login') }}
                title="Login"
                color="#841584"
              />
            </View>
            <View style={{ padding:10}}>
              <Button style={styles.button}
                onPress={() => {this.props.navigation.navigate('NewAccount') }}
                title="New Account"
                color="#841584"
              />
            </View>
        </View>
    );
  }
}