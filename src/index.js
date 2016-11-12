import React from 'react';
import ReactDOM from 'react-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Router, Route, Link, browserHistory,IndexRoute,hashHistory } from 'react-router'

import App from './App';
import Add from './Add';
import './index.css'

class Main extends React.Component {
        render() {
                return (
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        style={{height: '100%'}}
                    >
                            {React.cloneElement(this.props.children, {
                                key: this.props.location.pathname
                            })}
                    </ReactCSSTransitionGroup>
                );
        }
}



ReactDOM.render(
    <Router history={hashHistory}>
	    <Route path="/" component={Main}>
	        <IndexRoute  component={App} />
	        <Route path="add" component={Add}/>
	    </Route>
	</Router>,
  document.getElementById('root')
);
