import React, { Component } from "react";
import logo from "../images/logo2.png";
import Loading from "./loading";
import Card from "./card";
import { Redirect } from "react-router-dom";

class Home extends Component {
  state = {
    tokenId: "",
    artist: "",
    zip: "",
    radius: "",
    events: [],
    loading: false,
    loaded: false,
    logout: false
  };

  async componentDidMount() {
    const tokenId = this.props.location.state.tokenId;
    await this.setState({
      tokenId: tokenId
    });
  }

  handleArtistChange = e => {
    this.setState({
      artist: e.target.value
    });
  };

  handleZipChange = e => {
    this.setState({
      zip: e.target.value
    });
  };

  handleRadiusChange = e => {
    this.setState({
      radius: e.target.value
    });
  };

  runLoadIcon = () => {
    this.setState({
      loading: true,
      events: [],
      loaded: false
    });
    console.log("LOADING ", this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.runLoadIcon();
    const artist = this.state.artist;
    const zip = this.state.zip;
    const radius = this.state.radius;
    const tokenId = this.state.tokenId;
    const url = `http://localhost:3000/home/scan/${tokenId}/${artist}/${zip}/${radius}`;
    fetch(url)
      .then(response => response.json())
      .then(result => result)
      .then(result => {
        const write = result.events.length === 0 ? [] : result;
        console.log("Write: ", write);
        this.setState({
          events: write,
          loading: false,
          loaded: true
        });
      })
      .then(() => console.log(this.state));
  };

  logout = () => {
    const tokenId = this.state.tokenId;
    const url = `http://localhost:3000/logout/${tokenId}`;
    fetch(url).then(() => {
      this.setState({
        logout: true
      });
    });
  };

  render() {
    const loading = this.state.loading;
    const events = this.state.events;
    const loaded = this.state.loaded;
    return (
      <>
        {!!this.state.logout ? (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        ) : null}
        <nav className="nav">
          <button className="logout-button" onClick={this.logout}>
            Logout
          </button>
        </nav>
        <img className="site-logo" src={logo} alt="showhunter logo" />
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            className="search-text"
            type="text"
            placeholder="Please Enter an Artist"
            onChange={this.handleArtistChange}
            name="artist"
          />
          <input
            className="search-text"
            type="text"
            placeholder="Please Enter Your City"
            onChange={this.handleZipChange}
            name="zip"
          />
          <input className="submit" type="submit" value="Submit" />
        </form>
        {!!loading ? <Loading /> : null}
        {!!events.events && !!loaded ? (
          <div className="card-container">
            {events.events.map(event => {
              return (
                <Card
                  key={`${event.name}${event.venue}`}
                  className="card"
                  name={`${event.name}`}
                  venue={`${event.venue}`}
                  date={`${event.date}`}
                  time={`${event.time}`}
                  image={`${event.image}`}
                  url={`${event.url}`}
                />
              );
            })}
          </div>
        ) : !events.events && !!loaded ? (
          <p className="null-result">
            Sorry, there are no upcoming events in your area for this band's
            related artists
          </p>
        ) : null}
      </>
    );
  }
}

export default Home;
