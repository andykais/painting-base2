import React from 'react';

class Generate extends React.Component {

  constructor(props) {
    super(props);
    if(this.props.height && this.props.width) {
      this.state = {width: this.props.width, height: this.props.height};
    }
    else {
      this.state = {width: 'default', height: 'default'};
    }
  }

  render() {
    return(<h1>generates, {this.state.width}, {this.state.height}</h1>);
  }
}
export default Generate
