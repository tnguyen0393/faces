import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "./components/navigation/navigation.component";
import Logo from "./components/logo/logo.component";
import ImageLinkForm from "./components/imagelinkform/imagelinkform.component";
import Rank from "./components/rank/rank.component";
import FaceRecognition from "./components/facerecognition/facerecognition.component";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "6824cef6c5e5498cbbe34cf39399c5da",
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
    };
  }

  calculateFaceLocation = (data) => {};

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
      .then((response) => this.calculateFaceLocation(response))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
