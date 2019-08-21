import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';
import Login from './pages/login';
import Transaction from './pages/transaction';
import NewAccount from './pages/newAccount';
//import NewAccount from './pages/newAccount';

export default createStackNavigator({
    Main,
    Login,
    Transaction,
    NewAccount,
}, {
  navigationOptions: {
      headerStyle: {
          backgroundColor: '#FFFF00'
      },
  headerTintColor: '#000000'
 },
});