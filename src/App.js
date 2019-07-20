import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import userService from './utils/userService';
import { getAllPosts, createPost, editPost } from './utils/postService';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import PostContainer from './components/PostContainer';
import { deletePost} from './utils/postService';
import NavBar from "./components/navBar";
import './App.css';

class App extends Component {
  state = {
    posts: [],
    newPost: {
      title: "",
      author: "",
      body: ""
    },
    isEditing: false,
    user: userService.getUser()
  }

  async componentDidMount() {
    let posts = await getAllPosts();
    this.setState({ posts });
  }

  handleDelete = async (id) => {
    let deletedPost = await deletePost(id);    
    let postsCopy = this.state.posts;
    let posts = postsCopy.filter(post => post._id !== deletedPost._id)
    
    this.setState({ posts })
  }

  handleEditSubmit = async (e, id) => {
    e.preventDefault();

    let postsCopy = this.state.posts;
    let post = postsCopy.filter(post => post._id === id)[0]

    await editPost(post);
    let posts =  await getAllPosts();

    this.setState({ posts })
  }

  handleEditChange = (e, idx) => {
    let postsCopy = this.state.posts;
    let postCopy = postsCopy[idx];

    postCopy[e.target.name] = e.target.value;
    
    this.setState({ posts: postsCopy });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    let post = await createPost(this.state.newPost);
    let postsCopy = this.state.posts;
    postsCopy.push(post)

    let clearedNewPost = {
      title: "",
      author: "",
      body: ""
    }

    this.setState({ 
      newPost: clearedNewPost,
      posts: postsCopy
    });
  }

  


  handleChange = (e) => {
    let newPost = { ...this.state.newPost }

    newPost[e.target.name] = e.target.value;

    this.setState({
      newPost
    })
  }


  

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() })
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <header className="App-header">

          <p>
            { 
              this.state.user 
              ? `Welcome, ${this.state.user.name}`
              : 'Please Sign Up' 
            }
          </p>       
          
          { this.state.user
            ? <ul>
                <li><Link to="" onClick={this.handleLogout}>Logout</Link></li>
              </ul>
            : <ul>
  
                <label><Link to="/signup">Sign up</Link></label>
                <label><Link to="/login">Login</Link></label>
              </ul>
          }
        </header>


        <Switch>
          <Route exact path="/signup" render={({ history }) => 
            <SignUpPage 
              history={history} 
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />

          <Route exact path="/login" render={({ history }) => 
            <LoginPage 
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin} 
            />
          } />
        </Switch>


        <br />

        
        { this.state.user &&
          <form onSubmit={this.handleSubmit}>
            <div className="field-wrapper">
              <label>Title</label>
              <input 
                name="title" 
                type="text" 
                onChange={ this.handleChange }
                value={ this.state.newPost.title } />
            </div>
            <div className="field-wrapper">
              <label>Author</label>
              <input 
                name="author" 
                type="text" 
                onChange={ this.handleChange }
                value={ this.state.newPost.author } />
            </div>
            <div className="field-wrapper">
              <label>Body</label>
              <input 
                name="body" 
                type="text" 
                onChange={ this.handleChange }
                value={ this.state.newPost.body } />
            </div>
            <input type="submit" value="Submit" />
          </form>
        }
        { 
          this.state.posts.length
          ? <PostContainer 
              posts={this.state.posts} 
              handleDelete={this.handleDelete} 
              handleEditChange={this.handleEditChange}
              handleEditSubmit={this.handleEditSubmit}
            />
          : <h3 style={{ textAlign: 'center' }}>Loading...</h3>
        } 
      </div>
    );
  }
}

export default App;
