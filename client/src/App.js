import React, { Component } from 'react';
import './App.css';
import fire from './config/Fire.js';
import Home from './components/Home.js';
import Landing from './components/Landing.js';
import AppNavBar from './components/AppNavBar.js';
import {Switch, Route, withRouter} from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alert from 'react-s-alert';

class App extends Component {


  constructor() {
    super();
    library.add(faCog)
    this.state = ({
      user: null,
      UID: null
    });
    this.authListener = this.authListener.bind(this);
    this.setUID = this.setUID.bind(this);
  }




  componentDidMount() {
    this.authListener();
  }


  setUID = (uid) => {
      this.setState({uid:uid})
  }

  removeUID = () => {
      this.setState({uid:null})
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
        this.props.history.push('/Home')
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
        this.props.history.push('/')
      }
    });
  }

  render() {
    return (
      <div>
        <AppNavBar user = {this.state.user} setUID = {this.setUID} removeUID = {this.removeUID} />
        <Switch>
          <Route path='/Home' render={(props) => <Home />} />
          <Route path='/' render={(props) => <Landing />} />
        </Switch>
      </div>
    )
  }
}

 export default withRouter(App);