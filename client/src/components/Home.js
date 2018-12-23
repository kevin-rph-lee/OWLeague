import React, { Component } from 'react';
import fire from './../config/Fire';
import axios from 'axios';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import Loader from './Loader.js';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, items: [], loading: true };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

  }

  componentDidMount = () => {
    axios.get('owl/', {

    })
    .then((response) => {
      const data = response.data.data
      this.setState({loading:false})
      for(var i in data){

        const items = this.state.items

        items.push({
          caption: i,
          src: data[i].image,
          altText: 'Season 1'
        })

        this.setState({items: items})
      }


    })
    .catch((error) => {
      console.log('error is ',error);
    })
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

    const { activeIndex } = this.state;

    const slides = this.state.items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.altText} captionHeader={item.caption} />
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
              // interval={0}
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
      </div>
    );
  }
}


export default Home;