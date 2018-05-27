import React, { Component } from "react";
import { connect } from "react-redux";
import request from "superagent";
import { getNewDeck, drawCard } from "./modules/cards";
import { bindActionCreators } from "redux";
import "./style.css";

const CardList = ({ list }) =>
  list.map((item, index) => (
    <img src={item.images.png} key={index} alt="img" />
  ));

const DrawButton = ({ handleClick, children }) => (
  <button className="drawbutton" onClick={handleClick}>
    {children}
  </button>
);

class App extends Component {
  state = {
    deckId: "",
    playerCards: [],
    numberOfPlayers: 10
  };

  drawPlayerCards = index => {
    this.props.drawCard(this.props.deckId);
  };

  componentDidMount() {
    this.props.getNewDeck();
  }

  renderPlayers = () => {
    const elements = [];
    for (let index = 0; index < this.state.numberOfPlayers; index++) {
      elements.push(
        <div key={index}>
          <DrawButton handleClick={() => this.drawPlayerCards(index)}>
            Draw One
          </DrawButton>
          <CardList list={this.state.playerCards[index] || []} />
        </div>
      );
    }

    return elements;
  };

  render() {
    return [<div>{this.renderPlayers()}</div>, <div>{this.props.deckId}</div>];
  }
}

const mapStateToProps = state => ({
  deckId: state.cards.deckId
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getNewDeck,
      drawCard
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
