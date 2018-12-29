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

    let team1Icon = this.props.match.team1.icon
    let team2Icon = this.props.match.team2.icon

    if(!team1Icon){
      team1Icon = <img className="team-match-icon" src='https://visualpharm.com/assets/488/Overwatch-595b40b85ba036ed117da78e.svg'/>
    } else {
      team1Icon = <img className="team-match-icon" src={this.props.match.team1.icon} />
    }

    if(!team2Icon){
      team2Icon = <img className="team-match-icon" src='https://visualpharm.com/assets/488/Overwatch-595b40b85ba036ed117da78e.svg'/>
    } else {
      team2Icon = <img className="team-match-icon" src={this.props.match.team2.icon} />
    }

    return (
      <Media>
        <Media left href="#">
          {team1Icon}
          {team2Icon}
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