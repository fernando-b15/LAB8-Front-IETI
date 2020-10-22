import React, {Component} from 'react';
import {Home} from './components/Home'
import {NewTask} from './components/NewTask';
import {UserProfile} from './components/UserProfile';
import {UserList} from './components/UserList';
import {Login} from './components/Login';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import  { Redirect } from 'react-router-dom'
import axios from "axios";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {isLoggedIn: false,userList: []};
		console.log('por qqqqqqqqqqqqqqqqqqqqq'+this.state.isLoggedIn);
		this.handleState = this.handleState.bind(this);
		
	}
	componentDidMount() {
		 const res = new Promise((resolve) =>{
          axios.get('http://localhost:8080/api/',
          {
              headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Bearer " + localStorage.getItem("token")
                      }
          })
           .then(response => {
				  console.log(response.data);
				  localStorage.setItem("items",JSON.stringify(response.data));
				  resolve();
           })
           .catch(e => {
              console.log(e);
              alert("Error al cargar tareas");

           });
		   });
		   return res;
    }
	render(){
		const home = () => <Home />;
		const newtask = () => <NewTask />;
		const userprofile = () => <UserProfile />;
		const login = () => < Login logged={this.handleState} />;
		const userlist = () => <UserList userList={this.state.userList} />;
		console.log('entro a render');
		console.log(this.state.isLoggedIn);
		console.log(this.state.userList)
		if (this.state.isLoggedIn) {
			console.log('llllllllllleego aqui zzzzzzzzzzzzzzzzzzzzzzzzz33333333333333333333');
			return(			
				<Router>
				  <div className="App">     
					<Redirect to="/home" />		
				  </div>
				</Router>

			);	
		}
		else{
			console.log('llllllllllleego aqui zzzzzzzzzzzzzzzzzzzzzzzzz2222222222222222');
			return(
				<div>
				<Router>
				  <div className="App">   
					<Route exact path="/" component={login} /> 
					<Route exact path="/newtask" component={newtask} />  
					<Route exact path="/home" component={home} />
					<Route exact path="/userprofile" component={userprofile} />
					<Route exact path="/userlist" component={userlist} />							
					
				  </div>
				</Router>
				
				</div>
			);			
		} 
    }
	handleState(){
		setTimeout(() => {
		  this.setState({isLoggedIn: true});
		}, 100);
		
	}
	
}
export default App;	
