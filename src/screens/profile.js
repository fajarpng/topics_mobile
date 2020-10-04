import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

// url
const url = 'http://192.168.0.103:3300/';

// Imports: Redux Actions
import { connect } from 'react-redux';

// default photo profile
import image from '../assets/default.png';
import Logo from '../assets/Topics.png';

class Profile extends Component {

  render() {
    const { name, avatar, about } = this.props.auth

    return (
      <View style={styles.parent}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row'}}>
          {avatar ? 
            <View style={styles.avatar}>
              <Image style={styles.img} source={{uri: `${url}${avatar}`}}/>
            </View>
            :
            <Image style={styles.avatar} source={image}/>
            }
            <Text  style={styles.text}>{name}</Text>
          </View>
          <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('setting')}
            style={styles.setting}>
            <Icon name='cog' light size={25} color='#222426'/>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.aboutWrapper}>
            {about ? 
              <Text style={{fontSize: 17}}>{about}</Text> 
              :
              <Text style={styles.aboutMuted}>No description</Text>
              }
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
  topBar: {
    padding: 5,
    backgroundColor: '#222426',
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: 40,
    height: 40
  },
  topics: {
    color: '#fff',
    fontSize: 18
  },
  header: {
    padding: 20,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    justifyContent: 'space-between'
  },
  avatar: {
    height: 60,
    width: 60,
    marginRight: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  img: {
    flex:1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18
  },
  aboutWrapper: {
    borderBottomWidth: 1,
    padding: 20,
    borderBottomColor: '#d3d3d3'
  },
  aboutMuted: {
    color: '#a9a9a9',
    fontSize: 17,
    fontStyle: 'italic'
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

// Exports
export default connect(mapStateToProps)(Profile);