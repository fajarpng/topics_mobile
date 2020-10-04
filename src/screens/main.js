import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

// url
const url = 'http://192.168.0.103:3300/';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { fetchTopic } from '../redux/actions/topic';

// default photo profile
import image from '../assets/default.png';
import Logo from '../assets/Topics.png';

class Main extends Component {

  componentDidMount(){
    this.props.fetchTopic()
  }

  render() {
    const {result} = this.props.topic.data

    return (
      <View style={styles.parent}>
        <View style={styles.top}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('ask')}>
            <Icon name='plus' size={25} color='#9a9a9a'/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('profile')}>
            <Icon name='cog' size={25} color='#9a9a9a'/>
          </TouchableOpacity>
        </View>

      {result.length > 0 ?
        <FlatList
          data={result}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('detail',{data: item.id})}>
              <Item
                data = { item }
              />
            </TouchableOpacity>
          )}
          keyExtractor={ item => item.id.toString() }
          />
        :
        <Text style={styles.notFound}>No Topic Found </Text>
      }
      </View>
    );
  }
}

// class Item topic List
class Item extends Component {
  render (){
    const { title, date, name, avatar } = this.props.data
    return (
      <View style={styles.itemWraper}>
        {avatar ? 
            <View style={styles.avatar}>
              <Image style={styles.img} source={{uri: `${url}${avatar}`}}/>
            </View>
            :
            <Image style={styles.avatar} source={image}/>
            }
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    )
  }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    height: deviceHeight,
    position: 'relative',
  },
  notFound: {
    color: '#a9a9a9',
    fontSize: 18,
    fontStyle: 'italic',
    alignSelf: 'center',
    margin: 20
  },
  itemWraper: {
    borderBottomWidth: 1,
    borderBottomColor: '#9a9a9a',
    padding: 10,
    flexDirection: 'row',
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
  top: {
    borderBottomWidth: 1,
    borderBottomColor: '#9a9a9a',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  btn: {
    marginRight: 20,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  topic: state.topic,
});

const mapDispatchToProps = { fetchTopic };
// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Main);