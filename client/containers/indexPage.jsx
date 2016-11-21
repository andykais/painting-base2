import React from 'react';

import ImageUpload from '../components/imageUpload.jsx';
import Generate from '../components/generate.jsx';
import Number from '../components/number.jsx';
import Increment from '../components/increment.jsx';
import {randomByteArray} from '../libs/transformations.js';

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
    this.state = {
      status: statics.none,
      incValue: 100,
      image: {
        genArr: [],
        width: 100,
        height: 100
      }
    }
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
  _handleInputChange(event) {
    this.setState({incValue: event.target.value})
  }

    /**
    Used to force an update on the state, will cause a new render
    mode is the new status
    */
  _setImageMode(mode) {
    const numPixels = this.state.image.width * this.state.image.height
    //const imageSize = Math.pow(3*256, numPixels)
    let genArr = this.state.image.genArr
    if (mode === statics.generated) {
      genArr = randomByteArray(numPixels * 3 * 255)
    } else if (mode === statics.increment) {
      // add tranformation to increment array
    }
      console.log('genArr[0]', genArr[0])
      console.log('genArr[1]', genArr[1])
      console.log('genArr[2]', genArr[2])
      console.log('genArr[3]', genArr[3])
      console.log('genArr[4]', genArr[4])
      console.log('genArr[5]', genArr[5])
    this.setState({
      status: mode,
      image: {
        genArr: genArr,
        width: this.state.image.width,
        height: this.state.image.height
      }
    });
    console.log(this.state)
      console.log('genArr[0]', this.state.image.genArr[0])
      console.log('genArr[1]', this.state.image.genArr[1])
      console.log('genArr[2]', this.state.image.genArr[2])
      console.log('genArr[3]', this.state.image.genArr[3])
      console.log('genArr[4]', this.state.image.genArr[4])
      console.log('genArr[5]', this.state.image.genArr[5])
      console.log('done.')
  }

    render() {
    // Base state is asking user to pick a mode
    let $imageShow = (null);

    if(this.state.status === statics.uploaded) {
      $imageShow = (<ImageUpload ref="uploaded"/>)
    }
    //else if(this.state.status === statics.generated) {
      //$imageShow = (<Generate ref="generated"/>)
    //}
    else if(this.state.status === statics.number) {
      $imageShow = (<Number ref="number"/>)
    }
    //else if(this.state.status === statics.increment) {
      //$imageShow = (<Increment ref="increment"/>)
    //}
    if (this.state.status !== statics.none) {
      $imageShow = (
        <div>
          <label htmlFor="inc-number">Increment</label>
          <input name="inc-number" 
            type="number"
            value={this.state.incValue}
            onChange={(e)=>this._handleInputChange(e)} />
          <button className="" type="submit" onClick={()=>this._setImageMode(statics.increment)}>Increment your Image</button>
          <div className='display-block'>
            <Generate genInfo={this.state.image}/>
          </div>
          <button className="numberMode" type="submit" onClick={()=>this._setImageMode(statics.number)}>See the Number for your Image</button>
        </div>
      )
    }

        return(
      <div id="indexMain">
        <h1>Welcome to Our App!</h1>
        <button className="generateMode" type="submit" onClick={()=>this._setImageMode(statics.generated)}>Generate a Random Image</button>
        <button className="uploadMode" type="submit" onClick={()=>this._setImageMode(statics.uploaded)}>Upload Your Own Image</button>
        {$imageShow}

        <button className="submitButton" type="submit" onClick={(e)=>this._handleButtonPress(e)}>Log Some Data</button>
      </div>
    )
  }
}

export default IndexPage
