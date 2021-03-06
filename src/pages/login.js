import React, { Component } from 'React'

import { View, Text,TextInput, Button, Alert } from 'react-native'
import api from '../services/api'
import styles from './styles'

export default class Login extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      cpf: '',
      password: ''
    }
  }

  static navigationOptions = {
    title: 'Account App - Login'  
  }

  onPressLogin = () => {
    api.post('/account/authenticate', 
        { 'cpf': this.state.cpf, 'password': this.state.password },
        { headers: { 'Content-Type': 'application/json' } })
    .then(res => {
      this.props.navigation.navigate('Transaction', { data: res.data })
    })
    .catch(err => {
      Alert.alert(':(', `Não foi possível realizar o login na conta bancária de ${this.state.cpf}.`)
    })
  }

  render() {
    return (
      <View style={{padding: 10}}>
          <Text style={styles.text}>CPF</Text>
          <TextInput style={styles.input} 
            value={this.state.cpf} 
            onChangeText={value=>this.setState({ cpf: value })}/>
          
          <Text style={styles.text}>Senha</Text>
          <TextInput style={styles.input}
            value={this.state.password} 
            onChangeText={value=>this.setState({ password: value })}/>

          <View style={{ padding:10 }}>
            <Button style={styles.button}
              onPress={() => {this.onPressLogin() }}
              title="Efetuar Login"
              color="#841584"
              />
          </View>

      </View>
    );
  }
}