import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Context} from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";


const EditScreen = ({navigation}) => {

    const id = navigation.getParam('id');

    const { state, updateBlogPost } = useContext(Context);

    const blogPost = state.find((blogPost) => blogPost.id === id);

    return (
        <View>
            <Text style={styles.title}>Edit Blog Post #</Text>
            <BlogPostForm
                initialValues={{ title: blogPost.title, content: blogPost.content}}
                onSubmit={(newTitle, newContent) => {
                    updateBlogPost(
                        id,
                        newTitle,
                        newContent)
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        margin: 5,
        marginBottom: 15
    },
    label: {
        fontSize: 20,
        marginLeft: 5
    },
    title: {
        fontSize: 20,
        margin: 5,
        padding: 5,
    }
});

export default EditScreen;
