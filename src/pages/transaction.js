import React, { Component } from 'React'
import api from '../services/api'

import { View, Text, Button, FlatList, ScrollView} from 'react-native'

export default class Transaction extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      data: {}
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


    //formatar
    _renderItem = ({item}) => (
      <View>
          <Text>{item.type}</Text>
          <Text>{item.amount}</Text>
          <Text>{item.createdAt}</Text>
      </View>
    );

    render() {
        return (
            <View>
              <Text>Informações</Text>
                <Text>{`Nome da conta: ${this.props.navigation.state.params.data.account.name}`}</Text>
                <Text>{`Cpf do titular: ${this.props.navigation.state.params.data.account.cpf}`}</Text>
                <Button
                    onPress={() => {this.props.navigation.navigate('Transaction') }}
                    title="Informações"
                    color="#841584"
                    />
                  
                <FlatList
                  data={this.state.data.transactions}
                  //keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                />
                    
                    <Button
                    onPress={() => {this.onPressDeposit()}}
                    title="Depósito"
                    color="#841584"j
                    />
                <Button
                    onPress={() => {this.onPressWithdraw()}}
                    title="Resgate"
                    color="#841584"
                    />
                
            </View>
        );
    }
}