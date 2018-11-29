import React from 'react'
import { connect } from 'react-redux'

class RightLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: props.number
    }
  }

  handleClick() {
    const number1 = Math.floor(Math.random() * (7 - 1) + 1)
    const number2 = Math.floor(Math.random() * (7 - 1) + 1)

    console.log(number1)
    console.log(number2)
    console.log(this.state)

    this.state.number = this.opperator(number1, number2)
    this.setState({
      number: this.opperator(number1, number2)
    })
  }

  opperator(n1, n2) {
    const sum = n1 + n2
    const possibility = {
      fisrt: [n1, n2]
    }

    if (sum > 6) {
      return possibility
    }

    possibility.second = sum
    return possibility
  }

  render() {
    return (
      <button type="button" onClick={this.handleClick.bind(this)}> roll the dice </button>
    )
  }
}

export default connect(state => state)(RightLayout)

