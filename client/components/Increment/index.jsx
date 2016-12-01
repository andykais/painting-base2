/*
 * component that contains slider widget
 * updates global percentage
 */

import React from 'react'
import './styles.scss' // import styles

const min = 0
const max = 1000

class Increment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      incrementNumber: 100,
    }
  }

  render() {
    return (
      <div className="bottom-bar">
        <input name="incPercent" id="incrementSlider" type="range" min={min} max={max} defaultValue={this.props.percent*max}
          onMouseUp={(e) => {
            this.props.incrementByPercent(e.target.value / max)
          }}
          onKeyUp={(e) => {
            this.props.incrementByPercent(e.target.value / max)
          }}
        />
        <div id="incrementTools">
          <div id="incrementTitle"><label>Increment Your Image</label></div>
          <div id="incrementValue">
          <input name="incNumber" type="number" min={0} value={this.state.incrementNumber}
            onChange={(e) => {
              this.setState({
                incrementNumber: e.target.value
              })
            }}
          />
          <button onClick={() => {
            this.props.incrementByNumber(this.state.incrementNumber * -1)
          }}>Subtract</button>
          <button onClick={() => {
            this.props.incrementByNumber(this.state.incrementNumber)
          }}>Add</button>
          </div>
        </div>
      </div>
    )
  }
}
//const Increment = (props) => (

//)

export default Increment
