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
import { editComment, fetchComment } from '../../redux/actions/comment';

class EditComment extends Component {
  constructor(props){
    super(props)
    const { data } = this.props.route.params;
    this.state = {
      comment: data.comment,
    };
  }

  onSubmit = () =>{
    const { comment } = this.state;
    const { data } = this.props.route.params;

    if (comment){
      this.props.editComment(this.state, data.id);
    } else {
      ToastAndroid.show('Form can not empty', ToastAndroid.SHORT);
    }
  }

  componentDidMount(){
    this.props.clear()
  }

  componentDidUpdate(){
    const { msg, isErr } = this.props.comment;
    const { data } = this.props.route.params;

    if (msg !== '') {
      isErr ? (
        ToastAndroid.show(msg, ToastAndroid.SHORT)
        ):(
        this.props.fetchComment(data.topik_id),
        ToastAndroid.show(msg, ToastAndroid.SHORT)
        )
      this.props.clear();
    }
  }

  render() {
    const { comment } = this.state
    const { isLoading } = this.props.comment
    
    return (
      <View style={styles.parent}>
        <ScrollView>
          <View style={styles.wraper}>
            <Text style={styles.title}>Edit your answer</Text>
            <TextInput
              style={styles.input}
              placeholder='Type your answer here ...'
              multiline
              value={comment}
              numberOfLines={5}
              onChangeText={(e) => this.setState({comment: e})}/>
            <Button
              onPress={this.onSubmit}
              disabled={isLoading}
              title= {isLoading ? 'Loading...' : "Save Change"}/>
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
  wraper: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 5,
    padding: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#9a9a9a',
    marginTop: 10,
    marginBottom: 10,
    padding: 10
  },
  title: {
    marginBottom: 10,
    fontWeight: 'bold'
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  topic: state.topic,
  comment: state.comment,
});

const mapDispatchToProps = { clear, fetchComment, editComment };

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(EditComment);