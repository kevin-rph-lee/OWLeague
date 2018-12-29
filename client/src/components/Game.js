import React, { Component } from 'react';
import fire from './../config/Fire';
import axios from 'axios';
import {
  Media,
  Button,
  Table
} from 'reactstrap';


class Game extends Component {
  constructor(props) {
    super(props);

  }

  render() {


      return (
        <tbody>
          <tr>
            <td>{this.props.game.points[0]}</td>
            <td>{this.props.game.points[1]}</td>
            <td>{this.props.game.attributes.map}</td>
            <td></td>
          </tr>
        </tbody>
      )
  }

}


export default Game;