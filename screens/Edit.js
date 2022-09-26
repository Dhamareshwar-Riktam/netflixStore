import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
    Button,
    Icon,
    Checkbox,
    Heading,
    Fab,
    Card,
    VStack,
    HStack,
    IconButton,
    Center,
    Box,
    Spinner,
    Text,
    FormControl,
    Input,
    Stack
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';


const Edit = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [totalNoSeason, setTotalNoSeason] = useState('');
    const [id, setId] = useState(null);

    const update = async () => {
        try {
            if (!name || !totalNoSeason) {
                return Snackbar.show({
                    text: 'Please add both fields',
                    textColor: 'white',
                    backgroundColor: '#FF6263'
                });
            }

            const seasonToUpdate = {
                id,
                name,
                totalNoSeason,
                isWatched: false
            };

            const storedValue = await AsyncStorage.getItem('@season_list');
            const prevList = await JSON.parse(storedValue);

            prevList.map(season => {
                if (season.id === id) {
                    season.name = name;
                    season.totalNoSeason = totalNoSeason;
                }
                return season;
            });

            await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));

            Snackbar.show({
                text: 'Season updated successfully',
                textColor: 'white',
                backgroundColor: '#1b262c'
            });

            navigation.navigate('Home');
        } catch (error) {
            console.warn(error);
        }
    }

    useEffect(() => {
        const { season } = route.params;
        const { id, name, totalNoSeason } = season;
        setId(id);
        setName(name);
        setTotalNoSeason(totalNoSeason);
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <VStack style={styles.container}>
                <Heading size='xl' style={styles.heading}>Add to Watch List</Heading>
                <FormControl>
                    <Stack marginX={5} space={5}>
                        <Stack style={styles.formItem}>
                            <Input
                                variant={'rounded'}
                                placeholder='Season Name'
                                value={name}
                                onChangeText={(text) => setName(text)}
                                style={{ color: '#eee' }}
                            />
                        </Stack>
                        <Stack style={styles.formItem}>
                            <Input
                                variant={'rounded'}
                                placeholder='Total Number of Seasons'
                                value={totalNoSeason}
                                onChangeText={(text) => setTotalNoSeason(text)}
                                style={{ color: '#eee' }}
                            />
                        </Stack>
                        <Button
                            variant='outline'
                            onPress={update}
                        >Update</Button>
                    </Stack>
                </FormControl>
            </VStack>
        </ScrollView>
    );
};


export default Edit;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1b262c',
        flex: 1,
        justifyContent: 'flex-start'
    },
    heading: {
        textAlign: 'center',
        color: '#00b7c2',
        marginHorizontal: 5,
        marginTop: 50,
        marginBottom: 20
    },
    formItem: {
        marginBottom: 20
    }
});