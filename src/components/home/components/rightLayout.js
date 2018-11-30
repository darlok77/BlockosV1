import React from 'react'
import { connect } from 'react-redux'

import { nextNumber } from '../actions'

class RightLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: props.number
    }
  }

  handleClick() {
    nextNumber()
  }

  render() {
    return (
      <button type="button" onClick={this.handleClick.bind(this)}> roll the dice </button>
    )
  }
}

export default connect(state => state)(RightLayout)

