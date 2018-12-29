import React, { Component } from 'react';
import fire from './../config/Fire';
import axios from 'axios';
import {
  Media
} from 'reactstrap';


class Game extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <Media>
        <Media left href="#">
          <Media object data-src="holder.js/64x64" alt="Generic placeholder image" />
        </Media>
        <Media body>
          <Media heading>
            Media heading
          </Media>
          {this.props.gameInfo}
        </Media>
      </Media>
    );
  }
}


export default Game;