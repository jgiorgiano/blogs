import React, { useState, useReducer } from 'react';

const BlogContextBeforeRefactor = React.createContext();

const blogsReducer = (state, action) => {

    switch (action.type) {
        case 'add_blogpost':
            return ([...state, { title: `Blog Post #${state.length + 1 }`}]);
        default:
            return state;
    }

};

export const BlogProvider = ( { children }) => {
    //Ex. using useState;
    // const [blogPosts, setBlogPosts] = useState([]);

    // const addBlogPost = () => {
    //     setBlogPosts([...blogPosts, { title: `Blog Post #${blogPosts.length + 1 }`}])
    // }

    const [blogPosts, dispatch] = useReducer(blogsReducer,[]);

    const addBlogPost = () => {
        dispatch({ type: 'add_blogpost'})
    }


    return <BlogContextBeforeRefactor.Provider
        value={
            {   data: blogPosts,
                addBlogPost
            }
        }>
        {children}
    </BlogContextBeforeRefactor.Provider>
};

export default BlogContextBeforeRefactor;
