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
    Text
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';


const Home = ({ navigation, route }) => {
    const [listOfSeasons, setListOfSeasons] = useState([]);
    const [loading, setLoading] = useState(false);

    const isFocused = useIsFocused();

    const getList = async () => {
        try {
            setLoading(true);
            const storedValue = await AsyncStorage.getItem('@season_list');
            if (!storedValue) {
                setLoading(false);
                return setListOfSeasons([]);
            }

            const list = await JSON.parse(storedValue);
            setListOfSeasons(list);

            setLoading(false);
        } catch (error) {
            console.warn(error);
        }
    };

    const deleteSeason = async (id) => {
        const newList = await listOfSeasons.filter(season => season.id !== id);
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
        setListOfSeasons(newList);
    };

    const markComplete = async (id) => {
        setListOfSeasons(listOfSeasons => {
            return listOfSeasons.map(season => {
                if (season.id === id) {
                    season.isWatched = !season.isWatched;
                }
                return season;
            });
        });

        await AsyncStorage.setItem('@season_list', JSON.stringify(listOfSeasons));
        // const newList = listOfSeasons.map(season => {
        //     if (season.id == id) {
        //         season.isWatched = !season.isWatched;
        //     }
        //     return season;
        // });
        // setListOfSeasons(newList);
        // alert(JSON.stringify(listOfSeasons))
        // alert(JSON.stringify(newList))
    };

    useEffect(() => {
        getList();
    }, [isFocused]);

    if (loading) {
        return (
            <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" fontSize="md">
                    Loading
                </Heading>
            </HStack>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {listOfSeasons.length === 0 ? (
                <View style={styles.container}>
                    <Heading size="xl" style={styles.heading}>Watchlist is Empty, You can add a season</Heading>
                </View>
            ) : (
                <Center w="100%">
                    <Box w="100%" p={5}>
                        <Heading size='xl' style={styles.heading}>Next Series to Watch</Heading>
                        <VStack space={2}>
                            {listOfSeasons.map((season, seasonI) => (
                                <HStack
                                    w="100%"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    key={season.id + seasonI.toString()}
                                    space={2}
                                    flexWrap="wrap"
                                >
                                    <Button
                                        style={styles.actionButton}
                                        onPress={() => navigation.navigate('Edit', { season })}
                                    >
                                        <Icon color="white" size="sm" as={AntDesign} name="edit" />
                                    </Button>
                                    <Button
                                        style={styles.actionButton}
                                        colorScheme='danger'
                                        onPress={() => deleteSeason(season.id)}
                                        mt={2}
                                    >
                                        <Icon color="white" size="sm" as={AntDesign} name="delete" />
                                    </Button>
                                    <VStack
                                        justifyContent="space-between"
                                        alignItems="center"
                                        flexWrap="wrap"
                                    >
                                        <Text
                                            strikeThrough={season.isWatched}
                                            _light={{
                                                color: season.isWatched ? "gray.400" : "coolGray.800"
                                            }} _dark={{
                                                color: season.isWatched ? "gray.400" : "coolGray.50"
                                            }}
                                            style={styles.seasonName}
                                            textAlign="center"
                                        >
                                            {season.name}
                                        </Text>
                                        <Text style={{ color: "#888", textAlign: 'center' }}>{season.totalNoSeason} seasons to watch</Text>

                                    </VStack>
                                    <Checkbox
                                        isChecked={season.isWatched}
                                        onChange={() => markComplete(season.id)}
                                        value={season.id}
                                        accessibilityLabel={season.name}
                                    />
                                </HStack>
                            ))}
                        </VStack>
                    </Box>
                </Center>
            )
            }

            <Fab
                style={{ backgroundColor: "#5067FF" }}
                renderInPortal={false}
                shadow={2}
                size="sm"
                icon={<Icon color="white" size="sm" as={AntDesign} name="plus" />}
                placement='bottom-right'
                onPress={() => navigation.navigate('Add')}
            />
            <Fab
                style={{ backgroundColor: "#5067FF" }}
                renderInPortal={false}
                shadow={2}
                size="sm"
                icon={<Icon color="white" size="sm" as={AntDesign} name="delete" />}
                placement='bottom-left'
                onPress={async () => {
                    AsyncStorage.clear();
                    setListOfSeasons([]);
                    alert('cleared')
                }}
            />
        </ScrollView >
    );
};


export default Home;


const styles = StyleSheet.create({
    emptyContainer: {
        backgroundColor: '#1B262C',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#1B262C',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    heading: {
        textAlign: 'center',
        color: '#00b7c2',
        marginVertical: 15,
        marginHorizontal: 5
    },
    actionButton: {
        marginLeft: 5
    },
    seasonName: {
        color: '#fdcb93',
        textAlign: 'justify'
    },
    listItem: {
        marginLeft: 0,
        marginBottom: 20
    }
});