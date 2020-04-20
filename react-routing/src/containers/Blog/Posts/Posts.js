import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; // Use Link for Route
import { Route } from 'react-router-dom'; 
import axios from '../../../axios';

import classes from './Posts.css';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPost = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPost})
            })
            .catch(error => {
                console.log(error);
                //this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        //this.props.history.push({ pathname: '/post' + id }); //same
        this.props.history.push('/posts/' + id);
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

        if(!this.state.error)
        {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/posts' + post.id} key={post.id}>
                    //     <Post 
                    //         title={post.title} 
                    //         author={post.author}
                    //         clicked={() => this.postSelectedHandler(post.id)}
                    //     />
                    // </Link>);
                    <Post 
                        key={post.id}
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />);
            });
        }

        return (
            <div>
                <section className={classes.Posts}>
                    { posts }
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;