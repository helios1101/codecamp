import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import './style.css';

const App = ({ name, age }) =>[
  <div>Hello {name},{age}</div>,
  <a href="/"> link </a>
];

App.defaultProps = {
  // name: "Guest"
}

App.propTypes = {
  name: PropTypes.string.isRequired
}


const data = {
  name: "arbaaz",
  age: 27
};


ReactDOM.render(<App age={data.age}/>,
 document.getElementById("root"));
