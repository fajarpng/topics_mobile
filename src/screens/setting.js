import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Button,
  View,
  Text
} from 'react-native';

// url
const url = 'http://192.168.0.103:3300/';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { logout, update, clear } from '../redux/actions/auth';

// default photo profile
import image from '../assets/default.png';
import Logo from '../assets/Topics.png';

class Profile extends Component {
  constructor(props){
    super(props)
    const { name, avatar, email, about } = this.props.auth
    this.state = {
      avatar,
      name,
      email,
      about
    };
  }

  onEdit = () => {
    const { email, password, name, about } = this.state;
    const { token, id } = this.props.auth;

    if (name) {
      this.props.update({email, name, about}, token, id);
    } else {
      ToastAndroid.show('Display Name must filled', ToastAndroid.SHORT);
    }
  }

  componentDidMount(){
    this.props.clear()
  }

  render() {
    const { avatar, about, name, email } = this.state
    const { errMsg, isLoading, isError } = this.props.auth
    
    return (
      <View style={styles.parent}>
        <View style={ styles.logout }>
          <TouchableOpacity
            onPress={this.props.logout}>
            <Text style={{fontWeight: 'bold'}}>Log out</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView>
          <View style={styles.header}>
            {false ? 
              <View style={styles.avatar}>
                <Image style={styles.img} source={{uri: `${url}${avatar}`}}/>
              </View>
              :
              <Image style={styles.avatar} source={image}/>
              }
            {isError ? 
              <Text style={styles.warning}>{errMsg}*</Text> : 
              <Text style={styles.success}>{errMsg}</Text>
            }
            <Text style={styles.text}>Display name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(e) => this.setState({name: e})}/>

            <Text style={styles.text}>About me</Text>
            <TextInput
              style={styles.input}
              value={about}
              multiline
              numberOfLines={5}
              onChangeText={(e) => this.setState({about: e})}/>
            <Button
                onPress={this.onEdit}
                disabled={isLoading}
                title= {isLoading ? 'Loading...' : "Save"}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    position: 'relative',
  },
  header: {
    padding: 30,
  },
  avatar: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.3)',
    marginBottom: 10
  },
  img: {
    flex:1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover',
  },
  input: {
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
  success: {
    marginBottom: 10,
    color: 'green',
  },
  logout: {
    padding: 10,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3'
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = { logout, update, clear };

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Profile);