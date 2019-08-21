import React, { Component } from 'React'
import api from '../services/api'
import styles from './styles'

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
    title: 'Account App - Transações'  
  }

  componentDidMount() {
    this.loadTransactions()
  }

  loadTransactions = () => {
    const token = `Bearer ${this.props.navigation.state.params.data.token}`;
    
    api.get('/transaction/list', 
      { headers: { 'Authorization': token, 'Content-Type': 'application/json' } })
      .then(res => {
        this.setState({data: res.data})
      })
      .catch(err => {
      })
  }

  onPressDeposit = () => {
    const token = `Bearer ${this.props.navigation.state.params.data.token}`;

    api.post('/transaction/new', 
        { 'type': 'deposit','amount': this.state.amount },
        { headers: { 'Authorization': token, 'Content-Type': 'application/json' } })
    .then(res => {
      Alert.alert(':)', `Depósito de ${this.state.amount} realizado com sucesso!!!`)
      this.loadTransactions()
    })
    .catch(err => {
      Alert.alert(':(', `Não foi possível realizar o depósito na conta de ${this.props.navigation.state.params.data.account.cpf}.`)
    })
  }

  onPressWithdraw = () => {
    const token = `Bearer ${this.props.navigation.state.params.data.token}`;

    api.post('/transaction/new', 
        { 'type': 'withdraw', 'amount': this.state.amount },
        { headers: { 'Authorization': token, 'Content-Type': 'application/json' } })
    .then(res => {
      Alert.alert(':)', `Resgate de ${this.state.amount} realizado com sucesso!!!`)
      this.loadTransactions()
    })
    .catch(err => {
      Alert.alert(':(', `Não foi possível realizar o resgate na conta de ${this.props.navigation.state.params.data.account.cpf}.`)
    })
  }

  getAmountInfo = (amount, type) => {
    if (type === 'deposit') return `+ ${amount}`
    else return `- ${amount}`
  }

  getColorInfo = (type) => {
    if (type === 'deposit') return '#8FBC8F'
    else return '#E9967A'
  }

  _renderItem = ({item}) => (
    <View id={item._id} style={[styles.viewInfo, { backgroundColor: this.getColorInfo(item.type) }]}>
      <Text style={styles.textInfo}>{`Valor: ${this.getAmountInfo(item.amount, item.type)}`}</Text>
      <Text style={styles.textInfo}>{`Data: ${item.createdAt}`}</Text>
    </View>
  );

  render() {
    return (
      <View style={{ flex:1 }}>
        <View style={{ padding:10, flex:1 }}>
          <View>
            <Text style={styles.text}>CONTA</Text>
            <Text style={styles.textInfo}>{`Nome da conta: ${this.props.navigation.state.params.data.account.name}`}</Text>
            <Text style={styles.textInfo}>{`CPF do titular: ${this.props.navigation.state.params.data.account.cpf}`}</Text>
          </View>

          <View style={{ marginTop:10 }}>
            <Text style={styles.text}>MOVIMENTAÇÃO</Text>
            <Text style={styles.text}>Valor</Text>
            <TextInput style={styles.input}
              value={this.state.amount} 
              onChangeText={value=>this.setState({ amount: value })}/>

            <View style={{ padding:5 }}>
              <Button style={styles.button}
                onPress={() => {this.onPressDeposit()}}
                title="Depósito"
                color="#841584"
              />
            </View>

            <View style={{ padding:5 }}>
              <Button style={styles.button}
                onPress={() => {this.onPressWithdraw()}}
                title="Resgate"
                color="#841584"
              />
            </View>
            
          </View>
          
          <View style={{ flex:1, marginTop:10 }}>
            <Text style={[styles.text, { padding:10 }]}>{`SALDO ATUAL: ${this.state.data.total}`}</Text>
            <Text style={[styles.text, { padding:10 }]}>EXTRATO</Text>
            {
              this.state.data &&
              <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop:10, paddingBottom:10 }}>
                <FlatList style={{ flex: 1 }}
                  data={this.state.data.transactions}
                  keyExtractor={(item, index) => item._id}
                  renderItem={this._renderItem}
                />
              </ScrollView>
            }
          </View>
        </View>
      </View>
    );
  }
}