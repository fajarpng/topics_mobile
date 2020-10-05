import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Image, Text } from 'react-native';

const Stack = createStackNavigator();

// import Logo
import Logo from '../assets/Topics.png'

// import screens
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import Main from '../screens/main';
import Detail from '../screens/detail';
import Profile from '../screens/profile';
import Setting from '../screens/setting';
import Ask from '../screens/topic/addTopic';
import EditAsk from '../screens/topic/editTopic';
import EditComment from '../screens/topic/editComment';

class Route extends Component {
  render() {
  	const {token} = this.props.auth
    return (
    	<NavigationContainer>
	        <Stack.Navigator>
		    	{token === '' ? ( 
		    		<>
		        	<Stack.Screen 
		        		options={{
				          title: 'Login',
				          headerStyle: {
				            backgroundColor: '#fff',
				            elevation: 0
				          },
				          headerTintColor: '#000',
				          headerTitleStyle: {
				            fontWeight: 'bold',
				          },
				        }}
		        		component={Login} 
		        		name={'login'}/>
		        	<Stack.Screen
		        		options={{
				          title: 'Register',
				          headerStyle: {
				            backgroundColor: '#fff',
				            elevation: 0
				          },
				          headerTintColor: '#000',
				          headerTitleStyle: {
				            fontWeight: 'bold',
				          },
				        }}
		        		component={Register}
		        		name={'register'}/>
		    		</>) : (
		    		<>
		    		<Stack.Screen
		        		options={{
				          headerStyle: {
				            backgroundColor: '#222426',
				            elevation: 0,
				          },
				          headerTitle: (
				          	<>
				          	<Image
				          		style={{
				          			width: 30,
    								height: 30
				          		}}
				          		source={Logo}/>
				          	<Text>Topics</Text>
				          	</>
				          ),
				          headerTintColor: '#fff',
				        }}
		        		component={Main}
		        		name={'main'}/>
		        	<Stack.Screen
		        		options={{
				          headerStyle: {
				            backgroundColor: '#222426',
				            elevation: 0,
				          },
				          headerTitle: (
				          	<>
				          	<Image
				          		style={{
				          			width: 30,
    								height: 30
				          		}}
				          		source={Logo}/>
				          	<Text>Topics</Text>
				          	</>
				          ),
				          headerTintColor: '#fff',
				        }}
		        		component={Detail}
		        		name={'detail'}/>
		        	<Stack.Screen
		        		options={{
				          headerStyle: {
				            backgroundColor: '#222426',
				            elevation: 0,
				          },
				          headerTitle: (
				          	<>
				          	<Image
				          		style={{
				          			width: 30,
    								height: 30
				          		}}
				          		source={Logo}/>
				          	<Text>Topics</Text>
				          	</>
				          ),
				          headerTintColor: '#fff',
				        }}
		        		component={EditAsk}
		        		name={'editTopic'}/>
		        	<Stack.Screen
		        		options={{
				          headerStyle: {
				            backgroundColor: '#222426',
				            elevation: 0,
				          },
				          headerTitle: (
				          	<>
				          	<Image
				          		style={{
				          			width: 30,
    								height: 30
				          		}}
				          		source={Logo}/>
				          	<Text>Topics</Text>
				          	</>
				          ),
				          headerTintColor: '#fff',
				        }}
		        		component={Ask}
		        		name={'ask'}/>
		        	<Stack.Screen
		        		options={{
				          headerStyle: {
				            backgroundColor: '#222426',
				            elevation: 0,
				          },
				          headerTitle: (
				          	<>
				          	<Image
				          		style={{
				          			width: 30,
    								height: 30
				          		}}
				          		source={Logo}/>
				          	<Text>Topics</Text>
				          	</>
				          ),
				          headerTintColor: '#fff',
				        }}
		        		component={EditComment}
		        		name={'editComment'}/>
		    		<Stack.Screen
		        		options={{
				          headerStyle: {
				            backgroundColor: '#222426',
				            elevation: 0,
				          },
				          headerTitle: (
				          	<>
				          	<Image
				          		style={{
				          			width: 30,
    								height: 30
				          		}}
				          		source={Logo}/>
				          	<Text>Profile</Text>
				          	</>
				          ),
				          headerTintColor: '#fff',
				        }}
		        		component={Profile}
		        		name={'profile'}/>
		        	<Stack.Screen
		        		options={{
				          headerStyle: {
				            backgroundColor: '#222426',
				            elevation: 0,
				          },
				          headerTitle: (
				          	<>
				          	<Image
				          		style={{
				          			width: 30,
    								height: 30
				          		}}
				          		source={Logo}/>
				          	<Text style={{
				          			margin: 10
				          		}}>Settings</Text>
				          	</>
				          ),
				          headerTintColor: '#fff',
				        }}
		        		component={Setting}
		        		name={'setting'}/>
		    		</>)
		    	}
	        </Stack.Navigator>
	     </NavigationContainer>
    );
  }
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Route)