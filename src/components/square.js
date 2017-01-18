import React, { Component } from 'react';

/*
	Component that renders each 
	Square of the board based on type
*/
class Square extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    let color = this.props.color;
    let newColor = nextProps.color;

    return color !== newColor;
  }

  render() {
  	let color = this.props.color;
  	let size = this.props.size;

    let style = {
      width: size,
      height: size,
      margin: 0,
      backgroundColor: color
    };

    return (
      <div className="sqr" style={style}></div>
    );
  }
}

export default Square;
