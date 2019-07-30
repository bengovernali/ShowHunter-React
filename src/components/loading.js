import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="loading-bar" />
        <div className="loading-bar" />
        <div className="loading-bar" />
        <div className="loading-bar" />
      </div>
    );
  }
}

export default Loading;
