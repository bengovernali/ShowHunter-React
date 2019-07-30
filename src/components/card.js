import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className="card">
        <img className="card-image" src={this.props.image} alt="event" />
        <a target="_blank" rel="noopener noreferrer" href={this.props.url}>
          {this.props.name}
        </a>
        <h4>{this.props.venue}</h4>
        <h4>{this.props.date}</h4>
        <h4>{this.props.time}</h4>
      </div>
    );
  }
}

export default Card;
