import React, {useContext, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Context} from "../context/BlogContext";
import {Feather} from "@expo/vector-icons";


const IndexScreen = ({navigation}) => {

    const {state, deleteBlogPost, getBlogPost} = useContext(Context);

    useEffect(() => {
        getBlogPost();

        //Extra care using listener it could cause memory leak
        const listener = navigation.addListener('didFocus', () => {
            getBlogPost();
        });

        return () => {
            listener.remove();
        };

    }, []);

    return (
        <View>

            <FlatList
                data={state}
                keyExtractor={blogPost => blogPost.title}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Show', {id: item.id})}
                        >
                            <View style={styles.row}>

                                <Text style={styles.title}>{item.id} - {item.title}</Text>
                                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    <Feather style={styles.icon} name="trash"/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );

                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () =>
            <TouchableOpacity onPress={() => { navigation.navigate('Create')}}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>

    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#9ccddf',
        borderColor: '#9be369',
        borderBottomWidth: 2,
        padding: 10
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    }
});

export default IndexScreen;
