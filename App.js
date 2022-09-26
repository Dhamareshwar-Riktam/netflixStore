import React from 'react';
import {
	View,
	Text
} from 'react-native';
import {
	NativeBaseProvider
} from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Add from './screens/Add';
import Edit from './screens/Edit';
import Test from './screens/Test';


const Stack = createNativeStackNavigator();


const App = () => {
	return (
		<NavigationContainer>
			<NativeBaseProvider>
				<Stack.Navigator initialRouteName='Home'>
					<Stack.Screen
						name='Test'
						component={Test}
						options={{
							headerStyle: {
								backgroundColor: '#0f4c75',
							},
							title: 'Netflix App',
							headerTitleStyle: {
								color: '#00b7c2'
							},
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen
						name='Home'
						component={Home}
						options={{
							headerStyle: {
								backgroundColor: '#0f4c75',
							},
							title: 'Netflix App',
							headerTitleStyle: {
								color: '#00b7c2'
							},
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen
						name='Add'
						component={Add}
						options={{
							headerStyle: {
								backgroundColor: '#0f4c75',
							},
							title: 'Netflix App',
							headerTitleStyle: {
								color: '#00b7c2'
							},
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen
						name='Edit'
						component={Edit}
						options={{
							headerStyle: {
								backgroundColor: '#0f4c75',
							},
							title: 'Netflix App',
							headerTitleStyle: {
								color: '#00b7c2'
							},
							headerTitleAlign: 'center'
						}}
					/>
				</Stack.Navigator>
			</NativeBaseProvider>
		</NavigationContainer>
	);
};


export default App;