import React from 'react';
import ImageUpload from './imageUpload.jsx';
import Generate from './generate.jsx';
import ImageNumber from './imageNumber.jsx';
import Increment from './increment.jsx';

const statics = {
    uploaded: 'u',
    generated: 'g',
    number: 'm',
    increment: 'i',
    none: 'n'
}

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {status: statics.none};
  }

  /**
    Function to pull data from upload Image
  */
  _handleButtonPress(e) {
    e.preventDefault();
    // TODO: do something more than print
    // To access the state of generate it would be
    // this.refs.generated.state
    console.log(this.state.status);
  }

  /**
    Used to force an update on the state, will cause a new render
    mode is the new status
  */
  _setImageMode(mode) {
    this.setState({status:mode});
  }

  render() {
    // Base state is asking user to pick a mode
    let $imageShow = (null);

    if(this.state.status === statics.uploaded) {
      $imageShow = (<ImageUpload ref="uploaded"/>)
    }
    else if(this.state.status === statics.generated) {
      $imageShow = (<Generate ref="generated"/>)
    }
    else if(this.state.status === statics.number) {
      $imageShow = (<ImageNumber ref="number"/>)
    }
    else if(this.state.status === statics.increment) {
      $imageShow = (<Increment ref="increment"/>)
    }

    return(
      <div id="indexMain">
        <h1>Welcome to Our App!</h1>
        <button className="uploadMode" type="submit" onClick={()=>this._setImageMode(statics.uploaded)}>Upload Your Own Image</button>
        <button className="generateMode" type="submit" onClick={()=>this._setImageMode(statics.generated)}>Generate a Random Image</button>
        <button className="numberMode" type="submit" onClick={()=>this._setImageMode(statics.number)}>See the Number for your Image</button>
        <button className="numberMode" type="submit" onClick={()=>this._setImageMode(statics.increment)}>Increment your Image</button>
        {$imageShow}

        <button className="submitButton" type="submit" onClick={(e)=>this._handleButtonPress(e)}>Log Some Data</button>
      </div>
    )
  }
}

export default IndexPage
