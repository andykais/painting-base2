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
      <div>
        <label htmlFor="incPercent">increment image slider</label>
        <input name="incPercent" type="range" min={min} max={max} defaultValue={max / 2}
          onMouseUp={(e) => {
            this.props.incrementByPercent(e.target.value / max)
          }}
          onKeyUp={(e) => {
            this.props.incrementByPercent(e.target.value / max)
          }}
        />
        <div>
          <label htmlFor="incNumber">increment image button</label>
          <input name="incNumber" type="number" min={0} value={this.state.incrementNumber}
            onChange={(e) => {
              this.setState({
                incrementNumber: e.target.value
              })
            }}
          />
          <button onClick={() => {
            this.props.incrementByNumber(this.state.incrementNumber)
          }}>Add Number</button>
          <button onClick={() => {
            this.props.incrementByNumber(this.state.incrementNumber * -1)
          }}>Subtract Number</button>
      </div>
    </div>

    )
  }
}
//const Increment = (props) => (

//)

export default Increment
