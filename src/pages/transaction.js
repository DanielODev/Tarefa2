import React, { Component } from 'React'
import api from '../services/api'

import { View, Text, Button, FlatList, ScrollView, TextInput, Alert} from 'react-native'

export default class Transaction extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      data: {},
      amount: ''
    }
  }

  static navigationOptions = {
    title: 'Account transaction'  
  }

  componentDidMount() {
    this.loadTransactions()
  }

  loadTransactions = () => {
    const token = `Bearer ${this.props.navigation.state.params.data.token}`;
    console.log('token ' , token)

    api.get('/transaction/list', 
      { headers: { 'Authorization': token, 'Content-Type': 'application/json' } })
      .then(res => {
        console.log('res', res.data)
        this.setState({data: res.data})
        console.log('Console this State Data',this.state.data)
      })
      .catch(err => {
        console.log('err', err.response.data.error)
      })
  }

  onPressDeposit = () => {
    const token = `Bearer ${this.props.navigation.state.params.data.token}`;
    console.log('deposit', this.state.amount)

    api.post('/transaction/new', 
        { 'type': 'deposit','amount': this.state.amount },
        { headers: { 'Authorization': token, 'Content-Type': 'application/json' } })
    .then(res => {
      console.log('res deposit', res.data)
      Alert.alert(':)', `Depósito de ${this.state.amount} realizado com sucesso!!!`)
      this.loadTransactions()
      //this.setState({data: res.data})
    })
    .catch(err => {
      Alert.alert(':(', `Não foi possível realizar a transaçãona conta de ${this.props.navigation.state.params.data.account.cpf}.`)
      console.log('err 2', err.response.data.error);
    })
  }

  onPressWithdraw = () => {
    const token = `Bearer ${this.props.navigation.state.params.data.token}`;
    console.log('withdraw', this.state.amount)

    api.post('/transaction/new', 
        { 'type': 'withdraw', 'amount': this.state.amount },
        { headers: { 'Authorization': token, 'Content-Type': 'application/json' } })
    .then(res => {
      console.log('res withdraw', res.data)
      Alert.alert(':)', `Resgate de ${this.state.amount} realizado com sucesso!!!`)
      this.loadTransactions()
      //this.setState({data: res.data})
    })
    .catch(err => {
      Alert.alert(':(', `Não foi possível realizar a transaçãona conta de ${this.props.navigation.state.params.data.account.cpf}.`)
      console.log('err 2', err.response.data.error);
    })
  }

  _renderItem = ({item}) => (
    <View id={item.id}>
      <Text>{`Tipo de transação: ${item.type}`}</Text>
      <Text>{`Quantia: ${item.amount}`}</Text>
      <Text>{`Data da transação: ${item.createdAt}`}</Text>
    </View>
  );

  render() {
    return (
      <View style={{ flex:1 }}>
        <View style={{ padding:10, flex:1 }}>
          <Text>CONTA</Text>
          <Text>{`Nome da conta: ${this.props.navigation.state.params.data.account.name}`}</Text>
          <Text>{`Cpf do titular: ${this.props.navigation.state.params.data.account.cpf}`}</Text>

          <View>
            <Text>MOVIMENTAÇÃO</Text>
            <Text>Valor</Text>
            <TextInput 
              value={this.state.amount} 
              onChangeText={value=>this.setState({ amount: value })}/>
            <Button
              onPress={() => {this.onPressDeposit()}}
              title="Depósito"
              color="#841584"
            />
            <Button
              onPress={() => {this.onPressWithdraw()}}
              title="Resgate"
              color="#841584"
            />
          </View>
          
          
          <Text style={{ padding:10 }}>{`SALDO ATUAL: ${this.state.data.total}`}</Text>
          <Text style={{ padding:10 }}>EXTRATO</Text>
          {
            this.state.data &&
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop:10, paddingBottom:10 }}>
              <FlatList style={{ flex: 1 }}
                data={this.state.data.transactions}
                keyExtractor={(item, index) => item.id}
                //keyExtractor={item => item.id.toString()}
                renderItem={this._renderItem}
              />
              <Text style={{ padding:10 }}>{`SALDO ATUAL: ${this.state.data.total}`}</Text>
            </ScrollView>
          }
        </View>
      </View>
    );
  }
}