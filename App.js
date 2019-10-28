import * as React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as firebase from 'firebase';
import * as store from 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyD_nJuObsymuk82AkQRzitv6H7Tdao_0Wg",
  authDomain: "health-share-a0bc6.firebaseapp.com",
  databaseURL: "https://health-share-a0bc6.firebaseio.com",
  projectId: "health-share-a0bc6",
  storageBucket: "health-share-a0bc6.appspot.com",
  messagingSenderId: "516403798393",
  appId: "1:516403798393:web:5292aecba3e580a3364fa8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

const DATA = [];

class HomeScreen extends React.Component{

  componentDidMount(){
    db.collection('comentarios').get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            DATA.push(doc.data());
            console.log(DATA.length);
        });
        console.log('Finished pushing data');
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  state = {
    list: [],
    loaded: false,
  }

  renderData = ({item, index}) => {
    console.log('Rendering data');
    return (
      <View style = {{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <Text>{item.mensaje}</Text>
      </View>
    );
  };

  countData(){
    console.log(DATA.length);
  }

  updateState(){
    this.setState({
      list: [...DATA],
    });
  }

  render(){
    console.log('Init detail screen render');
    return(
      <View style = {{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <Text>Home Screen</Text>
        <Button 
          title = "Go to details"
          onPress = {() => this.props.navigation.navigate('Details', {
            itemId: 86,
            name: 'Parametro 1',
          })}
        />
        <Button 
          title = 'Test'
          onPress = {() => this.updateState()}
        />
        <FlatList 
          data = {DATA}
          extraData = {this.state.list}
          renderItem = {this.renderData}
          keyExtractor = {(item) => item.idUsuario}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render(){
    const { navigation } = this.props;
    return(
      <View style = {{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <Text>Details Screen</Text>
        <Text>
          itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>
        <Text>
          otherParam: {JSON.stringify(navigation.getParam('name', 'default value'))}
        </Text>
        <Button 
          title = "Go to details.... Again"
          onPress = {() => navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })}
        />

        <Button 
          title = "Go to home"
          onPress = {() => this.props.navigation.push('Home')}
        />

        <Button 
          title = "Go back"
          onPress = {() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render(){
    return <AppContainer />;
  }
}