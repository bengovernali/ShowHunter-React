import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from './App';
import SpotifyLogin from "./components/SpotifyLogin";
import * as serviceWorker from "./serviceWorker";

//ReactDOM.render(<App />, document.getElementById('root'));

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

ReactDOM.render(
  <SpotifyLogin
    clientId="7b2e40d2601f440594b8cec9eafb8ff3"
    redirectUri="http://localhost:3001/callback"
    onSuccess={onSuccess}
    onFailure={onFailure}
  />,
  document.getElementById("example")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
