import React from 'react';
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div>
      <header>{ formatName(usr) }</header>
    </div>
  );
}
const usr = {
  firstName: 'blue',
  lastName: 'grey'
}
let list = [
  {
    name: 'jack',
    age: 10
  },
  {
    name: 'time',
    age: 20
  }
]
function formatName (usr) {
  return usr.firstName + ' ' + usr.lastName
}
export default App;
