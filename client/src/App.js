import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from './Components/HomePage/Navigation/Navigation';
import HomePage from './Components/HomePage/HomePage';
import Login from './Components/Login/Login';
import PostJob from './Components/PostJob/PostJob';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import Feed from './Components/Feed/Feed';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from './Profile/Profile';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'

function App() {

  return (
    <BrowserRouter>
    {
      window.location.pathname === '/admin' ? null : <Navigation color = {'black'} bgColor = {'yes'}  />
    }
    
      <Route exact  path="/" component={localStorage.getItem('loggedIn')? Feed : HomePage}/>
      <Route exact  path="/register" component={Login}/>
      <PrivateRoute exact  path="/postjob" component={PostJob}/>
      <PrivateRoute exact  path="/profile" component={Profile}/>
      <PrivateRoute exact  path="/admin" component={AdminPanel}/>
    </BrowserRouter>
  );
}

export default App;
