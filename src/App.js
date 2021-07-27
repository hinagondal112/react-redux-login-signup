import logo from './logo.svg';
import './styles/App.css';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import { SignUp } from './components/SignUp';
import Home from './components/Home';
import { Login } from './components/Login';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import ProtectedRoute from './components/ProtectedRoute';
import {useState} from 'react'
import { AddNewRow } from './components/AddNewRow';
import Snackbar from './components/Snackbar'
import Edit from '@material-ui/icons/Edit';
import {EditBook} from './components/EditBook'
import Detail from './components/Detail';
import index from './pages/login/index';
import signupIndex from './pages/signup/signupIndex'
import homeIndex from './pages/home/homeIndex'
import addBookIndex from './pages/addBook/addBookIndex';
import editBookIndex from './pages/editBook/editBookIndex'
import detailIndex from './pages/detail/detailIndex'


function App() {
  return (
     <div className = "App">
     <Snackbar/>
       <BrowserRouter>
         <Switch>
          <Route exact path = "/login" component = {index}/>
           <ProtectedRoute exact path = "/" component = {homeIndex}></ProtectedRoute>
           <ProtectedRoute path = "/add-book" component = {addBookIndex}></ProtectedRoute>
           <ProtectedRoute path = "/edit-book/:id" component = {editBookIndex}></ProtectedRoute>
           <ProtectedRoute path = "/show-detail/:id" component = {detailIndex}></ProtectedRoute>
           <Route path = "/signup" component = {signupIndex}/>
          
          
        
         </Switch>
       </BrowserRouter>
        
     </div>  
       
  );
}

export default App;
