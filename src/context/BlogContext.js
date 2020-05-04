import React, {useState, useReducer} from 'react';
import createDataContext from "./createDataContext";

const blogsReducer = (state, action) => {

    switch (action.type) {
        case 'add_blogpost':
            return ([...state, {
                id: Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content
            }]);

        case 'update_blogPost':
            return state.map((blogpost) => {
                return blogpost.id === action.payload.id
                ? action.payload
                : blogpost;
            })

        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload);

        default:
            return state;
    }

};

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({type: 'add_blogpost', payload: {title, content}});
        callback();
    }
}

const updateBlogPost = (dispatch) => {
    return (id, title, content) => {
        dispatch({type: 'update_blogPost', payload: {id, title, content}});
    }
}

const deleteBlogPost = (dispatch) => {
    return (id) => {
        dispatch({type: 'delete_blogpost', payload: id})
    }
}

export const {Context, Provider} = createDataContext(
    blogsReducer,
    {addBlogPost, updateBlogPost, deleteBlogPost},
    [{title: 'test Title', content: 'Content test', id: 11111}]);
