import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  ToastAndroid,
  Image,
  Button,
  View,
  Text
} from 'react-native';

// url
const url = 'http://192.168.0.103:3300/';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { clear } from '../../redux/actions/auth';
import { ask, fetchTopic } from '../../redux/actions/topic';

class Ask extends Component {
  constructor(props){
    super(props)
    const { id } = this.props.auth
    this.state = {
      title: '',
      content: '',
      user_id: id
    };
  }

  onAsk = () =>{
    const { token } = this.props.auth;
    const { title, content } = this.state;

    if (title && content){
      this.props.ask(this.state, token);
    } else {
      ToastAndroid.show('All form must filled', ToastAndroid.SHORT);
    }
  }

  componentDidMount(){
    this.props.clear()
  }

  componentDidUpdate(){
    const { errMsg, isError } = this.props.topic;
    if(errMsg !== ''){
      isError ? (
        ToastAndroid.show(errMsg, ToastAndroid.SHORT)
        ):(
        this.props.fetchTopic(),
        ToastAndroid.show(errMsg, ToastAndroid.SHORT)
        )
      this.props.clear();
    }
  }

  render() {
    const { content, title } = this.state
    const { errMsg, isLoading, isError } = this.props.topic
    
    return (
      <View style={styles.parent}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.text}>Title topic</Text>
            <Text style={styles.muted}>
              Be spesific and imagine you are asking a question to another person.
            </Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(e) => this.setState({title: e})}/>

            <Text style={styles.text}>Body</Text>
            <Text style={styles.muted}>
              Include all the information someone would need to answer your question.
            </Text>
            <TextInput
              style={styles.input}
              value={content}
              multiline
              numberOfLines={6}
              onChangeText={(e) => this.setState({content: e})}/>
            <Button
                onPress={this.onAsk}
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
    margin: 30,
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 5,
    padding: 10
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
  muted: {
    color: '#a9a9a9',
    fontSize: 13,
    marginBottom: 10
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  topic: state.topic,
});

const mapDispatchToProps = { clear, ask, fetchTopic };

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Ask);