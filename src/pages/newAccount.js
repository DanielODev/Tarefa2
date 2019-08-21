import React, { Component } from 'React'
import api from '../services/api'
import { View, Text, Button, TextInput} from 'react-native'

export default class NewAccount extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: '',
      cpf: '',
      password: ''
    }
  }

  static navigationOptions = {
    title: 'Account new'  
  }

  onPressNewAccount = () => {
    api.post('/account/new', 
        { 'name': this.state.name, 'cpf': this.state.cpf, 'password': this.state.password },
        { headers: { 'Content-Type': 'application/json' } })
    .then(res => {
      console.log('res 2', res.data);
      this.props.navigation.navigate('Transaction', { data: res.data })
    })
    .catch(err => {
      Alert.alert(':(', `Não foi possível realizar cadastro da conta bancária de ${this.state.cpf}.`)
      console.log('err 2', err.response.data.error);
    })
  }

  render() {
      return (
        <View style={{padding: 10}}>
          <Text>Nome</Text>
          <TextInput 
            value={this.state.name} 
            onChangeText={value=>this.setState({ name: value })}/>
          
          <Text>Cpf</Text>
          <TextInput 
            value={this.state.cpf} 
            onChangeText={value=>this.setState({ cpf: value })}/>
          
          <Text>Senha</Text>
          <TextInput 
            value={this.state.password} 
            onChangeText={value=>this.setState({ password: value })}/>
            
            <Button
                onPress={() => {this.onPressNewAccount() }}
                title="New Account"
                color="#841584"
                />
        </View>
      );
  }
}