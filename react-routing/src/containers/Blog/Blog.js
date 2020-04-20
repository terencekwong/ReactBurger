import React, { Component } from 'react';
//import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import classes from './Blog.css';
import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    }
    render () {
        return (
            <div className={classes.Blog}>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                exact 
                                to="/posts"
                                activeClassName="active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink 
                                to={{
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'}}
                                activeClassName="active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}
                                >New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/posts" exact render={() => <Posts />} /> */}
                <Switch>
                    { this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null }
                    <Route path="/posts"  component={Posts}/>
                    <Route render={() => <h1>404</h1> } />
                    {/* <Redirect from="/" to="/posts" /> */}
                    {/* <Route path="/"  component={Posts}/> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;