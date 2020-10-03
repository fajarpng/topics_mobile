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
import { regis, clear } from '../../redux/actions/auth';

//import logo
import Logo from '../../assets/Topics.png'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  onRegis = () => {
    const { email, password, name } = this.state;
    if (email && password && name) {
      this.props.regis(this.state);
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
            {isError ? 
              <Text style={styles.warning}>{errMsg}*</Text> : 
              <Text style={styles.success}>{errMsg}</Text>
            }
            <Text  style={styles.text}>Display name</Text>
            <TextInput style={styles.input} onChangeText={(e) => this.setState({name: e})}/>
            <Text  style={styles.text}>Email</Text>
            <TextInput style={styles.input} onChangeText={(e) => this.setState({email: e})}/>
            <Text  style={styles.text}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input} onChangeText={(e) => this.setState({password: e})}/>
            <Button
              onPress={this.onRegis}
              disabled={isLoading}
              title= {isLoading ? 'Loading...' : "Sign up"}/>
            <Text style={styles.terms}>
              By clicking "Sign Up", you agree to our terms of service, privacy policy and cookie policy
            </Text>
          </View>
          <View style={styles.linkWraper}>
            <Text >Alredy have an account? </Text>
            <Text >Log in</Text>
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
    height: deviceHeight,
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
  logo: {
    width: 100,
    height: 100
  },
  terms: {
    color: '#a9a9a9',
    marginTop: 20,
  },
  linkWraper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  warning: {
    marginBottom: 10,
    color: 'red',
  },
  success: {
    marginBottom: 10,
    color: 'green',
  },
});


const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = { regis, clear };

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Register);