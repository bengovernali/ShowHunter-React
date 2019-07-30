import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className="card">
        <h3>{this.props.name}</h3>
        <h4>{this.props.venue}</h4>
        <h4>{this.props.date}</h4>
        <h4>{this.props.time}</h4>
      </div>
    );
  }
}

export default Card;
