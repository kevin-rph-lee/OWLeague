import React, { Component } from 'react';
import fire from './../config/Fire';
import axios from 'axios';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Collapse,
  CarouselCaption,
  Media
} from 'reactstrap';
import Loader from './Loader.js';
import Game from './Game.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { teams:[], activeIndex: 0, items: [], loading: true, collapse: false, activeCollapse: null, activeCollapseStage: [], leagueData: null };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

  }

  componentDidMount = () => {
    axios.get('owl/', {

    })
    .then((response) => {
      const data = response.data.data
      // console.log('League Data ', response.data.data)
      this.setState({leagueData: response.data.data})
      this.setState({loading:false})
      for(var i in data){

        const items = this.state.items

        items.push({
          caption: data[i].friendlyName,
          src: data[i].image,
          altText: 'Season 1',
          name: i
        })

        this.setState({items: items})
      }


    })
    .catch((error) => {
      console.log('error is ',error);
    })

    axios.get('teams/', {

    })
    .then((response) => {
      // console.log('Teams ', response.data)
      this.setState({teams: response.data})
    })
    .catch((error) => {
      console.log('error is ',error);
    })

  }

  toggleCollapse(e) {
    const activeStage = this.state.items[this.state.activeIndex].name
    this.setState({activeCollapseStage: this.state.leagueData[this.state.items[this.state.activeIndex].name] })
    console.log(this.state.leagueData[this.state.items[this.state.activeIndex].name])
    if(this.state.collapse === false){
      this.setState({activeCollapse:this.state.activeIndex})
      this.setState({collapse: true})
    } else {
      this.setState({collapse: false})
      setTimeout(function() { //Start the timer
        this.setState({activeCollapse:this.state.activeIndex})
        this.setState({collapse: true})
      }.bind(this), 1000)
    }
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {

    let content = null;
    let matches = null;

    const { activeIndex } = this.state;

    console.log('Teams ', this.state.teams)
    let teams = this.state.teams.map(item => {
      return(
        <span>
        <img className="team-icon" src={item.icon} />
        </span>
        )
    })

    console.log('activecollapse ', this.state.activeCollapseStage)
    if(this.state.activeCollapseStage.matches !== undefined){

      let matchArray = this.state.activeCollapseStage.matches
      console.log('Match Array ', matchArray)
      matches = matchArray.map(item => {
        return(
          <p>Test</p>
          )
      })

    }

    const slides = this.state.items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <div onClick={this.toggleCollapse} >
            <CarouselCaption  onClick={this.toggleCollapse}  captionText={item.altText} captionHeader={item.caption} />
          </div>
        </CarouselItem>
      );
    });

    if(this.state.loading === true){
      content = <Loader />
    } else {
      content =
          <div className = "stages-carosel">
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
              interval={0}
            >
              <CarouselIndicators items={this.state.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
          </div>
    }


    return (
      <div>
        {content}
          <Collapse className="collapse-content" isOpen={this.state.collapse}>
            <div className="team-container">
              <span>{teams}</span>
            </div>
            {matches}
          </Collapse>
      </div>
    );
  }
}


export default Home;