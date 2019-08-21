import React, { Component } from 'React'

import { View, Text,TextInput, Button, Alert } from 'react-native'
import api from '../services/api'

export default class Login extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      cpf: '',
      password: ''
    }
  }

  static navigationOptions = {
    title: 'Account Login'  
  }

  onPressLogin = () => {
    api.post('/account/authenticate', 
        { 'cpf': this.state.cpf, 'password': this.state.password },
        { headers: { 'Content-Type': 'application/json' } })
    .then(res => {
    //  console.log('res 2', res.data);
      this.props.navigation.navigate('Transaction', { data: res.data })
    })
    .catch(err => {
      Alert.alert(':(', `Não foi possível realizar o login na conta bancária de ${this.state.cpf}.`)
    //  console.log('err 2', err.response.data.error);
    })
  }

  render() {
    return (
      <View style={{padding: 10}}>
          <Text>Cpf</Text>
          <TextInput 
            value={this.state.cpf} 
            onChangeText={value=>this.setState({ cpf: value })}/>
          
          <Text>Senha</Text>
          <TextInput 
            value={this.state.password} 
            onChangeText={value=>this.setState({ password: value })}/>

          <Button
            onPress={() => {this.onPressLogin() }}
            title="Efetuar Login"
            color="#841584"
            />
      </View>
    );
  }
}