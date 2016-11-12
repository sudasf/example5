import React, { Component } from 'react';

import { Link} from 'react-router'

import WeUI from 'react-weui'
var  {Grids,Button} = WeUI

class Add extends Component{
	componentDidMount(){
	    console.log('add  mount lala');
	}
	componentWillUnmount(){
		console.log('add  unmount lala');
	}  
	render(){
		return(
			<div>
				<h1>lalal</h1>
				<Button type="primary" onClick={this.props.router.goBack}>返回</Button>
			</div>	
			)
	}
}

export default Add;