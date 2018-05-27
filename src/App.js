import React, { Component } from "react";
import request from "superagent";
import "./style.css";

export const drawCards = id =>
  request.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`);

const CardList = ({ list }) =>
  list.map((item, index) => (
    <img src={item.images.png} key={index} alt="img" />
  ));

const DrawButton = ({ handleClick, children }) => (
  <button className="drawbutton" onClick={handleClick}>
    {children}
  </button>
);

export class App extends Component {
  state = {
    deckId: "",
    playerCards: [],
    numberOfPlayers: 10
  };

  drawPlayerCards = index => {
    drawCards(this.state.deckId).then(result => {
      const temp = this.state.playerCards;
      temp[index] = result.body.cards;
      this.setState({
        playerCards: temp
      });
    });
  };

  componentDidMount() {
    request
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(response => {
        this.setState({
          deckId: response.body.deck_id
        });
      });
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
    return <div>{this.renderPlayers()}</div>;
  }
}
