import React, { Component } from 'React'
import api from '../services/api'
import { View, Text, Button, TextInput} from 'react-native'
import styles from './styles'

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
    title: 'Account App - Nova Conta'  
  }

  onPressNewAccount = () => {
    api.post('/account/new', 
        { 'name': this.state.name, 'cpf': this.state.cpf, 'password': this.state.password },
        { headers: { 'Content-Type': 'application/json' } })
    .then(res => {
      this.props.navigation.navigate('Transaction', { data: res.data })
    })
    .catch(err => {
      Alert.alert(':(', `Não foi possível realizar cadastro da conta bancária.`)
    })
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <Text style={styles.text}>Nome</Text>
        <TextInput style={styles.input}
          value={this.state.name} 
          onChangeText={value=>this.setState({ name: value })}/>
        
        <Text style={styles.text} >CPF</Text>
        <TextInput style={styles.input}
          value={this.state.cpf} 
          onChangeText={value=>this.setState({ cpf: value })}/>
        
        <Text style={styles.text}>Senha</Text>
        <TextInput style={styles.input}
          value={this.state.password} 
          onChangeText={value=>this.setState({ password: value })}/>
        
        <View style={{ padding:10 }}>
          <Button style={styles.button}
            onPress={() => {this.onPressNewAccount() }}
            title="Criar Conta"
            color="#841584"
          />
        </View>
      </View>
    );
  }
}

