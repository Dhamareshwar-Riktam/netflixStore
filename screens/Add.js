import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import {
    Container,
    FormControl,
    Item,
    Input,
    Text,
    Button,
    Heading,
    Stack
} from 'native-base';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';


const Add = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [totalNoSeason, setTotalNoSeason] = useState('');

    const addToList = async () => {
        try {
            if (!name || !totalNoSeason) {
                return Snackbar.show({
                    text: 'Please add both fields',
                    textColor: 'white',
                    backgroundColor: '#FF6263'
                });
            }

            const seasonToAdd = {
                id: shortid.generate(),
                name: name,
                totalNoSeason: totalNoSeason,
                isWatched: false
            };

            const storedValue = await AsyncStorage.getItem('@season_list');
            const prevList = await JSON.parse(storedValue);

            if (!prevList) {
                const newList = [seasonToAdd];
                await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
            } else {
                prevList.push(seasonToAdd);
                await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
            }

            Snackbar.show({
                text: 'Season added successfully',
                textColor: 'white',
                backgroundColor: '#1b262c'
            });
            return navigation.navigate('Home');
        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Heading size='xl' style={styles.heading}>Add to watch list</Heading>
            <FormControl>
                <Stack marginX={5} space={5}>
                    <Stack style={styles.formItem}>
                        <Input
                            variant={'rounded'}
                            placeholder='Season Name'
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={{ color: '#fff' }}
                        />
                    </Stack>
                    <Stack style={styles.formItem}>
                        <Input
                            variant={'rounded'}
                            placeholder='Total Number of Seasons'
                            value={totalNoSeason}
                            onChangeText={(text) => setTotalNoSeason(text)}
                            style={{ color: '#fff' }}
                        />
                    </Stack>
                    <Button
                        variant='outline'
                        onPress={addToList}
                    >Add</Button>
                </Stack>
            </FormControl>
        </ScrollView >
    );
};


export default Add;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1B262C',
        flex: 1,
        justifyContent: 'flex-start',
        flexGrow: 1,
    },
    heading: {
        textAlign: 'center',
        color: '#00b7c2',
        marginHorizontal: 5,
        marginTop: 50,
        marginBottom: 20
    },
});