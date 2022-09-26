import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
    List,
    ListItem,
    Left,
    Button,
    Icon,
    Body,
    Right,
    Checkbox,
    Title,
    Heading,
    Fab,
    Card,
    Subtitle,
    VStack,
    HStack,
    IconButton,
    Container,
    Center,
    Box
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';


const Home = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const [listOfSeasons, setListOfSeasons] = useState([]);

    const getList = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('@season_list');
            if (!storedValue) return;

            setListOfSeasons(await JSON.parse(storedValue));
        } catch (error) {
            console.warn(error);
        }
    };
    useEffect(() => {
        getList();
    }, [isFocused]);

    const deleteSeason = async (id) => {
        const newList = listOfSeasons.filter(season => season.id !== id);
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
        setListOfSeasons(newList);
    };

    const markComplete = async (id) => {
        const newList = listOfSeasons.map(season => {
            if (season.id == id) {
                season.isWatched = !season.isWatched;
            }
            return season
        });
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
        setListOfSeasons(newList);
        // alert(JSON.stringify(listOfSeasons))
        // alert(JSON.stringify(newList))
    };

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
                                >
                                    <Checkbox
                                        isChecked={season.isWatched}
                                        onChange={() => markComplete(season.id)}
                                        value={season.id}
                                        accessibilityLabel={season.name}
                                    />
                                    <Text
                                        width="100%"
                                        flexShrink={1}
                                        textAlign="left"
                                        mx="2"
                                        strikeThrough={season.isWatched}
                                        _light={{
                                            color: season.isWatched ? "gray.400" : "coolGray.800"
                                        }} _dark={{
                                            color: season.isWatched ? "gray.400" : "coolGray.50"
                                        }}
                                    >
                                        {season.name}
                                    </Text>
                                    <Text>{season.totalNoSeason}</Text>
                                    <Text>{season.isWatched.toString()}</Text>
                                </HStack>
                            ))}
                        </VStack>
                    </Box>
                </Center>
            )}

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
        </ScrollView>
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
        justifyContent: 'center',
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






//                                 <IconButton
//                                     size="sm"
//                                     colorScheme="trueGray"
//                                     icon={<Icon name="minus" size="xs" color="trueGray.400" />}
//                                     onPress={() => deleteSeason(season.id)}
//                                 />