import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Router, Route, Link, browserHistory,IndexRoute } from 'react-router'

import WeUI from 'react-weui'
var  {Grids,Button} = WeUI
import IconButton from './images/icon_nav_button.png';
import IconCell from './images/icon_nav_cell.png';
import IconToast from './images/icon_nav_toast.png';
import IconDialog from './images/icon_nav_dialog.png';
import IconProgress from './images/icon_nav_progress.png';
import IconMsg from './images/icon_nav_msg.png';
import IconArticle from './images/icon_nav_article.png';
import IconActionSheet from './images/icon_nav_actionSheet.png';
import IconIcons from './images/icon_nav_icons.png';
import IconPanel from './images/icon_nav_panel.png';
import IconTab from './images/icon_nav_tab.png';
import IconSearchBar from './images/icon_nav_search_bar.png';

var wilddog=require('wilddog')

var config = {
  syncURL: "https://sf123.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();
var wRoom=ref.child("room")
var wMembers=ref.child("members")
var wMessages=ref.child("messages")

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      users:[],
      status:0,
      talking:[],
      userInfo:{},
      room:'',
    };
  }
  componentDidMount(){
    var r=Math.floor((Math.random()*1000)+1);
    var sex=Math.floor((Math.random()*2)+1);
    var imgIndex=Math.floor((Math.random()*6)+5);
    var headimgurl="http://image-10043034.file.myqcloud.com/zhake.jpg"
    var nickname="sf"+r
    var userInfo={
      nickname,
      _id:r,
    }
    var room="001"

    wRoom.child(room).set({
      name:"房间1"
    })

    this.setState({
      userInfo,
      room
    })
    console.log(userInfo,"mount");
    wMembers.child(room).child(userInfo._id).set(userInfo)

    wRoom.on('value',function(snapshot, error){
      if (error == null) {
          var newPost = snapshot.val();
          //console.log("name: " + newPost[room].name);
        } else {
          console.log(error);
        }
    })

    wMembers.child(room).on('value',function(snapshot, error){
      if (error == null) {
          var newPost = snapshot.val();
          //console.log("name: " ,newPost);
          this.setState((prevState)=>({
            users:prevState.users.concat(newPost[room])
          }))
       } else {
          console.log(error);
       }
    }.bind(this))

    wMessages.child(room).child('status').on('value',function(snapshot, error){
       if (error == null) {
          var status = snapshot.val();
          console.log(status);
          this.setState({
            status:status.status
          })
        } else {
          console.log(error);
        }
    }.bind(this))

    wMessages.child(room).child('talking').on('child_added', function(data) {
      var m=data.val()
      this.setState((prevState)=>({
        talking:prevState.talking.concat([m])
      }))
    }.bind(this));

    console.log('进入房间啦');
  }

  submit(){
    var room='001'
    var r=Math.floor((Math.random()*1000)+1);
    var nickname="sf"+r
    wMessages.child(room).child('talking').push(nickname)
  }

  componentWillUnmount(){
    //console.log('离开了');
    var {room,userInfo}=this.state

    console.log(userInfo,"hahah");

    wMembers.child(room).child(userInfo._id).remove()
    wMessages.off()
    wMembers.off()
    wRoom.off()

    wMessages.child(room).child('talking').off()
    wMessages.child(room).child('status').off()
    wMembers.child(room).off()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React 状态 {this.state.status}</h2>
        </div>
        
        <Button type="primary" onClick={this.submit.bind(this)} >新增</Button>
        <Link to="/add">跳转</Link>

        {this.state.talking.map((val,index)=><p key={index}>{val}</p>)}

      </div>
    );
  }
}

export default App;
