import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Context} from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";


const CreateScreen = ({navigation}) => {

    const { addBlogPost } = useContext(Context);

    return (
        <View>
            <Text style={styles.title}>Create a New Blog Post</Text>
            <BlogPostForm onSubmit={ (title, content) => {
                addBlogPost(title, content, () => navigation.navigate('Index'))
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        margin: 5,
        padding: 5,
    }
});

export default CreateScreen;
