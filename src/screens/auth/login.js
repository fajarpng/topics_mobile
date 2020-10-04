/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  Button,
  View,
  ToastAndroid,
  Text
} from 'react-native';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { login, clear } from '../../redux/actions/auth';

//import logo
import Logo from '../../assets/Topics.png'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onLogin = () => {
    const { email, password } = this.state;
    if (email && password) {
      this.props.login(this.state);
    } else {
      ToastAndroid.show('Email & Password must filled', ToastAndroid.SHORT);
    }
  }

  componentDidMount(){
    this.props.clear()
  }

  render() {
    const { errMsg, isLoading, isError } = this.props.auth
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={Logo}/>
          <View style={styles.from}>
            {isError && <Text  style={styles.warning}>{errMsg}*</Text>}
            <Text  style={styles.text}>Email</Text>
            <TextInput style={styles.input} onChangeText={(e) => this.setState({email: e})}/>
            <Text  style={styles.text}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input} onChangeText={(e) => this.setState({password: e})}/>
            <Button
              onPress={this.onLogin}
              disabled={isLoading}
              title= {isLoading ? 'Loading...' : "Log in"}
            />
          </View>
          <View style={styles.linkWraper}>
            <Text >Don t have an account? </Text>
            <Text
              style={{color:'#08f'}}
              onPress={() => this.props.navigation.navigate('register')}>Sign up</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  from: {
    backgroundColor: '#fff',
    margin: 50,
    padding: 20,
    borderRadius: 5,
    elevation: 5,
  },
  input: {
    width: deviceWidth - 100,
    borderWidth: 2,
    borderColor: '#a9a9a9',
    marginBottom: 20,
    padding: 5,
    borderRadius: 5,
  },
  text: {
    marginBottom: 10,
    fontWeight: 'bold'
  },
  warning: {
    marginBottom: 10,
    color: 'red',
  },
  logo: {
    width: 100,
    height: 100
  },
  linkWraper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = { login, clear };

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Login);