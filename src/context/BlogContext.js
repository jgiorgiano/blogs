import React, {useState, useReducer} from 'react';
import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogsReducer = (state, action) => {

    switch (action.type) {
        case 'get_blogposts':
            return action.payload;

            //Removed as we are using axios, db and useEffect on index Screen to reload the blogs from db
        // case 'add_blogpost':
        //     return ([...state, {
        //         id: Math.floor(Math.random() * 99999),
        //         title: action.payload.title,
        //         content: action.payload.content
        //     }]);

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

const getBlogPost = dispatch => {
    return async () => {
        const response = await jsonServer.get('blogposts');

        dispatch({ type: 'get_blogposts', payload: response.data})
    }
}

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {

        await jsonServer.post('/blogposts', {title, content})

        // dispatch({type: 'add_blogpost', payload: {title, content}});

        if(callback) {
            callback();
        }
    }
}

const updateBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {

        //Run the request to update on database
        await jsonServer.put(`/blogposts/${id}`, {title, content})

        //after request completed update the blogContext (state)
        dispatch({type: 'update_blogPost', payload: {id, title, content}});

        if (callback) {
            callback();
        }
    }
}

const deleteBlogPost = (dispatch) => {
    return async (id) => {

        await jsonServer.delete(`/blogposts/${id}`);

        dispatch({type: 'delete_blogpost', payload: id})
    }
}

export const {Context, Provider} = createDataContext(
    blogsReducer,
    {getBlogPost, addBlogPost, updateBlogPost, deleteBlogPost},
    []
);
