/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  Button,
  View,
  Text
} from 'react-native';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';

// default photo profile
import image from '../assets/default.png';

class Profile extends Component {

  render() {
    const { data } = this.props.auth
    return (
      <View style={styles.container}>
        <View>
          <Image source={image}/>
        </View>
      </View>
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
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = { logout };

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Profile);