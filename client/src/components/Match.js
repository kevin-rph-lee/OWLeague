import React, { Component } from 'react';
import fire from './../config/Fire';
import axios from 'axios';
import Game from './Game.js';
import {
  Media,
  Button,
  Collapse
} from 'reactstrap';


class Match extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false};

  }


  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }


  render() {

    let team1Icon = this.props.match.team1.icon
    let team2Icon = this.props.match.team2.icon
    let datePlayed = this.props.match.date.slice(0, 10)


    const games = this.props.match.games.map((game) => {
      return (
        <Game game={game} />
      );
    });

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
          Date Played: {datePlayed}
          <div>
            <Button color="primary" onClick={this.toggle} size="sm">View Maps</Button>
            <Collapse isOpen={this.state.collapse}>
              {games}
              <h5>Winner: {this.props.match.winner}</h5>
            </Collapse>


          </div>
        </Media>

      </Media>
    );
  }
}


export default Match;