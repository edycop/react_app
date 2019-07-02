import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';

// api.github.com/users/edycop
// const testData = [
//   {name: "Edwin Caldon", avatar_url: "https://avatars1.githubusercontent.com/u/418704?v=4", company: "Codescrum"},
//   {name: "Dan Abramov", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Facebook"},
//   {name: "Sebastian Makbage", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
// ]

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return(
      <div className="github-profile">
        <img alt="github profile" src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  // userNameInput = React.createRef();
  state = { userName: ''};
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({ userName: '' });
    console.log(
      // this.userNameInput.current.value
      // this.state.userName
      // resp.data
    );
  };
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input
         type="text"
         value={this.state.userName}
         onChange={event => this.setState({ userName: event.target.value })}
         placeholder="Github username"
        //  ref={this.userNameInput}
         required />
        <button>Add card</button>
      </form>
    );
  }
 }

class App extends React.Component {
  //constructor
  constructor(props){
    super(props);
    this.state = {
      // profiles: testData,
      profiles: [],
    };
  }
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  };
  //this
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles}/>
      </div>
    );
  }
}

// // ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );


ReactDOM.render(
  <App title="The Github Cards App" />,
  // mountNode,
  document.getElementById('root')
);
