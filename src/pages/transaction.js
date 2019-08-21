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

  componentDidMount() {
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

  static navigationOptions = {
    title: 'Account transaction'  
  }

  onPressDeposit = () => {
    const token = `Bearer ${this.props.navigation.state.params.data.token}`;
    console.log('deposit', this.state.amount)

    api.post('/transaction/new', 
        { 'type': 'deposit','amount': this.state.amount },
        { headers: { 'Authorization': token, 'Content-Type': 'application/json' } })
    .then(res => {
      console.log('res', res.data)
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
      console.log('res', res.data)
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
      <View>
        <View style={{ padding:10 }}>
          <Text>CONTA</Text>
          <Text>{`Nome da conta: ${this.props.navigation.state.params.data.account.name}`}</Text>
          <Text>{`Cpf do titular: ${this.props.navigation.state.params.data.account.cpf}`}</Text>

          <View style={{ padding:10 }}>
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
          
          <Text>EXTRATO</Text>
          <Text>{`Saldo: ${this.state.data.total}`}</Text>
          {
            this.state.data &&
            <ScrollView style={{ padding:10, flex:1 }}>
              <FlatList 
                data={this.state.data.transactions}
                keyExtractor={(item, index) => item.id}
                //keyExtractor={item => item.id.toString()}
                renderItem={this._renderItem}
              />
            </ScrollView>
          }
        </View>
      </View>
    );
  }
}