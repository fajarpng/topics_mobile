import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Button
} from 'react-native';

// url
const url = 'http://192.168.0.103:3300/';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { clear } from '../redux/actions/auth';
import { detailTopic, deleteTopic, fetchTopic } from '../redux/actions/topic';
import { fetchComment, removeComment, addComment } from '../redux/actions/comment';

// default photo profile
import image from '../assets/default.png';

class Detail extends Component {
  constructor(props){
    super(props)
    const { data } = this.props.route.params;
    const { id } = this.props.auth
    this.state = {
      topik_id: data,
      comment: '',
      user_id: id,
    };
  }

  componentDidMount(){
    const { data } = this.props.route.params;

    this.props.detailTopic(data)
    this.props.fetchComment(data)
  }

  removeTopic = () => {
    const { data } = this.props.route.params;

    this.props.deleteTopic(data)
  }

  removeComment = () => {
    const { comment } = this.props.comment;
    
    this.props.removeComment(comment[0].id)
  }

  addComment = () => {
    const { comment } = this.state;

    if(comment){
      this.props.addComment(this.state);
    } else {
      ToastAndroid.show('Form can not empty', ToastAndroid.SHORT)
    }
  }

  componentDidUpdate(){
    const { errMsg, isError } = this.props.topic;
    const { msg, isErr } = this.props.comment;
    const { data } = this.props.route.params;

    if (errMsg !== '') {
      isError ? (
        ToastAndroid.show(errMsg, ToastAndroid.SHORT)
        ):(
        this.props.fetchTopic(),
        this.props.detailTopic(data),
        this.props.fetchComment(data),
        ToastAndroid.show(errMsg, ToastAndroid.SHORT)
        )
      this.props.clear();
    } else if (msg !== '') {
      isErr ? (
        ToastAndroid.show(msg, ToastAndroid.SHORT)
        ):(
        this.props.fetchTopic(),
        this.props.detailTopic(data),
        this.props.fetchComment(data),
        this.setState({comment: ''}),
        ToastAndroid.show(msg, ToastAndroid.SHORT)
        )
      this.props.clear();
    }
  }

  render() {
    const { result } = this.props.topic.detail
    const { name, id } = this.props.auth
    const { comment, isLoading } = this.props.comment

    return (
      <ScrollView>
      <View style={styles.parent}>
        {result.length > 0 ?
          <>
          <View style={styles.body}>
            {result[0].avatar ?
                <View style={styles.avatar}>
                  <Image style={styles.img} source={{uri: `${url}${result[0].avatar}`}}/>
                </View>
                :
                <Image style={styles.avatar} source={image}/>
                }
            <View>
              <Text style={styles.title}>{result[0].title}</Text>
              <Text style={styles.date}>{result[0].date}</Text>
              <Text style={styles.name}>{result[0].name}</Text>
            </View>
          </View>

          {result[0].user_id === id && 
            <View style={styles.edit}>
              <TouchableOpacity
                style={styles.btn}
                onPress={this.removeTopic}>
                <Icon name='trash' size={20} color='#9a9a9a'/>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.props.navigation.navigate('editTopic',{data: result[0]})}>
                <Icon name='pen' size={20} color='#9a9a9a'/>
              </TouchableOpacity>
            </View>}

          <Text style={styles.content}>{result[0].content}</Text>
          </>
          :
          <Text style={styles.notFound}>No Topic Found </Text>
        }

        <View style={styles.answerDiv}>
          <Text style={styles.answer}>Answer</Text>
        </View>

        <FlatList
            data={comment}
            renderItem={({item}) => (
              <View style={styles.wraper}>
                {comment[0].user_id === id && 
                  <View style={styles.edit}>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={this.removeComment}>
                      <Icon name='trash' size={15} color='#9a9a9a'/>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => this.props.navigation.navigate('editComment',{data: comment[0]})}>
                      <Icon name='pen' size={15} color='#9a9a9a'/>
                    </TouchableOpacity>
                  </View>}
                <Item
                  data = { item }
                />
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            refreshing={isLoading}/>

        <View style={styles.wraper}>
          <Text style={styles.title}>Your answer</Text>
          <TextInput
            style={styles.input}
            placeholder='Type your answer here ...'
            multiline
            value={this.state.comment}
            numberOfLines={5}
            onChangeText={(e) => this.setState({comment: e})}/>
          <Button
            onPress={this.addComment}
            disabled={isLoading}
            title= {isLoading ? 'Loading...' : "Post your answer"}/>
        </View>
      </View>
      </ScrollView>
    );
  }
}

// class Item topic List
class Item extends Component {
  render (){
    const { comment, name } = this.props.data

    return (
      <>
        <Text style={styles.commentName}>{name}</Text>
        <Text>{comment}</Text>
      </>
    )
  }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    position: 'relative',
  },
  notFound: {
    color: '#a9a9a9',
    fontSize: 18,
    fontStyle: 'italic',
    alignSelf: 'center',
    margin: 20
  },
  body: {
    borderBottomWidth: 1,
    borderBottomColor: '#9a9a9a',
    padding: 10,
    flexDirection: 'row',
  },
  answerDiv: {
    backgroundColor: '#d3d3d3',
    marginTop: 20,
    padding: 10,
  },
  answer: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 18,
    color: '#08f',
    fontWeight: 'bold'
  },
  date: {
    color: '#9a9a9a',
  },
  name: {
    color: '#08f'
  },
  content: {
    margin: 10
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
  edit: {
    borderBottomWidth: 1,
    borderBottomColor: '#9a9a9a',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  btn: {
    marginRight: 20,
  },
  wraper: {
    margin: 5,
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
  commentName: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  topic: state.topic,
  comment: state.comment,
});

const mapDispatchToProps = { 
  detailTopic,
  deleteTopic,
  clear,
  fetchTopic,
  fetchComment,
  removeComment,
  addComment };

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Detail);