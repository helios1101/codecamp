import React, { Component } from "react";
import request from "superagent";
import "./style.css";

const drawCards = id =>
  request.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`);

export default class App extends Component {
  state = {
    deckId: "",
    playerOneCards: []
  };

  drawPlayerOneCards = () => {
    drawCards(this.state.deckId).then(result => {
      this.setState({
        playerOneCards: result.body.cards
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

  render() {
    return (
      <div>
        <button onClick={this.drawPlayerOneCards}>Draw Cards</button>
        {this.state.deckId}
        {this.state.playerOneCards.map((card, index) => (
          <img src={card.images.png} key={index} alt="img" />
        ))}
      </div>
    );
  }
}
