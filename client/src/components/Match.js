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
          <img className="team-match-icon" src={this.props.match.team1.icon} alt="Smiley face" />
          <img className="team-match-icon" src={this.props.match.team2.icon} alt="Smiley face" />

        </Media>
        <Media body>
          <Media heading>
          {this.props.match.team1.name} VS {this.props.match.team2.name}
          </Media>
        </Media>
      </Media>
    );
  }
}


export default Game;