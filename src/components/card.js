import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className="card">
        <img className="card-image" src={this.props.image} alt="event" />
        <a target="_blank" rel="noopener noreferrer" href={this.props.url}>
          {this.props.name}
        </a>
        <p>{this.props.venue}</p>
        <p>{this.props.date}</p>
        <p>{this.props.time}</p>
      </div>
    );
  }
}

export default Card;
