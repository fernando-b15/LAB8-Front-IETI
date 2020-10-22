import React, {Component} from 'react';
import ResponsiveDrawer from './ResponsiveDrawer';
import axios from "axios";

export class Home extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){	  

		return(

			<ResponsiveDrawer/>
		);
	}
}