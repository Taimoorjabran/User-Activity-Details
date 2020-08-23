import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import  UserModel  from './component/user_model/user_model';


const URL = 'https://demo9221932.mockable.io/users';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: '',
      modelShow: false
    }

  }
  
  toggleModel = (toggle) => {
    this.setState({
      modelShow: toggle,
    });
  }

  onSelectUser(user) {
    this.setState({
      selectedUser: user
    });
    this.toggleModel(true);
  }
  parseUserData(users) {
    users = users.map( (event) => {
      const foundTodayActivity = event.activity_periods.filter( (time) => {
        return new Date().getDate() === new Date(time.start_time).getDate();
      });
      const todayActive = foundTodayActivity !== [] ? foundTodayActivity : false;
      const events = event.activity_periods.map( ({ start_time, end_time}) => {
        return {
          title: start_time.substr(12,16) + '-' + end_time.substr(12,16),
          start: new Date(start_time),
          end: new Date(end_time),
        }
      });
      return {...event, events: events, todayActive: todayActive};
    });
    return users;
  }

  componentDidMount() {
    axios.get(URL)
    .then(res => {
      const users = res.data.members;
      const parsedUserData = this.parseUserData(users);
       this.setState({ users: parsedUserData});
    })
    .catch((error) => {console.log(error)});
  
  }
  render() {
    const userList= this.state.users;
    return (
      <div className="App">
          <div className='navbar fixed-top navbar-light dashboard'>
            <h1 className='display-4'>USER ACTIVITY</h1>
          </div>
          <div>
            {
              userList.map((user, id, index) => {
                return (
                    <div key={user.id} className='card text-center userslist' onClick = { () => this.onSelectUser(user)}>
                       <div className='card-heder'><strong>User Id: {user.id}</strong></div>
                       <div className='card-body'>User Name: {user.real_name}</div>  
                    </div>
                );
              })
            }
          </div>
          <div>{ this.state.modelShow ? 
              <UserModel 
                userData = {this.state.selectedUser} 
                toggleModal = {this.toggleModel}
              /> : null
          }</div>
      </div>
    )
  }
}

export default App;
