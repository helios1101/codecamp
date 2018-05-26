import React, { Component } from "react";
import "./style.css";

const Student = ({ name }) => <li className="student">{name}</li>;

export default class App extends Component {
  state = {
    data: [
      {
        name: "Aman"
      },
      {
        name: "Aastha"
      },
      {
        name: "Rohit"
      },
      {
        name: "Harshit"
      }
    ]
  };

  render() {
    const { data } = this.state;
    return (
      <ul className="studentList">
        {data.map((item, index) => <Student name={item.name} />)}
      </ul>
    );
  }
}
